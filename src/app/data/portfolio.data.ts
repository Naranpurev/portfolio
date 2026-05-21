import { PortfolioData } from '../models/portfolio.model';

export const PORTFOLIO: PortfolioData = {
  name: 'Naranpurev Munkhbayar',
  title: 'Senior Front-End Developer',
  tagline: 'Angular · TypeScript · RxJS · JavaScript · Java · Spring Boot',
  summary: `Senior Front-End Developer with 10 years of experience designing and delivering enterprise-grade web applications, with deep specialization in Angular and the broader JavaScript ecosystem. Most recently served as the sole front-end engineer on Cisco's Virtual Visitation Solution — a cloud-hosted SaaS platform enabling secure real-time video visitations for correctional facilities across the United States.`,
  contact: {
    email: 'naranpurev0727@gmail.com',
    emailOutlook: 'naranpurev0727@outlook.com',
    phone: '(202) 603-****',
    linkedin: 'https://linkedin.com/in/naranpurev',
  },
  experience: [
    {
      company: 'Cisco Systems',
      via: 'via Teksyntax Inc.',
      role: 'Senior Front-End Developer / Architect',
      location: 'Research Triangle Park, NC',
      period: 'Feb 2022 – Feb 2026',
      project:
        'Virtual Visitation Solution (VVS) — an enterprise SaaS platform enabling secure, real-time video visitations for correctional facilities. The platform supports multiple user roles (attorneys, family members, court representatives, facility administrators) and manages the full meeting lifecycle from initial request through live video session completion.',
      bullets: [
        {
          label: 'Sole Front-End Owner',
          text: 'Served as the only front-end developer on the VVS platform for four years — independently responsible for all UI architecture decisions, component design, feature development, testing, and production deployments. Coordinated directly with product management, backend Java engineers, and QA teams to deliver every front-end release.',
        },
        {
          label: 'Angular Migration & Modernization',
          text: 'Led a full migration of the Angular codebase from version 7 through to Angular 20 across multiple upgrade cycles — adopting standalone components (Angular 14+), lazy-loaded feature modules, the new @if/@for block template syntax (Angular 17), and preparing groundwork for Signals-based reactivity.',
        },
        {
          label: 'Webex SDK & Real-Time Video Integration',
          text: 'Integrated the Webex JS SDK v3 into Angular to power live video sessions between inmates and visitors. Managed the complete meeting lifecycle — handling state transitions (Pending → Approved → Scheduled → In-Progress → Completed), rendering live participant video streams, and handling edge cases such as camera permission denials and dropped connections.',
        },
        {
          label: 'Component Architecture & Design System',
          text: 'Designed and maintained an internal shared component library built on Angular Material and PrimeNG — including visitation cards, status badges, role-based action menus, and data tables. All presentational components were kept stateless and driven purely by @Input/@Output.',
        },
        {
          label: 'Full-Cycle API Integration',
          text: 'Integrated the VVS UI service as the single API gateway coordinating with 9 Spring Boot microservices. Managed complex async data flows using RxJS (switchMap, combineLatest, forkJoin, debounceTime). When back-end timelines blocked needed endpoints, independently authored Spring Boot REST API endpoints — unblocking front-end delivery.',
        },
        {
          label: 'Accessibility — WCAG 2.1 / ADA',
          text: 'Systematically applied WCAG 2.1 Level AA standards: semantic HTML, full keyboard navigation, ARIA roles and labels on all interactive elements, aria-live regions for dynamic status changes, and color contrast ratios validated against AA thresholds.',
        },
        {
          label: 'Performance Optimization',
          text: 'Applied OnPush change detection across all presentational components, trackBy on all list renders, and route-level lazy loading per user-role feature module. Memoized expensive computed values to prevent re-computation on every change detection cycle.',
        },
        {
          label: 'CI/CD, Jenkins & AWS',
          text: 'Built and deployed feature branches via Jenkins CI/CD pipelines to AWS EC2 test environments. Managed SonarQube quality gates (code coverage, security vulnerability, and code smell checks). Used Amazon S3 for static asset storage and document file upload features.',
        },
        {
          label: 'State Management — RxJS & NgRx',
          text: 'Managed application state using RxJS BehaviorSubject for real-time meeting status, and NgRx store for complex cross-feature state including user session data, role-based feature flags, and facility-level configuration.',
        },
        {
          label: 'Admin Platform (React)',
          text: 'Developed a React-based admin portal for client administrators to configure VVS settings, using Redux for state management and React hooks (useState, useEffect) to create responsive, data-driven admin interfaces.',
        },
      ],
      tech: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Java', 'Spring Boot', 'Webex JS SDK v3', 'React', 'Redux', 'AWS EC2/S3', 'MongoDB'],
    },
    {
      company: 'Santander Bank',
      role: 'Angular Developer',
      location: 'Boston, MA',
      period: 'May 2020 – Dec 2021',
      project:
        'Internal Employee Operations Dashboard — a centralized web application used by banking staff across multiple departments to manage customer inquiries, account details, transaction history, service request processing, and compliance task tracking.',
      bullets: [
        {
          label: 'Core Dashboard Development',
          text: 'Built and owned multiple feature modules — Customer Inquiry Management, Account Detail Viewer, Transaction History Explorer, and Service Request Tracker — each as an independent Angular feature module with its own routing, state management, and API integration.',
        },
        {
          label: 'Angular Architecture & Module Design',
          text: 'Designed lazy-loaded feature module architecture keeping initial load time low despite the application\'s breadth. Applied NgRx for centralized state across shared data while keeping feature-level state local using component-level services.',
        },
        {
          label: 'Complex Data Table Engineering',
          text: 'Built high-performance paginated data tables rendering thousands of records with real-time sorting, multi-column filtering, and column resizing. Implemented virtual scrolling, trackBy, and OnPush change detection on all table components.',
        },
        {
          label: 'REST API Integration & Async Data Handling',
          text: 'Integrated multiple internal financial REST APIs using RxJS — switchMap for account navigation, forkJoin for parallel data loading, debounceTime on search inputs, and retry logic with graceful error handling for flaky internal services.',
        },
        {
          label: 'Role-Based UI & Permissions',
          text: 'Implemented role-based rendering so front-line agents, supervisors, and compliance officers saw different sets of actions and data fields — controlled through route guards and dynamic component rendering driven by a permissions service.',
        },
        {
          label: 'Performance Profiling',
          text: 'Used Angular DevTools and Chrome Performance profiler to identify and resolve rendering bottlenecks in the transaction history table and account lookup views — reducing time-to-interactive on high-volume data screens.',
        },
      ],
      tech: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'MongoDB', 'Jasmine', 'Karma'],
    },
    {
      company: 'Unitel Group',
      role: 'Front-End Developer',
      location: 'Ulaanbaatar, Mongolia',
      period: 'Mar 2015 – May 2018',
      project:
        'Customer Self-Service Portal — a public-facing SPA enabling Unitel telecom customers to manage accounts, view and pay bills, monitor data and call usage, upgrade service plans, and submit support requests.',
      bullets: [
        {
          label: 'React SPA Architecture',
          text: 'Led front-end architecture and development from initial setup through production launch. Structured around React functional components and hooks, eliminating class-based patterns. Configured custom Webpack for code splitting and optimized production builds.',
        },
        {
          label: 'Redux State Management',
          text: 'Implemented centralized application state using Redux — designing the full state shape, action creators, reducers, and middleware layer (redux-thunk) for authenticated user session, account data, billing history, usage metrics, and active plan details.',
        },
        {
          label: 'Account & Billing Features',
          text: 'Built the Account Overview dashboard with billing cycle status, outstanding balance, and usage summaries. Implemented the Bill Payment flow with multi-step form validation, payment method selection, and confirmation — integrating the payment processing API.',
        },
        {
          label: 'Usage Analytics & Data Visualization',
          text: 'Developed interactive usage history charts showing data consumption, call minutes, and SMS usage over time. Implemented date range filtering and comparative views (current vs. previous billing period).',
        },
        {
          label: 'Reusable React Component Library',
          text: 'Developed an internal React component library — buttons, form inputs, modals, toasts, data cards, and loading skeletons — styled with CSS Modules for scoped, maintainable styles with no global side effects.',
        },
        {
          label: 'Responsive Design',
          text: 'Built all portal screens fully responsive across desktop, tablet, and mobile. Used Flexbox and CSS Grid for layout, validated across Chrome, Firefox, Safari, and Opera.',
        },
      ],
      tech: ['React', 'Redux', 'JavaScript (ES6+)', 'CSS Modules', 'Webpack', 'Axios', 'React Router'],
    },
  ],
  skills: [
    {
      category: 'Core Languages',
      items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / SCSS', 'Java'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['Angular (v7–v20)', 'RxJS', 'NgRx', 'Angular Material', 'PrimeNG', 'React', 'Redux', 'Spring Boot'],
    },
    {
      category: 'Angular Expertise',
      items: ['Standalone Components', 'Signals', 'Lazy Loading', 'OnPush Change Detection', 'Reactive Forms', 'HTTP Interceptors', 'Custom Directives & Pipes'],
    },
    {
      category: 'Real-Time & Video',
      items: ['Webex JS SDK v3', 'Webex REST APIs', 'WebRTC', 'WebSockets'],
    },
    {
      category: 'Testing & Code Quality',
      items: ['Jasmine', 'Karma', 'Cypress (E2E)', 'Jest', 'SonarQube', 'ESLint'],
    },
    {
      category: 'CI/CD & Cloud',
      items: ['Jenkins', 'Git / GitHub', 'Webpack', 'AWS EC2', 'AWS S3', 'Linux CLI', 'npm / yarn'],
    },
    {
      category: 'Design & Accessibility',
      items: ['Figma', 'Adobe XD', 'Miro', 'WCAG 2.1 / ADA Compliance'],
    },
    {
      category: 'AI Development Tools',
      items: ['GitHub Copilot', 'ChatGPT', 'Claude'],
    },
  ],
  education: [
    {
      level: 'M.S.',
      field: 'Information Technology',
      school: 'University of the Potomac',
      location: 'Washington, DC',
      period: 'Jan 2021 – Feb 2022',
    },
    {
      level: 'M.B.A.',
      field: 'Entrepreneurship',
      school: 'Bay Atlantic University',
      location: 'Washington, DC',
      period: 'Aug 2018 – Jun 2020',
    },
    {
      level: 'B.S.',
      field: 'Petroleum Engineering',
      school: 'Mongolian University of Science and Technology',
      location: 'Ulaanbaatar, Mongolia',
      period: 'Aug 2013 – Jun 2017',
    },
  ],
  certifications: [
    {
      title: 'Member Verification — Mongolian IT Professionals US',
      issuer: 'MITPU',
      issuerType: 'mitpu' as const,
      image: 'assets/MITPU Member verification letter for Naranpurev.png',
      date: 'Mar 2024',
    },
    {
      title: 'Foundations of Project Management',
      issuer: 'Google / Coursera',
      issuerType: 'google' as const,
      image: 'assets/Project Management Certification.png',
      date: 'Feb 2024',
    },
    {
      title: 'Node.js API Masterclass with Express & MongoDB',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/Node.js API Masterclass with Express & MongoDB Certification.png',
    },
    {
      title: 'Angular Front To Back',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/Angular Front To Back Certification.png',
    },
    {
      title: 'The Modern Angular Bootcamp',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/The Modern Angular Bootcamp Certification.png',
    },
    {
      title: 'JavaScript Algorithms & Data Structures Masterclass',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/JavaScript Algorithms and Data Structures Masterclass Certification.png',
    },
    {
      title: '50 Projects: JavaScript & CSS',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/50 Projects - JavaScript,CSS.png',
    },
    {
      title: 'Modern HTML & CSS From The Beginning (incl. Sass)',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/Modern HTML & CSS From The Beginning (Including Sass) Certification.png',
    },
    {
      title: 'Bootstrap 4 From Scratch With 5 Projects',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/Bootstrap 4 From Scratch With 5 Projects Certification.png',
    },
    {
      title: 'UX Design Essentials — Adobe XD UI/UX Design',
      issuer: 'Udemy',
      issuerType: 'udemy' as const,
      image: 'assets/User Experience Design Essentials - Adobe XD UI UX Design Certification.png',
    },
  ],
};
