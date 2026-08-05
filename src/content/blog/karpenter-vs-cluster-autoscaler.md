---
title: "Karpenter vs Cluster Autoscaler: How Kubernetes Adds Nodes"
description: "Both tools solve 'a pod is pending, get it a node.' The difference is in how they decide what node to get, and that difference shows up in your AWS bill."
pubDate: 2026-07-26
tags:
  - kubernetes
  - karpenter
  - aws
  - cost-optimization
draft: false
---

Cluster Autoscaler and Karpenter solve the same problem — a pod is unschedulable, so get it capacity — but they get there through very different mechanisms, and the difference is not just implementation detail. It changes how your nodes look, how fast you scale, and what your AWS bill does.

## Cluster Autoscaler: node-group-first

Cluster Autoscaler thinks in terms of Auto Scaling Groups. It watches for unschedulable pods, then asks: which of my configured node groups, if scaled up, would fit this pod? It picks a group, increases its desired count, and waits for AWS to hand back a node.

That model works, but it inherits the constraints of ASGs. Each node group has one instance type (or a small compatible set), so if your workloads have varied resource shapes, you either run many node groups or accept that some capacity is a poor fit for what actually lands on it. Scaling decisions are also somewhat coarse — Cluster Autoscaler is choosing between predefined groups, not designing a node for the pod in front of it.

## Karpenter: pod-first

Karpenter drops the node-group abstraction entirely. It looks at unschedulable pods directly and asks: given this pod's actual requirements — CPU, memory, architecture, zone constraints, any node selectors — what's the best instance type and size AWS can give me right now, this instant, at this price?

It then provisions that instance directly through the EC2 fleet API, no ASG in between. This is the core mechanical difference: Karpenter is provisioning nodes shaped around the pods that need them, rather than scaling a pre-shaped group and hoping the fit is good enough.

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
        - key: kubernetes.io/arch
          operator: In
          values: ["amd64"]
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot", "on-demand"]
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: default
  limits:
    cpu: 1000
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
```

That `NodePool` isn't a fixed shape — it's a set of constraints. Karpenter picks the actual instance type at provisioning time based on what's cheapest and available that satisfies those constraints.

## Where the cost difference actually comes from

The bill impact isn't really about Karpenter being "smarter" in the abstract — it's two concrete mechanisms:

- **Bin packing at provision time.** Because Karpenter isn't limited to one instance type per group, it can pick an instance sized close to what the pending pods actually need, rather than rounding up to whatever the nearest pre-defined group offers.
- **Consolidation.** Karpenter continuously looks for nodes that are empty or underutilized and can be safely drained and removed, or replaced with a cheaper instance that fits the same workload. Cluster Autoscaler scales down empty nodes too, but it isn't actively looking for a *better* instance shape for what's currently running — only removing nodes with nothing on them.

## Where Cluster Autoscaler still makes sense

Karpenter is AWS/EC2-first by design (it also supports a few other providers, with varying maturity). If you're not on AWS, or you have strict compliance requirements around exactly which instance types are allowed to run and want that enforced at the ASG level rather than a constraint policy, Cluster Autoscaler's rigidity is a feature, not a limitation. It's also simply more familiar — there's a lot of institutional knowledge already built around ASG-based scaling.

## What actually changes when you migrate

Migrating doesn't just swap the autoscaler — it changes how you think about node pools. You stop maintaining a matrix of "which ASG for which workload" and start writing constraints: architecture, capacity type, zone, maybe an instance category exclusion. The tradeoff is that node shapes become less predictable — you can't always say in advance exactly which instance type a given pod will land on — which matters if anything downstream (monitoring, cost allocation, capacity planning) assumed a fixed set of instance types.
