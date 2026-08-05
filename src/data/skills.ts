export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: 'Cloud & Infrastructure',
    items: ['AWS', 'Terraform', 'Linux', 'Networking', 'IAM'],
  },
  {
    title: 'Kubernetes & Platform',
    items: ['Kubernetes', 'EKS', 'Helm', 'ArgoCD', 'Karpenter', 'Descheduler'],
  },
  {
    title: 'Observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Loki', 'Tempo'],
  },
  {
    title: 'Automation & CI/CD',
    items: ['GitHub Actions', 'Docker', 'Python', 'Bash'],
  },
];
