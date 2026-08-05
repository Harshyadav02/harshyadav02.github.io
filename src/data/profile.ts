// Central place for identity + copy. Edit this file to update the site's
// name, bio, and social links without touching any component.

export const profile = {
  name: 'Harsh Yadav',
  role: 'Site Reliability Engineer',
  roleSecondary: 'DevOps Engineer',
  tagline: 'Building reliable, scalable, cloud-native infrastructure.',
  focusStack: ['Kubernetes', 'AWS', 'Terraform', 'Observability', 'Automation'],

  location: 'India', // TODO: set the level of detail you're comfortable showing publicly (city, region, or remove entirely)
  email: 'your.email@example.com', // TODO: replace with real contact email

  social: {
    github: 'https://github.com/your-github-handle', // TODO: replace
    linkedin: 'https://linkedin.com/in/your-linkedin-handle', // TODO: replace
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
    body: [
      'Most of my work happens on client Kubernetes platforms running on AWS: building and hardening EKS clusters, writing and maintaining Helm charts, and keeping delivery pipelines boring in the good sense — predictable, reversible, and observable.',
      "A good chunk of that is reliability work: tracing an incident back to a misconfigured autoscaling policy, a saturated node pool, or a rollover policy that never fired, then fixing the root cause instead of just the symptom. I've spent time on image pull performance with lazy-loading snapshotters, on decoupling secrets management from application charts so upgrades stop fighting each other, and on packaging software for delivery through tools like Replicated instead of ad-hoc Helm installs.",
      "I care about infrastructure that's understandable months later — clear runbooks, charts that don't hide what they deploy, and dashboards that tell you what's actually wrong. Outside client work, I keep up with the Kubernetes and cloud-native community and write here about the parts of the ecosystem I've had to actually debug, not just read about.",
    ],
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
