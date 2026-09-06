// ============================================================
// NEXORA LEARNING PLATFORM
// Central platform data
// ============================================================

export const categories = [
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: "AI",
    description:
      "Build intelligent systems, AI agents and production ML applications.",
    courses: 1240,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "CY",
    description:
      "Master security engineering, ethical defense and cyber operations.",
    courses: 860,
  },
  {
    id: "software",
    name: "Software Engineering",
    icon: "SE",
    description:
      "Build scalable applications with modern engineering practices.",
    courses: 1680,
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "CL",
    description:
      "Design cloud infrastructure and automate modern delivery pipelines.",
    courses: 720,
  },
  {
    id: "data",
    name: "Data & Analytics",
    icon: "DA",
    description:
      "Turn complex data into decisions, insights and products.",
    courses: 940,
  },
  {
    id: "business",
    name: "Business & Leadership",
    icon: "BL",
    description:
      "Develop leadership, strategy and high-impact business skills.",
    courses: 1100,
  },
];

export const instructors = [
  {
    id: 1,
    name: "Dr. Maya Reynolds",
    role: "AI Researcher & Engineering Lead",
    company: "NEXORA Faculty",
    rating: 4.9,
    students: "184K",
    courses: 12,
  },
  {
    id: 2,
    name: "Daniel Carter",
    role: "Cybersecurity Architect",
    company: "NEXORA Security Lab",
    rating: 4.9,
    students: "126K",
    courses: 9,
  },
  {
    id: 3,
    name: "Sophia Mitchell",
    role: "Principal Software Engineer",
    company: "NEXORA Engineering",
    rating: 4.8,
    students: "211K",
    courses: 15,
  },
];

export const courses = [
  {
    id: 1,
    title: "AI Engineering & Generative AI",
    category: "Artificial Intelligence",
    categoryId: "ai",
    level: "Professional",
    rating: 4.9,
    students: 128000,
    learners: 128000,
    duration: "24 weeks",
    hours: 84,
    price: 79,
    originalPrice: 149,
    icon: "AI",
    instructorId: 1,
    instructor: "Dr. Maya Reynolds",
    instructorRole: "AI Researcher & Engineering Lead",
    lessons: 126,
    projects: 8,
    certificate: true,
    description:
      "A production-focused program covering generative AI, LLM applications, AI agents, prompt engineering and modern AI system architecture.",
    skills: [
      "Generative AI",
      "LLM Engineering",
      "Prompt Engineering",
      "AI Agents",
      "Python",
      "Machine Learning",
    ],
    outcomes: [
      "Build production-ready AI applications",
      "Design LLM-powered workflows",
      "Create autonomous AI agents",
      "Deploy AI systems to the cloud",
    ],
  },

  {
    id: 2,
    title: "Cybersecurity & Ethical Defense",
    category: "Cybersecurity",
    categoryId: "cybersecurity",
    level: "Advanced",
    rating: 4.8,
    students: 94000,
    learners: 94000,
    duration: "18 weeks",
    hours: 72,
    price: 69,
    originalPrice: 129,
    icon: "CY",
    instructorId: 2,
    instructor: "Daniel Carter",
    instructorRole: "Cybersecurity Architect",
    lessons: 108,
    projects: 7,
    certificate: true,
    description:
      "Learn practical cybersecurity through security operations, vulnerability assessment, ethical testing and defensive architecture.",
    skills: [
      "Network Security",
      "Ethical Hacking",
      "Vulnerability Assessment",
      "Security Operations",
      "Cryptography",
      "Incident Response",
    ],
    outcomes: [
      "Analyze common security vulnerabilities",
      "Build defensive security workflows",
      "Perform authorized security assessments",
      "Understand modern security operations",
    ],
  },

  {
    id: 3,
    title: "Full-Stack Software Engineering",
    category: "Software Development",
    categoryId: "software",
    level: "Professional",
    rating: 4.9,
    students: 211000,
    learners: 211000,
    duration: "28 weeks",
    hours: 112,
    price: 89,
    originalPrice: 169,
    icon: "FS",
    instructorId: 3,
    instructor: "Sophia Mitchell",
    instructorRole: "Principal Software Engineer",
    lessons: 164,
    projects: 12,
    certificate: true,
    description:
      "A complete software engineering journey covering frontend, backend, databases, APIs, testing, deployment and architecture.",
    skills: [
      "React",
      "JavaScript",
      "Node.js",
      "Python",
      "APIs",
      "Databases",
      "System Design",
    ],
    outcomes: [
      "Build complete full-stack applications",
      "Design production APIs",
      "Work with modern databases",
      "Deploy applications professionally",
    ],
  },

  {
    id: 4,
    title: "Cloud Architecture & DevOps",
    category: "Cloud Computing",
    categoryId: "cloud",
    level: "Advanced",
    rating: 4.8,
    students: 76000,
    learners: 76000,
    duration: "16 weeks",
    hours: 64,
    price: 74,
    originalPrice: 139,
    icon: "CL",
    instructorId: 1,
    instructor: "Dr. Maya Reynolds",
    instructorRole: "AI Researcher & Engineering Lead",
    lessons: 92,
    projects: 6,
    certificate: true,
    description:
      "Design resilient cloud platforms and automated delivery pipelines using modern DevOps and cloud architecture principles.",
    skills: [
      "Cloud Architecture",
      "AWS",
      "Docker",
      "CI/CD",
      "Infrastructure",
      "DevOps",
    ],
    outcomes: [
      "Design scalable cloud infrastructure",
      "Build automated CI/CD pipelines",
      "Containerize modern applications",
      "Apply cloud security principles",
    ],
  },

  {
    id: 5,
    title: "Data Analytics & Business Intelligence",
    category: "Data & Analytics",
    categoryId: "data",
    level: "Professional",
    rating: 4.8,
    students: 88000,
    learners: 88000,
    duration: "20 weeks",
    hours: 76,
    price: 64,
    originalPrice: 119,
    icon: "DA",
    instructorId: 1,
    instructor: "Dr. Maya Reynolds",
    instructorRole: "AI Researcher & Engineering Lead",
    lessons: 118,
    projects: 8,
    certificate: true,
    description:
      "Transform raw business data into actionable insights using analytics, visualization, SQL and modern data workflows.",
    skills: [
      "SQL",
      "Python",
      "Data Visualization",
      "Analytics",
      "Dashboards",
      "Statistics",
    ],
    outcomes: [
      "Analyze real-world datasets",
      "Create executive dashboards",
      "Write advanced SQL queries",
      "Communicate data-driven insights",
    ],
  },

  {
    id: 6,
    title: "Strategic Leadership & Product Management",
    category: "Business",
    categoryId: "business",
    level: "Executive",
    rating: 4.7,
    students: 53000,
    learners: 53000,
    duration: "14 weeks",
    hours: 48,
    price: 59,
    originalPrice: 109,
    icon: "PM",
    instructorId: 3,
    instructor: "Sophia Mitchell",
    instructorRole: "Principal Software Engineer",
    lessons: 74,
    projects: 5,
    certificate: true,
    description:
      "Develop product strategy, leadership thinking, decision-making and execution skills for modern technology organizations.",
    skills: [
      "Product Strategy",
      "Leadership",
      "Product Discovery",
      "Decision Making",
      "Roadmapping",
    ],
    outcomes: [
      "Build product strategies",
      "Create product roadmaps",
      "Lead cross-functional teams",
      "Make evidence-based decisions",
    ],
  },
];

