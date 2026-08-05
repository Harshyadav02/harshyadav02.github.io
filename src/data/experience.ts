export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  date: string;
  description: string;
  responsibilities: string[];
}

// Edit this array to update the Experience page/section.
// Client engagement details are intentionally kept general — specific client
// names and infrastructure details are left out of a public portfolio.
export const experience: ExperienceEntry[] = [
  {
    company: 'CloudRaft',
    role: 'Associate Site Reliability Engineer',
    location: 'Remote', // TODO: adjust if you want a specific location shown
    date: 'TODO — start date', // TODO: fill in
    description:
      'CloudRaft is a cloud-native and AI infrastructure consulting company. I work as a contractor across client engagements, focused on Kubernetes platform infrastructure on AWS.',
    responsibilities: [
      'Design and operate Kubernetes clusters on AWS (EKS), including node provisioning, scaling, and cluster-level configuration',
      'Author and maintain Helm charts for application and platform delivery',
      'Investigate and resolve production reliability incidents — scaling, storage, and search/index stability issues',
      'Improve CI/CD pipelines for container image builds and Helm-based releases',
      'Package and deliver software to customers via tooling such as Replicated, moving teams off manual Helm/ECR workflows',
      'Write customer-facing technical documentation for infrastructure onboarding',
    ],
  },
  // Add earlier roles here in the same shape, most recent first.
];
