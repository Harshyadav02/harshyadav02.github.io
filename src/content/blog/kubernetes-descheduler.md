---
title: "How Kubernetes Descheduler Actually Works"
description: "The default scheduler only decides where a pod lands once. Here's what Descheduler does after that, and when it's actually worth running."
pubDate: 2026-07-12
tags:
  - kubernetes
  - scheduling
  - sre
draft: false
---

The Kubernetes scheduler makes exactly one decision per pod: where should this land, right now, given the cluster as it exists at this moment. It does not revisit that decision later. That's a deliberate design choice — the scheduler is stateless and fast — but it means clusters drift over time. Nodes get cordoned and uncordoned, workloads scale up and down, taints change, and pods that were scheduled correctly six weeks ago can end up sitting on nodes that are now a bad fit for them.

Descheduler exists to close that gap.

## What it doesn't do

Descheduler doesn't reschedule pods. It can't — nothing outside the scheduler places pods. What it does is evict pods that no longer make sense where they are, so the default scheduler gets a second chance to place them somewhere better.

That distinction matters operationally. Descheduler is a policy engine for *eviction*, not placement. If your cluster only has one viable node, evicting a pod just means it comes right back to the same place, possibly after a moment of unavailability. Descheduler is only useful when there's somewhere better for the pod to go.

## The strategies that matter in practice

Descheduler ships with a set of strategies, but a handful cover most real use cases:

- **RemoveDuplicates** — if a ReplicaSet has multiple pods stacked on the same node when other nodes have room, this spreads them out. Useful right after a cluster scale-up event, when new capacity just sat there unused because nothing forced a rebalance.
- **LowNodeUtilization** — evicts pods from over-utilized nodes so the scheduler can move them to nodes below a target threshold. This is the strategy people usually mean when they say "bin packing got messy."
- **RemovePodsViolatingNodeAffinity** — catches pods that were valid when scheduled but whose node affinity rules no longer match after a label change.
- **RemovePodsViolatingInterPodAntiAffinity** — cleans up cases where anti-affinity was satisfied at schedule time but a later change (another deployment, a manual pod) broke it.

## A configuration that's actually usable

```yaml
apiVersion: "descheduler/v1alpha2"
kind: "DeschedulerPolicy"
profiles:
  - name: default
    pluginConfig:
      - name: "LowNodeUtilization"
        args:
          thresholds:
            cpu: 20
            memory: 20
            pods: 20
          targetThresholds:
            cpu: 50
            memory: 50
            pods: 50
    plugins:
      balance:
        enabled:
          - "LowNodeUtilization"
```

The two threshold blocks are the part people get wrong most often. `thresholds` defines what counts as *underutilized* — nodes below these numbers are eviction targets to relieve. `targetThresholds` defines what counts as *overutilized* — nodes above these numbers are candidates to evict *from*. Everything in between is left alone. If you set these too close together, Descheduler will spend most of its cycles shuffling pods around nodes that are all roughly fine, which is churn without benefit.

## Running it safely

Descheduler runs as either a `Deployment` (continuous, on an interval) or a `CronJob` (periodic). For most production clusters, a CronJob running every 10–30 minutes is the safer default — it gives you a bounded blast radius per run instead of a controller that's constantly evaluating.

A few things worth setting explicitly before turning it loose on a real cluster:

1. **PodDisruptionBudgets** — Descheduler respects PDBs, but only if you've actually defined them. Without one, there's nothing stopping it from evicting every replica of a deployment in the same pass.
2. **`nodeFit`** — enable this so Descheduler simulates whether an evicted pod can actually be rescheduled before it evicts it. Without it, you can end up evicting pods into a scheduling deadlock.
3. **Namespace exclusions** — exclude `kube-system` and anything else you don't want churned, explicitly, rather than relying on defaults.

## When it's not worth running

If your cluster is small, has one node pool, or workloads are mostly static, Descheduler adds moving parts for a problem you probably don't have. It earns its place in clusters where node pools change shape often — heavy autoscaling, spot capacity, or frequent node pool migrations — because that's exactly the condition that leaves pods stranded on nodes that no longer make sense.
