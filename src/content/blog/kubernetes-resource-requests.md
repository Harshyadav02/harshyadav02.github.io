---
title: "Kubernetes Resource Requests and Limits: What Actually Matters"
description: "Requests decide scheduling. Limits decide throttling and OOM kills. Confusing the two is one of the most common causes of avoidable production incidents."
pubDate: 2026-08-02
tags:
  - kubernetes
  - reliability
  - sre
draft: false
---

Resource requests and limits look like one setting with two numbers. They're actually two different mechanisms that happen to share a YAML block, and most of the confusion around them comes from treating them as one thing.

## Requests: what the scheduler sees

A request is a claim on the node, made at scheduling time. When the scheduler is deciding where a pod goes, it sums up the requests of everything already running on a node and checks whether there's room for one more. Requests are the number that determines *bin packing* — how tightly workloads are packed onto your fleet.

They don't do anything at runtime. A container using far less than its requested CPU isn't penalized, and one using more than requested isn't necessarily stopped — for CPU, it can burst into unused capacity on the node if there's room. Requests are purely an admission-time reservation.

## Limits: what the kernel enforces

Limits are enforced by the kernel, through cgroups, once the pod is actually running.

- **CPU limits** are enforced through a quota system. If a container exceeds its CPU limit, it isn't killed — it's throttled. The process keeps running but gets scheduled less CPU time, which shows up as latency, not errors. This is the part that catches people off guard: a service under a tight CPU limit can look "fine" (no restarts, no crash) while quietly getting slower under load.
- **Memory limits** are enforced by the OOM killer. Exceed your memory limit, and the kernel kills the container — no throttling equivalent exists for memory the way it does for CPU. This is why memory limits deserve more caution than CPU limits: getting them wrong doesn't cause slowdown, it causes restarts.

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

## QoS classes are a consequence, not a setting

Kubernetes derives a Quality of Service class from the relationship between requests and limits — you don't set it directly:

| Requests vs limits | QoS class | What it means under pressure |
|---|---|---|
| No requests or limits set | `BestEffort` | First to be evicted when a node is under resource pressure |
| Requests set, below limits | `Burstable` | Evicted before `Guaranteed` pods, after `BestEffort` |
| Requests equal limits, on every container | `Guaranteed` | Last to be evicted; also gets a dedicated CPU set if using static CPU manager policy |

This matters most during node-pressure eviction, not day-to-day scheduling. If a node is running low on memory, the kubelet evicts `BestEffort` pods first, then `Burstable` pods exceeding their requests, and only touches `Guaranteed` pods as a last resort.

## The mistake that causes the most incidents

Setting no requests at all is common, and it's the one that causes the most damage, because it doesn't fail loudly. Without a request, the scheduler treats the pod as needing effectively nothing, so it'll happily stack many such pods onto a node that doesn't actually have room for their real usage. The node looks fine on the scheduler's books and then hits real memory pressure in practice — at which point the kubelet starts evicting, and it evicts the unrequested pods first, which are often not the ones you'd have chosen.

The fix isn't "set limits everywhere" — it's set *requests* that reflect real observed usage (from actual metrics, not guesses), and be more deliberate about memory limits than CPU limits, since one throttles and the other kills.

## A reasonable default approach

- Set memory requests and limits equal, based on observed usage plus headroom — you want predictable eviction behavior, and memory has no graceful degradation path.
- Set CPU requests based on steady-state usage, and either omit CPU limits or set them generously — letting a container burst into spare node capacity is usually better than throttling it during a load spike.
- Revisit both after you have real usage data. Numbers picked before a workload has run in production are guesses, and guesses skew conservative, which quietly wastes capacity across a whole fleet.
