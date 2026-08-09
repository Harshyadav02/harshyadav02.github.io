// Central place for identity + copy. Edit this file to update the site's
// name, bio, and social links without touching any component.

export const profile = {
  name: 'Harsh Yadav',
  role: 'Site Reliability Engineer',
  roleSecondary: 'DevOps Engineer',
  tagline: 'Building reliable, scalable, cloud-native infrastructure.',
  focusStack: ['Kubernetes', 'AWS', 'Terraform', 'Observability', 'Automation'],

  location: 'India', // TODO: set the level of detail you're comfortable showing publicly (city, region, or remove entirely)
  email: 'harshyadav5736@gmail.com',

  social: {
    github: 'https://github.com/harshyadav02',
    githubUser: 'harshyadav02',
    linkedin: 'https://www.linkedin.com/in/harshyadav02',
    linkedinUser: 'harshyadav02',
  },

  terminal: {
    user: 'harsh',
    host: 'production',
    lines: [
      { key: 'role', value: 'site-reliability-engineer' },
      { key: 'focus', value: 'kubernetes' },
      { key: 'cloud', value: 'aws' },
      { key: 'status', value: 'operational' },
    ],
  },

  about: {
    intro:
      "I work on cloud-native infrastructure — Kubernetes platforms, reliability, observability, and automation — as an Associate Site Reliability Engineer at CloudRaft, a cloud-native and AI infrastructure consulting company.",
    stack: [
      'Kubernetes',
      'AWS',
      'Terraform',
      'Helm',
      'ArgoCD',
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
      'Linux',
      'Docker',
      'CI/CD',
    ],
  },

  contact: {
    heading: 'Have an interesting infrastructure problem?',
    body: "Let's talk.",
  },
};
