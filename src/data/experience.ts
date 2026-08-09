export interface ExperienceRole {
  title: string;
  date: string;
  description: string;
  responsibilities: string[];
}

export interface ExperienceEntry {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

// Edit this array to update the Experience page/section.
// Client engagement details are intentionally kept general — specific client
// names and infrastructure details are left out of a public portfolio.
export const experience: ExperienceEntry[] = [
  {
    company: 'CloudRaft',
    location: 'Remote', // TODO: adjust if you want a specific location shown
    roles: [
      {
        title: 'Associate Site Reliability Engineer',
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
      {
        title: 'DevOps Intern',
        date: 'TODO — start date', // TODO: fill in
        description:
          'Interned with the platform team at CloudRaft, supporting cloud-native infrastructure and delivery workflows before converting to a full-time role.',
        responsibilities: [
          'Provisioned and maintained AWS infrastructure with Terraform, including containerized workloads and networking',
          'Assisted with CI/CD pipelines for building and deploying container images',
          'Gained hands-on experience with Kubernetes fundamentals, Helm, and observability tooling',
        ],
      },
    ],
  },
  // Add earlier companies here in the same shape, most recent first.
];
