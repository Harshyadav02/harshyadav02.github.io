export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  href?: string; // TODO: link to a repo or write-up if you have a public one
  featured: boolean;
}

// Edit this array to update the Projects page. Descriptions reflect the kind
// of work behind each area rather than a single named repository.
export const projects: Project[] = [
  {
    slug: 'kubernetes-platform-engineering',
    title: 'Kubernetes Platform Engineering',
    summary:
      'Building and operating Kubernetes platform infrastructure on AWS — cluster provisioning, Helm-based delivery, and workload scheduling.',
    description:
      'Ongoing platform work across EKS clusters: setting up node groups and container image lazy-loading (SOCI snapshotters) to speed up pod startup, structuring Helm charts so upgrades are predictable, and using ArgoCD for GitOps-style delivery. This is the day-to-day work of keeping a cluster boring — provisioning that scales cleanly and rollouts that are easy to reason about.',
    tech: ['Kubernetes', 'AWS', 'EKS', 'Helm', 'ArgoCD', 'Terraform'],
    featured: true,
  },
  {
    slug: 'observability-platform',
    title: 'Observability Platform',
    summary:
      'Instrumenting and stabilizing observability stacks — metrics, logs, and traces — so incidents are diagnosable instead of guesswork.',
    description:
      'Work on the Prometheus / Grafana / Loki / Tempo side of the stack, plus OpenTelemetry-based instrumentation. Includes tracing production incidents (unassigned shards, JVM heap pressure, broken index lifecycle policies) back to root cause using the same dashboards and logs the stack produces — and fixing the underlying configuration, not just the symptom.',
    tech: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Loki', 'Tempo'],
    featured: true,
  },
  {
    slug: 'infrastructure-automation',
    title: 'Infrastructure Automation',
    summary: 'Terraform-based cloud infrastructure and repeatable, automated deployments.',
    description:
      'Infrastructure-as-code work for cloud resources that back Kubernetes platforms — IAM, networking, and supporting AWS services — plus CI/CD pipelines for container builds and chart releases. The goal is that standing up or changing infrastructure is a pull request, not a set of manual console steps.',
    tech: ['Terraform', 'AWS', 'GitHub Actions', 'Docker'],
    featured: true,
  },
  {
    slug: 'scheduling-and-cost-optimization',
    title: 'Kubernetes Scheduling & Cost Optimization',
    summary:
      'Improving node utilization and lowering cloud spend through smarter scheduling and workload placement.',
    description:
      'Work with Karpenter for demand-driven node provisioning and the Kubernetes Descheduler for rebalancing workloads that have drifted onto suboptimal nodes over time. The combination reduces idle capacity without hand-tuning autoscaler thresholds for every workload.',
    tech: ['Karpenter', 'Kubernetes Descheduler', 'AWS', 'Kubernetes'],
    featured: false,
  },
];