export const learningPaths = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description:
      "A structured path from programming fundamentals to production AI engineering.",
    duration: "8-12 months",
    salary: "$110K+",
    demand: "VERY HIGH DEMAND",
    skills: ["Python", "LLMs", "Machine Learning", "AI Agents"],
    courses: [1, 5],
  },

  {
    id: "security-engineer",
    title: "Cybersecurity Engineer",
    description:
      "Develop practical security skills for modern defensive engineering teams.",
    duration: "6-10 months",
    salary: "$105K+",
    demand: "HIGH DEMAND",
    skills: ["Security", "Networking", "SOC", "Ethical Hacking"],
    courses: [2, 4],
  },

  {
    id: "software-engineer",
    title: "Full-Stack Engineer",
    description:
      "Become capable of designing and shipping complete software products.",
    duration: "8-12 months",
    salary: "$100K+",
    demand: "VERY HIGH DEMAND",
    skills: ["React", "Node.js", "Python", "APIs"],
    courses: [3, 4],
  },
];

export const platformStats = {
  learners: "2.8M+",
  courses: "7,500+",
  instructors: "1,200+",
  experts: "1,200+",
  countries: "190+",
  satisfaction: "94%",
  hiringPartners: "680+",
};

export const notifications = [
  {
    id: 1,
    type: "learning",
    title: "Continue your learning",
    message:
      "Your AI Engineering program is ready to continue.",
    time: "10 min ago",
    unread: true,
  },

  {
    id: 2,
    type: "achievement",
    title: "New achievement unlocked",
    message:
      "You completed another learning milestone.",
    time: "2 hours ago",
    unread: true,
  },

  {
    id: 3,
    type: "career",
    title: "Career insight available",
    message:
      "Your profile has a new recommended career path.",
    time: "Yesterday",
    unread: false,
  },
];

export const navItems = [
  {
    id: "home",
    label: "Home",
    icon: "⌂",
  },

  {
    id: "explore",
    label: "Explore",
    icon: "◈",
  },

  {
    id: "learning",
    label: "My Learning",
    icon: "▣",
  },

  {
    id: "career",
    label: "Career",
    icon: "↗",
  },

  {
    id: "certificates",
    label: "Certificates",
    icon: "✦",
  },
];

export const footerLinks = {
  Platform: [
    "Explore",
    "Learning Paths",
    "Certificates",
    "Pricing",
  ],

  Company: [
    "About Nexora",
    "Careers",
    "Press",
    "Partners",
  ],

  Resources: [
    "Help Center",
    "Community",
    "Blog",
    "Learning Guide",
  ],

  Business: [
    "NEXORA for Business",
    "Enterprise",
    "Teams",
    "Talent Development",
  ],
};