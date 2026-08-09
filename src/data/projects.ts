export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  href?: string; // TODO: link to a repo or write-up if you have a public one
  featured: boolean;
}

// PLACEHOLDER client data — replace descriptions and tech with the real work
// you did for each engagement, most recent first.
export const projects: Project[] = [
  {
    slug: 'enkrypt-ai',
    title: 'Enkrypt AI',
    summary:
      'Kubernetes and GPU infrastructure for an AI platform, with reliable model-serving workloads on AWS.',
    description:
      'TODO — add the real description for this engagement.',
    tech: ['Kubernetes', 'AWS', 'GPU', 'Helm', 'Prometheus'],
    featured: true,
  },
  {
    slug: 'hearzap',
    title: 'Hearzap',
    summary:
      'Scaling and hardening the microservice platform behind an audio/social app, focused on reliability and observability.',
    description:
      'TODO — add the real description for this engagement.',
    tech: ['Kubernetes', 'AWS', 'Helm', 'Terraform', 'Grafana'],
    featured: true,
  },
  {
    slug: 'skyswitch',
    title: 'SkySwitch',
    summary:
      'Cloud-native delivery and platform work for a SaaS product, automating deployments and stabilizing production.',
    description:
      'TODO — add the real description for this engagement.',
    tech: ['Kubernetes', 'AWS', 'CI/CD', 'ArgoCD', 'Docker'],
    featured: true,
  },
];
