import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./App.css";

/* =========================================================
   NAJAF ACADEMY
   PROFESSIONAL LEARNING PLATFORM
========================================================= */

const ACADEMY_NAME = "NAJAF ACADEMY";
const ACADEMY_SHORT = "NAJAF";

/* =========================================================
   GOOGLE LOGIN
   ---------------------------------------------------------
   Add your Google Client ID later:

   const GOOGLE_CLIENT_ID =
     "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

   The application is currently structured so that the
   Google login button can be connected to Google Identity
   Services without changing the rest of the authentication UI.
========================================================= */

/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    native: "English",
  },
  {
    code: "hi",
    label: "Hindi",
    native: "à¤¹à¤¿à¤¨à¥à¤¦à¥€",
  },
  {
    code: "ur",
    label: "Urdu",
    native: "Ø§Ø±Ø¯Ùˆ",
  },
  {
    code: "ar",
    label: "Arabic",
    native: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©",
  },
  {
    code: "es",
    label: "Spanish",
    native: "EspaÃ±ol",
  },
  {
    code: "fr",
    label: "French",
    native: "FranÃ§ais",
  },
];

/* =========================================================
   CURRENCIES
========================================================= */

const CURRENCIES = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rate: 1,
  },
  {
    code: "EUR",
    symbol: "â‚¬",
    name: "Euro",
    rate: 0.92,
  },
  {
    code: "GBP",
    symbol: "Â£",
    name: "British Pound",
    rate: 0.79,
  },
  {
    code: "INR",
    symbol: "â‚¹",
    name: "Indian Rupee",
    rate: 83.2,
  },
  {
    code: "AED",
    symbol: "Ø¯.Ø¥",
    name: "UAE Dirham",
    rate: 3.67,
  },
  {
    code: "SAR",
    symbol: "ï·¼",
    name: "Saudi Riyal",
    rate: 3.75,
  },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  en: {
    home: "Home",
    explore: "Explore",
    learning: "My Learning",
    certificates: "Certificates",
    wishlist: "Wishlist",
    bengaluru: "Bengaluru",
    signIn: "Sign in",
    getStarted: "Get started",
    search: "Search courses",
    learn: "Learn",
    skills: "Skills",
    career: "Career",
    professional: "Professional learning",
    academy: "Professional Learning Platform",
  },

  hi: {
    home: "à¤¹à¥‹à¤®",
    explore: "à¤•à¥‹à¤°à¥à¤¸",
    learning: "à¤®à¥‡à¤°à¥€ à¤ªà¤¢à¤¼à¤¾à¤ˆ",
    certificates: "à¤ªà¥à¤°à¤®à¤¾à¤£à¤ªà¤¤à¥à¤°",
    wishlist: "à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾",
    bengaluru: "à¤¬à¥‡à¤‚à¤—à¤²à¥à¤°à¥",
    signIn: "à¤¸à¤¾à¤‡à¤¨ à¤‡à¤¨",
    getStarted: "à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚",
    search: "à¤•à¥‹à¤°à¥à¤¸ à¤–à¥‹à¤œà¥‡à¤‚",
    learn: "à¤¸à¥€à¤–à¥‡à¤‚",
    skills: "à¤•à¥Œà¤¶à¤²",
    career: "à¤•à¤°à¤¿à¤¯à¤°",
    professional: "à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤• à¤¶à¤¿à¤•à¥à¤·à¤¾",
    academy: "à¤ªà¥à¤°à¥‹à¤«à¥‡à¤¶à¤¨à¤² à¤²à¤°à¥à¤¨à¤¿à¤‚à¤— à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤®",
  },

  ur: {
    home: "ÛÙˆÙ…",
    explore: "Ú©ÙˆØ±Ø³Ø²",
    learning: "Ù…ÛŒØ±ÛŒ ØªØ¹Ù„ÛŒÙ…",
    certificates: "Ø³Ø±Ù¹ÛŒÙÚ©ÛŒÙ¹Ø³",
    wishlist: "Ù¾Ø³Ù†Ø¯ÛŒØ¯Û",
    bengaluru: "Ø¨Ù†Ú¯Ù„ÙˆØ±Ùˆ",
    signIn: "Ø³Ø§Ø¦Ù† Ø§ÙÙ†",
    getStarted: "Ø´Ø±ÙˆØ¹ Ú©Ø±ÛŒÚº",
    search: "Ú©ÙˆØ±Ø³ ØªÙ„Ø§Ø´ Ú©Ø±ÛŒÚº",
    learn: "Ø³ÛŒÚ©Ú¾ÛŒÚº",
    skills: "Ù…ÛØ§Ø±ØªÛŒÚº",
    career: "Ú©ÛŒØ±ÛŒØ¦Ø±",
    professional: "Ù¾ÛŒØ´Û ÙˆØ±Ø§Ù†Û ØªØ¹Ù„ÛŒÙ…",
    academy: "Ù¾ÛŒØ´Û ÙˆØ±Ø§Ù†Û Ù„Ø±Ù†Ù†Ú¯ Ù¾Ù„ÛŒÙ¹ ÙØ§Ø±Ù…",
  },

  ar: {
    home: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    explore: "Ø§Ø³ØªÙƒØ´Ù",
    learning: "ØªØ¹Ù„Ù…ÙŠ",
    certificates: "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø§Øª",
    wishlist: "Ø§Ù„Ù…ÙØ¶Ù„Ø©",
    bengaluru: "Ø¨Ù†ØºØ§Ù„ÙˆØ±Ùˆ",
    signIn: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„",
    getStarted: "Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†",
    search: "Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ø¯ÙˆØ±Ø§Øª",
    learn: "ØªØ¹Ù„Ù…",
    skills: "Ø§Ù„Ù…Ù‡Ø§Ø±Ø§Øª",
    career: "Ø§Ù„Ù…Ù‡Ù†Ø©",
    professional: "Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ù…Ù‡Ù†ÙŠ",
    academy: "Ù…Ù†ØµØ© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ù…Ù‡Ù†ÙŠ",
  },

  es: {
    home: "Inicio",
    explore: "Explorar",
    learning: "Mi aprendizaje",
    certificates: "Certificados",
    wishlist: "Favoritos",
    bengaluru: "Bengaluru",
    signIn: "Iniciar sesiÃ³n",
    getStarted: "Comenzar",
    search: "Buscar cursos",
    learn: "Aprender",
    skills: "Habilidades",
    career: "Carrera",
    professional: "Aprendizaje profesional",
    academy: "Plataforma de aprendizaje profesional",
  },

  fr: {
    home: "Accueil",
    explore: "Explorer",
    learning: "Mon apprentissage",
    certificates: "Certificats",
    wishlist: "Favoris",
    bengaluru: "Bengaluru",
    signIn: "Connexion",
    getStarted: "Commencer",
    search: "Rechercher des cours",
    learn: "Apprendre",
    skills: "CompÃ©tences",
    career: "CarriÃ¨re",
    professional: "Formation professionnelle",
    academy: "Plateforme d'apprentissage professionnel",
  },
};

/* =========================================================
   CATEGORIES
========================================================= */

const CATEGORIES = [
  "All",
  "Cybersecurity",
  "AI & Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Programming",
  "Data Science",
  "Design",
  "Business",
];

/* =========================================================
   COURSES
========================================================= */

const COURSES = [
  {
    id: 1,
    title: "Google Cybersecurity Professional Certificate",
    category: "Cybersecurity",
    level: "Beginner",
    instructor: "Google Career Certificates",
    rating: 4.9,
    students: "186K",
    duration: "6 months",
    lessons: 145,
    price: 49,
    oldPrice: 79,
    featured: true,
    badge: "Professional Certificate",
    description:
      "Build job-ready cybersecurity skills covering security fundamentals, Linux, SQL, network security, incident response and Python.",
    skills: [
      "Cybersecurity fundamentals",
      "Network security",
      "Linux",
      "SQL",
      "Python",
      "Incident response",
    ],
    modules: [
      {
        title: "Foundations of Cybersecurity",
        lessons: [
          "Introduction to cybersecurity",
          "Security frameworks",
          "Security controls",
          "Risk management",
        ],
      },
      {
        title: "Play It Safe",
        lessons: [
          "Security threats",
          "Authentication",
          "Authorization",
          "Security policies",
        ],
      },
      {
        title: "Connect and Protect",
        lessons: [
          "Networking fundamentals",
          "Network attacks",
          "Firewalls",
          "Network security",
        ],
      },
      {
        title: "Tools of the Trade",
        lessons: [
          "Linux",
          "Command line",
          "SQL",
          "Security tools",
        ],
      },
      {
        title: "Assets, Threats and Vulnerabilities",
        lessons: [
          "Asset management",
          "Threat modeling",
          "Vulnerability assessment",
          "Risk analysis",
        ],
      },
      {
        title: "Sound the Alarm",
        lessons: [
          "Incident response",
          "Detection",
          "SIEM",
          "Security investigations",
        ],
      },
    ],
  },

  {
    id: 2,
    title: "Machine Learning with Python",
    category: "AI & Machine Learning",
    level: "Intermediate",
    instructor: "Najaf Academy AI Lab",
    rating: 4.8,
    students: "92K",
    duration: "4 months",
    lessons: 98,
    price: 44,
    oldPrice: 69,
    featured: true,
    badge: "AI Career Track",
    description:
      "Learn practical machine learning using Python, NumPy, pandas and scikit-learn while building real predictive models.",
    skills: [
      "Python",
      "NumPy",
      "pandas",
      "scikit-learn",
      "Regression",
      "Classification",
    ],
    modules: [
      {
        title: "Python for Machine Learning",
        lessons: [
          "Python foundations",
          "NumPy",
          "pandas",
          "Data preparation",
        ],
      },
      {
        title: "Supervised Learning",
        lessons: [
          "Linear regression",
          "Logistic regression",
          "Decision trees",
          "Random forests",
        ],
      },
      {
        title: "Unsupervised Learning",
        lessons: [
          "Clustering",
          "K-means",
          "Dimensionality reduction",
          "PCA",
        ],
      },
      {
        title: "Model Evaluation",
        lessons: [
          "Train-test split",
          "Cross validation",
          "Precision and recall",
          "Model selection",
        ],
      },
    ],
  },

  {
    id: 3,
    title: "React Frontend Development",
    category: "Web Development",
    level: "Intermediate",
    instructor: "Najaf Academy Web Lab",
    rating: 4.9,
    students: "74K",
    duration: "3 months",
    lessons: 86,
    price: 39,
    oldPrice: 59,
    featured: true,
    badge: "Career Ready",
    description:
      "Build modern, responsive React applications with reusable components, state management, APIs and professional UI architecture.",
    skills: [
      "React",
      "JavaScript",
      "Components",
      "Hooks",
      "REST APIs",
      "Responsive UI",
    ],
    modules: [
      {
        title: "React Foundations",
        lessons: [
          "React setup",
          "JSX",
          "Components",
          "Props",
        ],
      },
      {
        title: "State and Hooks",
        lessons: [
          "useState",
          "useEffect",
          "useMemo",
          "Custom hooks",
        ],
      },
      {
        title: "Working with APIs",
        lessons: [
          "REST APIs",
          "Fetch",
          "Loading states",
          "Error handling",
        ],
      },
      {
        title: "Professional React Architecture",
        lessons: [
          "Component architecture",
          "Routing",
          "Performance",
          "Deployment",
        ],
      },
    ],
  },

  {
    id: 4,
    title: "AWS Cloud Practitioner Essentials",
    category: "Cloud Computing",
    level: "Beginner",
    instructor: "Najaf Academy Cloud Lab",
    rating: 4.7,
    students: "61K",
    duration: "2 months",
    lessons: 64,
    price: 35,
    oldPrice: 55,
    featured: false,
    badge: "Cloud Foundations",
    description:
      "Understand AWS cloud concepts, compute, storage, networking, security, pricing and cloud architecture.",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "IAM",
      "Cloud architecture",
      "Networking",
    ],
    modules: [
      {
        title: "Cloud Concepts",
        lessons: [
          "What is cloud computing",
          "Cloud economics",
          "AWS global infrastructure",
          "Shared responsibility",
        ],
      },
      {
        title: "AWS Core Services",
        lessons: [
          "EC2",
          "S3",
          "RDS",
          "Lambda",
        ],
      },
      {
        title: "Security",
        lessons: [
          "IAM",
          "Security groups",
          "Encryption",
          "Compliance",
        ],
      },
    ],
  },

  {
    id: 5,
    title: "Python Programming Masterclass",
    category: "Programming",
    level: "Beginner",
    instructor: "Najaf Academy Programming Lab",
    rating: 4.9,
    students: "143K",
    duration: "4 months",
    lessons: 120,
    price: 29,
    oldPrice: 49,
    featured: false,
    badge: "Most Popular",
    description:
      "Go from Python basics to practical programming, automation, APIs, file handling and object-oriented development.",
    skills: [
      "Python",
      "Programming",
      "OOP",
      "Automation",
      "APIs",
      "File handling",
    ],
    modules: [
      {
        title: "Python Basics",
        lessons: [
          "Variables",
          "Data types",
          "Conditions",
          "Loops",
        ],
      },
      {
        title: "Functions and Collections",
        lessons: [
          "Functions",
          "Lists",
          "Dictionaries",
          "Sets",
        ],
      },
      {
        title: "Object-Oriented Python",
        lessons: [
          "Classes",
          "Objects",
          "Inheritance",
          "Polymorphism",
        ],
      },
      {
        title: "Practical Python",
        lessons: [
          "Files",
          "APIs",
          "Automation",
          "Projects",
        ],
      },
    ],
  },

  {
    id: 6,
    title: "Data Science with Python",
    category: "Data Science",
    level: "Intermediate",
    instructor: "Najaf Academy Data Lab",
    rating: 4.8,
    students: "58K",
    duration: "4 months",
    lessons: 104,
    price: 42,
    oldPrice: 65,
    featured: false,
    badge: "Data Career",
    description:
      "Learn data analysis, visualization, statistics and practical data science workflows using Python.",
    skills: [
      "Python",
      "pandas",
      "Data analysis",
      "Visualization",
      "Statistics",
      "Jupyter",
    ],
    modules: [
      {
        title: "Data Analysis Foundations",
        lessons: [
          "Data types",
          "Data cleaning",
          "pandas",
          "Exploratory analysis",
        ],
      },
      {
        title: "Visualization",
        lessons: [
          "Matplotlib",
          "Charts",
          "Dashboards",
          "Storytelling",
        ],
      },
      {
        title: "Statistics",
        lessons: [
          "Descriptive statistics",
          "Probability",
          "Distributions",
          "Correlation",
        ],
      },
    ],
  },

  {
    id: 7,
    title: "UI/UX Design Professional",
    category: "Design",
    level: "Beginner",
    instructor: "Najaf Academy Design Studio",
    rating: 4.7,
    students: "37K",
    duration: "3 months",
    lessons: 78,
    price: 34,
    oldPrice: 52,
    featured: false,
    badge: "Creative Career",
    description:
      "Learn user research, information architecture, wireframing, prototyping and professional interface design.",
    skills: [
      "UI design",
      "UX research",
      "Wireframing",
      "Prototyping",
      "Design systems",
      "Figma",
    ],
    modules: [
      {
        title: "UX Foundations",
        lessons: [
          "User research",
          "Personas",
          "User journeys",
          "Problem definition",
        ],
      },
      {
        title: "Interface Design",
        lessons: [
          "Visual hierarchy",
          "Typography",
          "Color",
          "Layout",
        ],
      },
      {
        title: "Prototyping",
        lessons: [
          "Wireframes",
          "Interactive prototypes",
          "Usability testing",
          "Design handoff",
        ],
      },
    ],
  },

  {
    id: 8,
    title: "Digital Business & Product Strategy",
    category: "Business",
    level: "Intermediate",
    instructor: "Najaf Academy Business School",
    rating: 4.6,
    students: "24K",
    duration: "2 months",
    lessons: 52,
    price: 31,
    oldPrice: 48,
    featured: false,
    badge: "Business Essentials",
    description:
      "Understand product strategy, digital business models, customer discovery, metrics and growth planning.",
    skills: [
      "Product strategy",
      "Business models",
      "Customer discovery",
      "Analytics",
      "Growth",
      "Product management",
    ],
    modules: [
      {
        title: "Digital Business",
        lessons: [
          "Digital business models",
          "Market analysis",
          "Customer segments",
          "Value propositions",
        ],
      },
      {
        title: "Product Strategy",
        lessons: [
          "Product vision",
          "Roadmaps",
          "Prioritization",
          "Product metrics",
        ],
      },
      {
        title: "Growth",
        lessons: [
          "Acquisition",
          "Activation",
          "Retention",
          "Growth experiments",
        ],
      },
    ],
  },
];

/* =========================================================
   ICON COMPONENT
========================================================= */

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),

    chevron: (
      <>
        <path d="m6 9 6 6 6-6" />
      </>
    ),

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),

    play: (
      <>
        <path d="m8 5 11 7-11 7V5Z" />
      </>
    ),

    pause: (
      <>
        <path d="M8 5v14" />
        <path d="M16 5v14" />
      </>
    ),

    heart: (
      <>
        <path d="M20.8 8.9c0 5.4-8.8 10.1-8.8 10.1S3.2 14.3 3.2 8.9A4.7 4.7 0 0 1 8 4.2c1.5 0 2.9.7 4 1.9a5.2 5.2 0 0 1 4-1.9 4.7 4.7 0 0 1 4.8 4.7Z" />
      </>
    ),

    heartFilled: (
      <path
        d="M20.8 8.9c0 5.4-8.8 10.1-8.8 10.1S3.2 14.3 3.2 8.9A4.7 4.7 0 0 1 8 4.2c1.5 0 2.9.7 4 1.9a5.2 5.2 0 0 1 4-1.9 4.7 4.7 0 0 1 4.8 4.7Z"
        fill="currentColor"
      />
    ),

    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),

    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m9.5 12.5-1 8 3.5-2 3.5 2-1-8" />
      </>
    ),

    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),

    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),

    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),

    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 5.5v15" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    certificate: (
      <>
        <rect x="4" y="3" width="16" height="14" rx="2" />
        <path d="M8 7h8M8 11h5" />
        <path d="m9 17-1 4 4-2 4 2-1-4" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),

    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),

    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),

    moon: (
      <>
        <path d="M20.5 14.8A8.5 8.5 0 0 1 9.2 3.5 8.5 8.5 0 1 0 20.5 14.8Z" />
      </>
    ),

    map: (
      <>
        <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),

    playCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 5 4-5 4V8Z" />
      </>
    ),

    checkCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),

    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="M10 14 19 5" />
        <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
      </>
    ),

    creditCard: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </>
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),

    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.5v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4h2.5v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.5h-.2a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    ),

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
      </>
    ),

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),

    chevronRight: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.star}</svg>;
}

/* =========================================================
   UTILITY HELPERS
========================================================= */

function formatPrice(amount, currency = "USD") {
  const selected =
    CURRENCIES.find((item) => item.code === currency) ||
    CURRENCIES[0];

  const converted = amount * selected.rate;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: selected.code,
    maximumFractionDigits: selected.code === "INR" ? 0 : 2,
  }).format(converted);
}

function getCurrencySymbol(currency = "USD") {
  const selected = CURRENCIES.find(
    (item) => item.code === currency
  );

  return selected?.symbol || "$";
}

function generateId(prefix = "NAJAF") {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}

function getCourseById(id) {
  return COURSES.find((course) => course.id === Number(id));
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({
  courses,
  wishlist,
  onWishlist,
  onOpen,
  onExplore,
  onPreview,
  currency,
}) {
  const featuredCourses = courses
    .filter((course) => course.featured)
    .slice(0, 3);

  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              PROFESSIONAL LEARNING PLATFORM
            </span>

            <h1>
              Learn skills.
              <br />
              Build your future.
            </h1>

            <p>
              Master career-ready skills through practical,
              structured learning designed for the modern
              professional.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                type="button"
                onClick={onExplore}
              >
                Explore courses
                <Icon name="arrow" size={17} />
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={() => onOpen(1)}
              >
                View cybersecurity
              </button>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack">
                <span>S</span>
                <span>A</span>
                <span>R</span>
                <span>M</span>
              </div>

              <div>
                <strong>500K+ learners</strong>
                <span>
                  Building skills with Najaf Academy
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-main-card">
              <div className="hero-card-top">
                <span className="hero-card-label">
                  LEARNING PATH
                </span>

                <span className="hero-card-status">
                  <span></span>
                  ACTIVE
                </span>
              </div>

              <div className="hero-course-preview">
                <div className="hero-course-icon">
                  N
                </div>

                <div>
                  <span>Cybersecurity</span>
                  <strong>
                    Build a Security Career
                  </strong>
                </div>
              </div>

              <div className="hero-progress">
                <div className="hero-progress-label">
                  <span>Course progress</span>
                  <strong>68%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-value"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>

              <div className="hero-next">
                <div>
                  <span>NEXT LESSON</span>
                  <strong>
                    Network Security Fundamentals
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => onOpen(1)}
                >
                  <Icon name="play" size={15} />
                </button>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <Icon name="award" size={19} />
              <div>
                <strong>Career ready</strong>
                <span>Professional certificates</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <Icon name="checkCircle" size={19} />
              <div>
                <strong>Practical skills</strong>
                <span>Project-based learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <strong>500K+</strong>
            <span>Learners</span>
          </div>

          <div className="stat-item">
            <strong>4.8/5</strong>
            <span>Average rating</span>
          </div>

          <div className="stat-item">
            <strong>25+</strong>
            <span>Career programs</span>
          </div>

          <div className="stat-item">
            <strong>100%</strong>
            <span>Online learning</span>
          </div>
        </div>
      </section>


      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              FEATURED PROGRAMS
            </span>

            <h2>
              Skills that move
              <br />
              careers forward.
            </h2>
          </div>

          <button
            className="text-button"
            type="button"
            onClick={onExplore}
          >
            View all courses
            <Icon name="arrow" size={16} />
          </button>
        </div>

        <div className="course-grid">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              wishlist={wishlist}
              onWishlist={onWishlist}
              onOpen={onOpen}
              currency={currency}
              onPreview={onPreview}
            />
          ))}
        </div>
      </section>


      <section className="career-banner">
        <div className="container career-banner-inner">
          <div>
            <span className="eyebrow light">
              BUILD YOUR CAREER
            </span>

            <h2>
              Learn today.
              <br />
              Become tomorrow's professional.
            </h2>

            <p>
              Structured programs, practical projects and
              professional credentials in one learning
              platform.
            </p>

            <button
              className="light-button"
              type="button"
              onClick={onExplore}
            >
              Start learning
              <Icon name="arrow" size={17} />
            </button>
          </div>

          <div className="career-banner-art">
            <div className="career-orbit career-orbit-one"></div>
            <div className="career-orbit career-orbit-two"></div>

            <div className="career-center">
              <span>N</span>
              <strong>NAJAF</strong>
              <small>ACADEMY</small>
            </div>
          </div>
        </div>
      </section>


      <section className="container section">
        <div className="section-heading centered">
          <span className="eyebrow">
            WHY NAJAF ACADEMY
          </span>

          <h2>
            Designed around
            <br />
            real learning.
          </h2>

          <p>
            Everything you need to learn consistently,
            demonstrate your skills and keep progressing.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">
              <Icon name="book" size={22} />
            </div>

            <h3>Structured courses</h3>

            <p>
              Clear modules and lessons keep your learning
              path focused from the first concept to the
              final project.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon name="playCircle" size={22} />
            </div>

            <h3>Learn by doing</h3>

            <p>
              Practice what you learn with practical tasks,
              assessments and project-oriented lessons.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon name="certificate" size={22} />
            </div>

            <h3>Professional credentials</h3>

            <p>
              Complete eligible programs and build a
              portfolio of academy certificates.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon name="users" size={22} />
            </div>

            <h3>Built for careers</h3>

            <p>
              Develop skills aligned with modern roles in
              technology, data, cloud, design and business.
            </p>
          </article>
        </div>
      </section>


      <section className="container section testimonials-section">
        <div className="section-heading centered">
          <span className="eyebrow">
            LEARNER STORIES
          </span>

          <h2>
            Learning that feels
            <br />
            worth the time.
          </h2>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="testimonial-rating">
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
            </div>

            <p>
              "The course structure made it much easier to
              stay consistent. I could see exactly what I
              needed to learn next."
            </p>

            <div className="testimonial-person">
              <span>AR</span>
              <div>
                <strong>Arman R.</strong>
                <small>Cybersecurity learner</small>
              </div>
            </div>
          </article>

          <article className="testimonial-card">
            <div className="testimonial-rating">
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
            </div>

            <p>
              "The React program gave me a much clearer
              understanding of how to structure real
              applications."
            </p>

            <div className="testimonial-person">
              <span>SA</span>
              <div>
                <strong>Sarah A.</strong>
                <small>Frontend developer</small>
              </div>
            </div>
          </article>

          <article className="testimonial-card">
            <div className="testimonial-rating">
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
              <Icon name="star" size={15} />
            </div>

            <p>
              "I liked that the platform focuses on practical
              skills instead of throwing hundreds of random
              lessons at you."
            </p>

            <div className="testimonial-person">
              <span>MK</span>
              <div>
                <strong>Mohammed K.</strong>
                <small>Cloud learner</small>
              </div>
            </div>
          </article>
        </div>
      </section>


      <section className="container section faq-section">
        <div className="section-heading centered">
          <span className="eyebrow">
            QUESTIONS
          </span>

          <h2>Frequently asked.</h2>
        </div>

        <div className="faq-list">
          <details>
            <summary>
              What is Najaf Academy?
              <Icon name="chevron" size={18} />
            </summary>

            <p>
              Najaf Academy is a professional online
              learning platform focused on practical,
              career-oriented programs.
            </p>
          </details>

          <details>
            <summary>
              Can I learn at my own pace?
              <Icon name="chevron" size={18} />
            </summary>

            <p>
              Yes. Courses are designed for flexible,
              self-paced learning.
            </p>
          </details>

          <details>
            <summary>
              Do courses include certificates?
              <Icon name="chevron" size={18} />
            </summary>

            <p>
              Eligible courses can generate professional
              academy certificates after completion.
            </p>
          </details>

          <details>
            <summary>
              Can I access my courses later?
              <Icon name="chevron" size={18} />
            </summary>

            <p>
              Your learning dashboard keeps your enrolled
              programs and progress together.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}


/* =========================================================
   EXPLORE PAGE
========================================================= */

function ExplorePage({
  courses,
  wishlist,
  onWishlist,
  onOpen,
  currency,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesQuery =
        !normalized ||
        course.title.toLowerCase().includes(normalized) ||
        course.category.toLowerCase().includes(normalized) ||
        course.instructor.toLowerCase().includes(normalized) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(normalized)
        );

      const matchesCategory =
        category === "All" ||
        course.category === category;

      const matchesLevel =
        level === "All" ||
        course.level === level;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesLevel
      );
    });
  }, [courses, query, category, level]);

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">
            COURSE CATALOG
          </span>

          <h1>Explore your next skill.</h1>

          <p>
            Browse practical programs built for modern
            careers.
          </p>
        </div>
      </section>

      <section className="container catalog-section">
        <div className="catalog-toolbar">
          <div className="catalog-search">
            <Icon name="search" size={19} />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search courses, skills or instructors..."
            />
          </div>

          <div className="catalog-filter">
            <Icon name="filter" size={17} />

            <select
              value={level}
              onChange={(event) =>
                setLevel(event.target.value)
              }
            >
              <option value="All">All levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">
                Intermediate
              </option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="catalog-result-bar">
          <span>
            <strong>{filteredCourses.length}</strong>{" "}
            courses available
          </span>

          {(query ||
            category !== "All" ||
            level !== "All") && (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredCourses.length ? (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                wishlist={wishlist}
                onWishlist={onWishlist}
                onOpen={onOpen}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={35} />

            <h2>No courses found.</h2>

            <p>
              Try another search term or remove one of the
              filters.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
              }}
            >
              Reset search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
/* =========================================================
   COURSE PLAYER
========================================================= */

function CoursePlayer({
  course,
  progress,
  setProgress,
  onClose,
}) {
  const currentProgress = progress[course.id] || 0;

  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(
        `najaf-completed-${course.id}`
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const lessons = course.lessonsData || [];

  const activeLessonData =
    lessons[activeLesson] || {
      title: "Introduction",
      duration: "10 min",
      description:
        "Start your learning journey with this introduction lesson.",
    };

  const markLessonComplete = () => {
    setCompletedLessons((current) => {
      if (current.includes(activeLesson)) {
        return current;
      }

      const updated = [...current, activeLesson];

      try {
        localStorage.setItem(
          `najaf-completed-${course.id}`,
          JSON.stringify(updated)
        );
      } catch {
        // Ignore storage errors.
      }

      return updated;
    });

    const totalLessons = lessons.length || 1;

    const nextProgress = Math.min(
      100,
      Math.round(
        ((completedLessons.length + 1) / totalLessons) * 100
      )
    );

    setProgress((current) => ({
      ...current,
      [course.id]: nextProgress,
    }));

    if (
      activeLesson < lessons.length - 1
    ) {
      setActiveLesson((current) => current + 1);
    }
  };

  return (
    <div className="course-player">

      <header className="player-header">

        <button
          className="player-back"
          onClick={onClose}
        >
          <Icon name="arrowLeft" size={18} />
          Back to learning
        </button>

        <div className="player-course-title">
          <span>{course.category}</span>
          <strong>{course.title}</strong>
        </div>

        <div className="player-progress">
          <span>{currentProgress}% complete</span>

          <div className="player-progress-track">
            <span
              style={{
                width: `${currentProgress}%`,
              }}
            />
          </div>
        </div>

      </header>

      <div className="player-layout">

        {/* SIDEBAR */}

        <aside className="lesson-sidebar">

          <div className="lesson-sidebar-header">
            <span className="eyebrow">
              COURSE CONTENT
            </span>

            <h2>
              {lessons.length} lessons
            </h2>
          </div>

          <div className="lesson-list">

            {lessons.map((lesson, index) => {

              const completed =
                completedLessons.includes(index);

              const active =
                activeLesson === index;

              return (
                <button
                  key={index}
                  className={`lesson-item ${
                    active ? "active" : ""
                  } ${
                    completed ? "completed" : ""
                  }`}
                  onClick={() =>
                    setActiveLesson(index)
                  }
                >

                  <span className="lesson-number">

                    {completed ? (
                      <Icon
                        name="check"
                        size={15}
                      />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}

                  </span>

                  <span className="lesson-info">

                    <strong>
                      {lesson.title}
                    </strong>

                    <small>
                      {lesson.duration}
                    </small>

                  </span>

                </button>
              );
            })}

          </div>

        </aside>

        {/* MAIN PLAYER */}

        <main className="player-main">

          <div className="player-video">

            <div className="player-video-placeholder">

              <div className="player-play-icon">
                <Icon
                  name="play"
                  size={28}
                />
              </div>

              <span>
                {course.title}
              </span>

              <strong>
                {activeLessonData.title}
              </strong>

              <small>
                Course video placeholder
              </small>

            </div>

          </div>

          <div className="player-content">

            <div className="player-content-heading">

              <div>

                <span className="eyebrow">
                  LESSON {activeLesson + 1}
                </span>

                <h1>
                  {activeLessonData.title}
                </h1>

              </div>

              <span className="lesson-duration">
                <Icon
                  name="clock"
                  size={16}
                />
                {activeLessonData.duration}
              </span>

            </div>

            <p className="player-description">
              {activeLessonData.description ||
                "Work through this lesson to strengthen your practical knowledge and skills."}
            </p>

            <div className="player-actions">

              <button
                className="secondary-button"
                disabled={activeLesson === 0}
                onClick={() =>
                  setActiveLesson(
                    (current) =>
                      Math.max(0, current - 1)
                  )
                }
              >
                <Icon
                  name="arrowLeft"
                  size={17}
                />
                Previous
              </button>

              <button
                className="primary-button"
                onClick={markLessonComplete}
              >

                {activeLesson ===
                lessons.length - 1
                  ? "Complete course"
                  : "Mark lesson complete"}

                <Icon
                  name="check"
                  size={17}
                />

              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}


/* =========================================================
   LEARNING DASHBOARD
========================================================= */

function LearningPage({
  enrolled,
  progress,
  onBrowse,
  onOpen,
}) {

  const enrolledCourses =
    COURSES.filter((course) =>
      enrolled.includes(course.id)
    );

  const totalProgress =
    enrolledCourses.length
      ? Math.round(
          enrolledCourses.reduce(
            (sum, course) =>
              sum +
              (progress[course.id] || 0),
            0
          ) / enrolledCourses.length
        )
      : 0;

  const completedCourses =
    enrolledCourses.filter(
      (course) =>
        (progress[course.id] || 0) >= 100
    ).length;

  return (
    <main className="page dashboard-page">

      <section className="dashboard-hero">

        <div className="container">

          <div className="dashboard-welcome">

            <div>

              <div className="eyebrow">
                YOUR LEARNING SPACE
              </div>

              <h1>
                Keep moving forward.
              </h1>

              <p>
                Your courses, progress and
                career milestones in one place.
              </p>

            </div>

            <button
              className="primary-button"
              onClick={onBrowse}
            >
              Discover courses
              <Icon
                name="arrow"
                size={18}
              />
            </button>

          </div>

          <div className="learning-stats">

            <div>

              <span className="stat-icon">
                <Icon name="book" />
              </span>

              <div>
                <strong>
                  {enrolledCourses.length}
                </strong>

                <small>
                  Courses enrolled
                </small>
              </div>

            </div>

            <div>

              <span className="stat-icon">
                <Icon name="chart" />
              </span>

              <div>
                <strong>
                  {totalProgress}%
                </strong>

                <small>
                  Overall progress
                </small>
              </div>

            </div>

            <div>

              <span className="stat-icon">
                <Icon name="award" />
              </span>

              <div>
                <strong>
                  {completedCourses}
                </strong>

                <small>
                  Courses completed
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="container learning-content">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              YOUR PROGRAMS
            </span>

            <h2>
              Continue learning
            </h2>

          </div>

        </div>


        {enrolledCourses.length === 0 ? (

          <div className="learning-empty">

            <div className="learning-empty-icon">
              <Icon
                name="book"
                size={38}
              />
            </div>

            <h2>
              Your learning library is empty.
            </h2>

            <p>
              Purchase your first course and
              it will appear here with lesson
              progress and assessments.
            </p>

            <button
              className="primary-button"
              onClick={onBrowse}
            >
              Browse courses
              <Icon
                name="arrow"
                size={17}
              />
            </button>

          </div>

        ) : (

          <div className="learning-list">

            {enrolledCourses.map((course) => {

              const value =
                progress[course.id] || 0;

              return (
                <article
                  className="learning-course-card"
                  key={course.id}
                >

                  <img
                    src={course.image}
                    alt={course.title}
                  />

                  <div className="learning-course-main">

                    <span className="course-category">
                      {course.category}
                    </span>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.instructor}
                      {" Â· "}
                      {course.duration}
                    </p>

                    <div className="progress-meta">

                      <strong>
                        {value}% complete
                      </strong>

                      <span>
                        {Math.round(
                          ((course.lessonsData?.length ||
                            0) *
                            value) /
                            100
                        )}{" "}
                        of{" "}
                        {course.lessonsData?.length ||
                          0}{" "}
                        lessons
                      </span>

                    </div>

                    <div className="progress-bar">

                      <span
                        style={{
                          width: `${value}%`,
                        }}
                      />

                    </div>

                    <div className="learning-badges">

                      {value >= 100 && (
                        <span className="complete-badge">

                          <Icon
                            name="check"
                            size={13}
                          />

                          Completed

                        </span>
                      )}

                      {value > 0 &&
                        value < 100 && (
                          <span>
                            In progress
                          </span>
                        )}

                      {value === 0 && (
                        <span>
                          Not started
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="learning-course-action">

                    <button
                      className="primary-button"
                      onClick={() =>
                        onOpen(course)
                      }
                    >
                      {value > 0
                        ? "Continue"
                        : "Start learning"}

                      <Icon
                        name="arrow"
                        size={17}
                      />
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   COURSE PREVIEW MODAL
========================================================= */

function CoursePreviewModal({
  course,
  wishlist,
  onWishlist,
  onEnroll,
  onClose,
  enrolled,
}) {

  if (!course) {
    return null;
  }

  const saved =
    wishlist.includes(course.id);

  const isEnrolled =
    enrolled.includes(course.id);

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="course-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          Ã—
        </button>

        <div className="modal-image">

          <img
            src={course.image}
            alt={course.title}
          />

          <span
            className={`course-category ${course.color}`}
          >
            {course.category}
          </span>

        </div>

        <div className="modal-body">

          <span className="eyebrow">
            {course.level}
          </span>

          <h1>
            {course.title}
          </h1>

          <p className="modal-description">
            {course.description}
          </p>

          <div className="course-rating-row">

            <strong>
              {course.rating}
            </strong>

            <span className="stars">
              â˜…â˜…â˜…â˜…â˜…
            </span>

            <span>
              {course.students} learners
            </span>

          </div>

          <div className="course-detail-grid">

            <div>

              <Icon name="user" />

              <span>
                <small>
                  Instructor
                </small>

                <strong>
                  {course.instructor}
                </strong>
              </span>

            </div>

            <div>

              <Icon name="clock" />

              <span>
                <small>
                  Duration
                </small>

                <strong>
                  {course.duration}
                </strong>
              </span>

            </div>

            <div>

              <Icon name="book" />

              <span>
                <small>
                  Lessons
                </small>

                <strong>
                  {course.lessons}
                </strong>
              </span>

            </div>

            <div>

              <Icon name="globe" />

              <span>
                <small>
                  Learning
                </small>

                <strong>
                  Online
                </strong>
              </span>

            </div>

          </div>

          <div className="modal-section">

            <h3>
              What you'll learn
            </h3>

            <div className="skills-grid">

              {course.skills.map(
                (skill) => (
                  <div key={skill}>

                    <Icon
                      name="check"
                      size={16}
                    />

                    {skill}

                  </div>
                )
              )}

            </div>

          </div>

          <div className="modal-section">

            <h3>
              Course highlights
            </h3>

            <div className="highlight-grid">

              <div>
                <Icon name="playCircle" />
                <span>
                  Video lessons
                </span>
              </div>

              <div>
                <Icon name="chart" />
                <span>
                  Practical projects
                </span>
              </div>

              <div>
                <Icon name="award" />
                <span>
                  Certificate
                </span>
              </div>

              <div>
                <Icon name="clock" />
                <span>
                  Flexible schedule
                </span>
              </div>

            </div>

          </div>

          <div className="modal-actions">

            <button
              className={`save-course ${
                saved ? "saved" : ""
              }`}
              onClick={() =>
                onWishlist(course.id)
              }
            >

              <Icon
                name="heart"
                size={18}
              />

              {saved
                ? "Saved"
                : "Save"}

            </button>

            <button
              className="primary-button enroll-button"
              onClick={() =>
                onEnroll(course)
              }
            >

              {isEnrolled
                ? "Continue learning"
                : "Enroll now"}

              <Icon
                name="arrow"
                size={18}
              />

            </button>

          </div>

          <div className="secure-checkout">

            <Icon
              name="lock"
              size={16}
            />

            <span>
              Secure enrollment Â·
              30-day satisfaction
              guarantee
            </span>

            <strong>
              ${course.price}
            </strong>

          </div>

          <button
            className="modal-share"
            onClick={() => {

              navigator.clipboard?.writeText(
                window.location.href
              );

              if (
                typeof window !==
                  "undefined" &&
                window.dispatchEvent
              ) {
                window.dispatchEvent(
                  new CustomEvent(
                    "najaf-notification",
                    {
                      detail:
                        "Course link copied.",
                    }
                  )
                );
              }

            }}
          >
            Share this program
          </button>

        </div>

      </div>

    </div>
  );
}
/* =========================================================
   COURSE DETAILS
========================================================= */

function CourseDetailsModal({
  course,
  enrolled,
  progress,
  wishlist,
  onClose,
  onBuy,
  onWishlist,
  onStart,
  currency,
}) {
  const isEnrolled = enrolled.includes(course.id);
  const value = progress[course.id] || 0;

  return (
    <div className="modal-backdrop">

      <div className="course-details-modal">

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="close" size={22} />
        </button>

        <div className="course-hero-image">

          <img
            src={course.image}
            alt={course.title}
          />

          <div className="course-hero-overlay">

            <span>
              {course.category}
            </span>

            <h1>
              {course.title}
            </h1>

            <p>
              {course.description}
            </p>

          </div>

        </div>

        <div className="course-details-layout">

          <div className="course-details-main">

            <div className="course-meta-row">

              <span>
                <Icon
                  name="star"
                  size={15}
                />
                {course.rating}
              </span>

              <span>
                {course.students} learners
              </span>

              <span>
                {course.duration}
              </span>

              <span>
                {course.lessons} lessons
              </span>

            </div>


            <h2>
              What you'll learn
            </h2>

            <div className="skills-grid">

              {course.skills.map(
                (skill) => (
                  <div key={skill}>

                    <Icon
                      name="check"
                      size={16}
                    />

                    {skill}

                  </div>
                )
              )}

            </div>


            <h2>
              Course curriculum
            </h2>

            <div className="curriculum">

              {course.lessonsData.map(
                (lesson, index) => {

                  const complete =
                    Math.round(
                      ((index + 1) /
                        course.lessonsData.length) *
                        100
                    ) <= value;

                  return (
                    <div
                      className="curriculum-row"
                      key={lesson.title}
                    >

                      <span className="curriculum-number">

                        {complete ? (
                          <Icon
                            name="check"
                            size={14}
                          />
                        ) : (
                          index + 1
                        )}

                      </span>

                      <div>

                        <strong>
                          {lesson.title}
                        </strong>

                        <span>
                          {lesson.duration}
                        </span>

                      </div>

                      {index ===
                        course.lessonsData.length -
                          1 && (
                        <span className="assessment-label">
                          Assessment
                        </span>
                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>


          <aside className="course-details-sidebar">

            <div className="purchase-card">

              <div className="purchase-price">

                <span>
                  Course access
                </span>

                <strong>
                  {formatPrice(
                    course.price,
                    currency
                  )}
                </strong>

                {course.oldPrice && (
                  <del>
                    {formatPrice(
                      course.oldPrice,
                      currency
                    )}
                  </del>
                )}

              </div>


              <button
                className="primary-button full-width"
                onClick={() =>
                  isEnrolled
                    ? onStart(course)
                    : onBuy(course)
                }
              >

                {isEnrolled
                  ? "Continue learning"
                  : "Enroll now"}

                <Icon
                  name="arrow"
                  size={18}
                />

              </button>


              <button
                className={`secondary-button full-width ${
                  wishlist.includes(course.id)
                    ? "saved"
                    : ""
                }`}
                onClick={() =>
                  onWishlist(course.id)
                }
              >

                <Icon
                  name="heart"
                  size={18}
                />

                {wishlist.includes(course.id)
                  ? "Saved to wishlist"
                  : "Add to wishlist"}

              </button>


              <div className="purchase-features">

                <div>

                  <Icon
                    name="playCircle"
                    size={17}
                  />

                  <span>
                    Lifetime course access
                  </span>

                </div>

                <div>

                  <Icon
                    name="book"
                    size={17}
                  />

                  <span>
                    Practical lessons
                  </span>

                </div>

                <div>

                  <Icon
                    name="award"
                    size={17}
                  />

                  <span>
                    Completion certificate
                  </span>

                </div>

                <div>

                  <Icon
                    name="clock"
                    size={17}
                  />

                  <span>
                    Learn at your own pace
                  </span>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LEARNING PLAYER
========================================================= */

function LearningPlayer({
  course,
  progress,
  testResults,
  onClose,
  onLessonComplete,
  onTestComplete,
}) {

  const [activeLesson, setActiveLesson] =
    useState(0);

  const [showTest, setShowTest] =
    useState(
      (progress[course.id] || 0) >= 100
    );

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const currentProgress =
    progress[course.id] || 0;

  const currentLesson =
    course.lessonsData[activeLesson];

  const testResult =
    testResults[course.id];


  const submitTest = () => {

    const questions =
      course.assessment || [];

    if (!questions.length) {

      const finalScore = 100;

      setScore(finalScore);
      setSubmitted(true);

      onTestComplete(
        course.id,
        finalScore,
        true
      );

      return;
    }


    let correct = 0;

    questions.forEach(
      (question, index) => {

        if (
          answers[index] ===
          question.answer
        ) {
          correct += 1;
        }

      }
    );


    const finalScore =
      Math.round(
        (correct / questions.length) *
          100
      );

    const passed =
      finalScore >= 70;

    setScore(finalScore);
    setSubmitted(true);

    onTestComplete(
      course.id,
      finalScore,
      passed
    );
  };


  return (
    <div className="learning-player">

      <header className="learning-player-header">

        <button
          className="player-back-button"
          onClick={onClose}
        >

          <Icon
            name="arrowLeft"
            size={18}
          />

          Back to My Learning

        </button>


        <div className="player-title">

          <span>
            {course.category}
          </span>

          <strong>
            {course.title}
          </strong>

        </div>


        <div className="player-header-progress">

          <span>
            {currentProgress}% complete
          </span>

          <div className="progress-track">

            <span
              style={{
                width:
                  `${currentProgress}%`,
              }}
            />

          </div>

        </div>

      </header>


      <div className="learning-player-layout">

        <aside className="learning-sidebar">

          <div className="learning-sidebar-heading">

            <span className="eyebrow">
              COURSE CONTENT
            </span>

            <strong>
              {course.lessonsData.length} lessons
            </strong>

          </div>


          <div className="learning-lessons">

            {course.lessonsData.map(
              (lesson, index) => {

                const lessonProgress =
                  Math.round(
                    ((index + 1) /
                      course.lessonsData.length) *
                      100
                  );

                const complete =
                  currentProgress >=
                  lessonProgress;

                return (
                  <button
                    key={lesson.title}
                    className={`learning-lesson ${
                      activeLesson === index &&
                      !showTest
                        ? "active"
                        : ""
                    } ${
                      complete
                        ? "completed"
                        : ""
                    }`}
                    onClick={() => {

                      setShowTest(false);
                      setActiveLesson(index);

                    }}
                  >

                    <span className="learning-lesson-number">

                      {complete ? (
                        <Icon
                          name="check"
                          size={14}
                        />
                      ) : (
                        index + 1
                      )}

                    </span>

                    <span>

                      <strong>
                        {lesson.title}
                      </strong>

                      <small>
                        {lesson.duration}
                      </small>

                    </span>

                  </button>
                );

              }
            )}


            <button
              className={`learning-test-button ${
                showTest
                  ? "active"
                  : ""
              } ${
                currentProgress >= 100
                  ? "unlocked"
                  : "locked"
              }`}
              disabled={
                currentProgress < 100
              }
              onClick={() =>
                setShowTest(true)
              }
            >

              <span>

                <Icon
                  name={
                    currentProgress >= 100
                      ? "trophy"
                      : "lock"
                  }
                  size={17}
                />

              </span>

              <span>

                <strong>
                  Final assessment
                </strong>

                <small>
                  {currentProgress >= 100
                    ? "Ready to take"
                    : "Complete all lessons"}
                </small>

              </span>

            </button>

          </div>

        </aside>


        <main className="learning-player-main">

          {!showTest ? (

            <div className="lesson-view">

              <div className="lesson-video">

                <div className="lesson-video-placeholder">

                  <div className="video-play-button">

                    <Icon
                      name="play"
                      size={25}
                    />

                  </div>

                  <span>
                    {course.title}
                  </span>

                  <strong>
                    {currentLesson.title}
                  </strong>

                  <small>
                    Course lesson video
                  </small>

                </div>

              </div>


              <div className="lesson-content">

                <div className="lesson-heading">

                  <div>

                    <span className="eyebrow">
                      LESSON {activeLesson + 1}
                    </span>

                    <h1>
                      {currentLesson.title}
                    </h1>

                  </div>

                  <span className="lesson-time">

                    <Icon
                      name="clock"
                      size={16}
                    />

                    {currentLesson.duration}

                  </span>

                </div>


                <p className="lesson-description">

                  {currentLesson.description ||
                    "Build practical knowledge through this structured lesson."}

                </p>


                <div className="lesson-learning-points">

                  <div>

                    <Icon
                      name="check"
                      size={17}
                    />

                    <span>
                      Practical course content
                    </span>

                  </div>

                  <div>

                    <Icon
                      name="check"
                      size={17}
                    />

                    <span>
                      Career-focused learning outcome
                    </span>

                  </div>

                  <div>

                    <Icon
                      name="check"
                      size={17}
                    />

                    <span>
                      Progress saved automatically
                    </span>

                  </div>

                </div>


                <div className="lesson-navigation">

                  <button
                    className="secondary-button"
                    disabled={
                      activeLesson === 0
                    }
                    onClick={() =>
                      setActiveLesson(
                        (current) =>
                          Math.max(
                            0,
                            current - 1
                          )
                      )
                    }
                  >

                    <Icon
                      name="arrowLeft"
                      size={17}
                    />

                    Previous

                  </button>


                  <button
                    className="primary-button"
                    onClick={() => {

                      onLessonComplete(
                        course.id,
                        activeLesson
                      );

                      if (
                        activeLesson <
                        course.lessonsData.length -
                          1
                      ) {

                        setActiveLesson(
                          (current) =>
                            current + 1
                        );

                      } else {

                        setShowTest(true);

                      }

                    }}
                  >

                    {activeLesson ===
                    course.lessonsData.length -
                      1
                      ? "Complete course"
                      : "Complete lesson"}

                    <Icon
                      name="check"
                      size={17}
                    />

                  </button>

                </div>

              </div>

            </div>

          ) : (

            <div className="test-view">

              <div className="test-intro">

                <div className="test-icon">

                  <Icon
                    name="trophy"
                    size={30}
                  />

                </div>

                <div>

                  <span className="eyebrow">
                    FINAL TEST
                  </span>

                  <h1>
                    Demonstrate what you learned.
                  </h1>

                  <p>
                    Answer all questions and
                    achieve at least 70% to
                    earn your certificate.
                  </p>

                </div>

              </div>


              {course.assessment?.length ? (

                <div className="assessment-list">

                  {course.assessment.map(
                    (question, index) => (

                      <div
                        className="assessment-question"
                        key={index}
                      >

                        <span className="question-number">
                          {index + 1}
                        </span>

                        <div>

                          <h3>
                            {question.question}
                          </h3>

                          <div className="assessment-options">

                            {question.options.map(
                              (option) => (

                                <label
                                  key={option}
                                  className={
                                    answers[index] ===
                                    option
                                      ? "selected"
                                      : ""
                                  }
                                >

                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    checked={
                                      answers[index] ===
                                      option
                                    }
                                    onChange={() =>
                                      setAnswers(
                                        (current) => ({
                                          ...current,
                                          [index]:
                                            option,
                                        })
                                      )
                                    }
                                  />

                                  <span>
                                    {option}
                                  </span>

                                </label>

                              )
                            )}

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="assessment-empty">

                  <Icon
                    name="award"
                    size={30}
                  />

                  <h3>
                    Final assessment ready
                  </h3>

                  <p>
                    Submit the assessment to
                    complete this course.
                  </p>

                </div>

              )}


              {!submitted ? (

                <div className="test-actions">

                  <button
                    className="secondary-button"
                    onClick={() =>
                      setShowTest(false)
                    }
                  >
                    Back to lessons
                  </button>

                  <button
                    className="primary-button"
                    onClick={submitTest}
                  >
                    Submit assessment
                    <Icon
                      name="arrow"
                      size={17}
                    />
                  </button>

                </div>

              ) : (

                <div
                  className={`test-result ${
                    score >= 70
                      ? "passed"
                      : "failed"
                  }`}
                >

                  <div className="result-icon">

                    <Icon
                      name={
                        score >= 70
                          ? "award"
                          : "refresh"
                      }
                      size={28}
                    />

                  </div>

                  <span className="eyebrow">
                    ASSESSMENT RESULT
                  </span>

                  <h2>
                    {score >= 70
                      ? "Assessment passed!"
                      : "Keep learning and try again."}
                  </h2>

                  <strong>
                    {score}%
                  </strong>

                  <p>
                    {score >= 70
                      ? "Congratulations. Your completion certificate is now available."
                      : "You need 70% or higher to pass the final assessment."}
                  </p>


                  <div className="test-result-actions">

                    {score < 70 && (

                      <button
                        className="secondary-button"
                        onClick={() => {

                          setSubmitted(false);
                          setScore(0);
                          setAnswers({});

                        }}
                      >
                        Try again
                      </button>

                    )}


                    {score >= 70 && (

                      <button
                        className="primary-button"
                        onClick={onClose}
                      >

                        View certificate

                        <Icon
                          name="award"
                          size={17}
                        />

                      </button>

                    )}

                  </div>

                </div>

              )}


              {testResult?.passed &&
                !submitted && (

                  <div className="already-passed">

                    <Icon
                      name="award"
                      size={19}
                    />

                    <span>
                      You previously passed this
                      assessment with{" "}
                      {testResult.score}%.
                    </span>

                  </div>

                )}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}
/* =========================================================
   COURSES PAGE
========================================================= */

function CoursesPage({
  courses,
  search,
  setSearch,
  wishlist,
  onWishlist,
  onOpen,
  currency,
}) {

  const [category, setCategory] =
    useState("All");

  const [level, setLevel] =
    useState("All");

  const filtered = useMemo(() => {

    return courses.filter((course) => {

      const categoryMatch =
        category === "All" ||
        course.category === category;

      const levelMatch =
        level === "All" ||
        course.level === level;

      return categoryMatch && levelMatch;

    });

  }, [
    courses,
    category,
    level,
  ]);


  return (
    <main className="page courses-page">

      <section className="courses-hero">

        <div className="container">

          <span className="eyebrow">
            EXPLORE NAJAF ACADEMY
          </span>

          <h1>
            Learn skills that
            move your career forward.
          </h1>

          <p>
            Explore practical programs in
            cybersecurity, AI, development,
            cloud and more.
          </p>


          <div className="course-search">

            <Icon
              name="search"
              size={20}
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search courses, skills or instructors..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
              >
                Ã—
              </button>
            )}

          </div>

        </div>

      </section>


      <section className="container courses-content">

        <div className="course-filters">

          <div className="filter-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
            >

              {CATEGORIES.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>


          <div className="filter-group">

            <label>
              Level
            </label>

            <select
              value={level}
              onChange={(event) =>
                setLevel(
                  event.target.value
                )
              }
            >

              <option value="All">
                All levels
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

            </select>

          </div>


          <div className="course-results-count">

            <strong>
              {filtered.length}
            </strong>

            <span>
              courses available
            </span>

          </div>

        </div>


        {filtered.length > 0 ? (

          <div className="course-grid">

            {filtered.map(
              (course) => (

                <CourseCard
                  key={course.id}
                  course={course}
                  wishlist={wishlist}
                  onWishlist={onWishlist}
                  onOpen={onOpen}
                  currency={currency}
                />

              )
            )}

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-state-icon">

              <Icon
                name="search"
                size={30}
              />

            </div>

            <h2>
              No courses found.
            </h2>

            <p>
              Try another search term or
              change your filters.
            </p>

            <button
              className="secondary-button"
              onClick={() => {

                setSearch("");
                setCategory("All");
                setLevel("All");

              }}
            >
              Clear filters
            </button>

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   WISHLIST PAGE
========================================================= */

function WishlistPage({
  courses,
  wishlist,
  onWishlist,
  onOpen,
  currency,
}) {

  const savedCourses =
    courses.filter(
      (course) =>
        wishlist.includes(course.id)
    );


  return (
    <main className="page wishlist-page">

      <section className="page-heading">

        <div className="container">

          <span className="eyebrow">
            YOUR COLLECTION
          </span>

          <h1>
            Wishlist
          </h1>

          <p>
            Keep the courses you want to
            explore later in one place.
          </p>

        </div>

      </section>


      <section className="container section">

        {savedCourses.length > 0 ? (

          <div className="course-grid">

            {savedCourses.map(
              (course) => (

                <CourseCard
                  key={course.id}
                  course={course}
                  wishlist={wishlist}
                  onWishlist={onWishlist}
                  onOpen={onOpen}
                  currency={currency}
                />

              )
            )}

          </div>

        ) : (

          <div className="empty-state wishlist-empty">

            <div className="empty-state-icon">

              <Icon
                name="heart"
                size={30}
              />

            </div>

            <h2>
              Your wishlist is empty.
            </h2>

            <p>
              Save interesting courses and
              come back when you're ready
              to learn.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                window.history.pushState(
                  {},
                  "",
                  "/courses"
                )
              }
            >
              Explore courses
              <Icon
                name="arrow"
                size={17}
              />
            </button>

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   CERTIFICATES PAGE
========================================================= */

function CertificatesPage({
  certificates,
  completedCourses,
  onOpenCertificate,
}) {

  return (
    <main className="page certificates-page">

      <section className="page-heading">

        <div className="container">

          <span className="eyebrow">
            PROFESSIONAL CREDENTIALS
          </span>

          <h1>
            Your certificates.
          </h1>

          <p>
            Access your learning credentials
            and course purchase records.
          </p>

        </div>

      </section>


      <section className="container section">

        <div className="certificate-summary">

          <div>

            <span className="certificate-summary-icon">

              <Icon
                name="award"
                size={22}
              />

            </span>

            <div>

              <strong>
                {certificates.length}
              </strong>

              <span>
                Credentials
              </span>

            </div>

          </div>


          <div>

            <span className="certificate-summary-icon">

              <Icon
                name="check"
                size={22}
              />

            </span>

            <div>

              <strong>
                {completedCourses.length}
              </strong>

              <span>
                Courses completed
              </span>

            </div>

          </div>

        </div>


        {certificates.length > 0 ? (

          <div className="certificates-grid">

            {certificates.map(
              (certificate) => {

                const completion =
                  certificate.type ===
                  "completion";

                return (
                  <article
                    className={`certificate-card ${
                      completion
                        ? "completion-certificate"
                        : "purchase-certificate"
                    }`}
                    key={certificate.id}
                  >

                    <div className="certificate-card-top">

                      <div className="certificate-logo">

                        <span>
                          NAJAF
                        </span>

                        <small>
                          ACADEMY
                        </small>

                      </div>

                      <Icon
                        name="award"
                        size={27}
                      />

                    </div>


                    <div className="certificate-card-body">

                      <span className="eyebrow">
                        {completion
                          ? "CERTIFICATE OF COMPLETION"
                          : "COURSE CREDENTIAL"}
                      </span>

                      <h2>
                        {certificate.courseTitle}
                      </h2>

                      <p>
                        {completion
                          ? "Successfully completed the course and passed the final assessment."
                          : "Verified record of course enrollment and purchase."}
                      </p>


                      <div className="certificate-recipient">

                        <small>
                          Issued to
                        </small>

                        <strong>
                          {certificate.userName ||
                            "Najaf Learner"}
                        </strong>

                        {certificate.userEmail && (
                          <span>
                            {certificate.userEmail}
                          </span>
                        )}

                      </div>


                      <div className="certificate-date">

                        <span>
                          Issued
                        </span>

                        <strong>
                          {new Date(
                            certificate.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </strong>

                      </div>

                    </div>


                    <div className="certificate-card-footer">

                      <span>
                        ID:{" "}
                        {certificate.id}
                      </span>

                      <button
                        className="secondary-button"
                        onClick={() =>
                          onOpenCertificate(
                            certificate
                          )
                        }
                      >
                        View certificate
                        <Icon
                          name="arrow"
                          size={16}
                        />
                      </button>

                    </div>

                  </article>
                );

              }
            )}

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-state-icon">

              <Icon
                name="award"
                size={30}
              />

            </div>

            <h2>
              No certificates yet.
            </h2>

            <p>
              Complete a course and pass its
              final assessment to earn your
              first professional certificate.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   CERTIFICATE VERIFICATION CARD
========================================================= */

function CertificateVerification({
  certificate,
}) {

  if (!certificate) {
    return null;
  }

  return (
    <div className="certificate-verification">

      <div className="verification-header">

        <Icon
          name="shield"
          size={22}
        />

        <div>

          <strong>
            Credential verified
          </strong>

          <span>
            NAJAF ACADEMY
          </span>

        </div>

      </div>


      <div className="verification-body">

        <span>
          Credential ID
        </span>

        <strong>
          {certificate.id}
        </strong>

        <span>
          Learner
        </span>

        <strong>
          {certificate.userName}
        </strong>

        <span>
          Program
        </span>

        <strong>
          {certificate.courseTitle}
        </strong>

      </div>

    </div>
  );
}
/* =========================================================
   BENGALURU PAGE
========================================================= */

function BengaluruPage() {
  return (
    <main className="page">

      <section className="map-hero">

        <div className="container">

          <span className="eyebrow light">
            ACADEMY LOCATION
          </span>

          <h1>
            Najaf Academy Â· Bengaluru
          </h1>

          <p>
            Our location is focused on Bengaluru,
            Karnataka, India.
          </p>

        </div>

      </section>


      <section className="container map-section">

        <div className="map-info-card">

          <span className="map-icon">
            <Icon
              name="map"
              size={27}
            />
          </span>

          <span className="eyebrow">
            BENGALURU, KARNATAKA
          </span>

          <h2>
            Learn from Bengaluru.
          </h2>

          <p>
            Najaf Academy's location section is
            intentionally limited to Bengaluru
            as requested.
          </p>

          <a
            className="primary-button map-link"
            href="https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20Karnataka%2C%20India"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps

            <Icon
              name="arrow"
              size={17}
            />
          </a>

        </div>


        <div className="map-frame">

          <iframe
            title="Bengaluru Google Map"
            src="https://www.google.com/maps?q=Bengaluru%2C%20Karnataka%2C%20India&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   AUTH MODAL
========================================================= */

function AuthModal({
  mode,
  setMode,
  form,
  setForm,
  onClose,
  onSubmit,
  onGoogle,
}) {

  const signup =
    mode === "signup";


  return (
    <div className="modal-backdrop">

      <div className="auth-modal">

        <button
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          <Icon
            name="close"
            size={21}
          />
        </button>


        <div className="auth-brand">

          <span className="brand-mark">
            N
          </span>

          <div>

            <strong>
              NAJAF ACADEMY
            </strong>

            <span>
              Professional learning
            </span>

          </div>

        </div>


        <span className="eyebrow">

          {signup
            ? "CREATE ACCOUNT"
            : "WELCOME BACK"}

        </span>


        <h1>

          {signup
            ? "Start your learning journey."
            : "Sign in to continue."}

        </h1>


        <p className="auth-description">

          Access your courses, progress and
          professional certificates.

        </p>


        <button
          className="google-button"
          type="button"
          onClick={onGoogle}
        >

          <strong>
            G
          </strong>

          Continue with Google

        </button>


        <div className="auth-divider">

          <span>
            or continue with email
          </span>

        </div>


        <form onSubmit={onSubmit}>

          {signup && (

            <label>

              Full name

              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Your name"
                required
              />

            </label>

          )}


          <label>

            Email address

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="you@example.com"
              required
            />

          </label>


          <label>

            Password

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />

          </label>


          <button
            className="primary-button full"
            type="submit"
          >

            {signup
              ? "Create account"
              : "Sign in"}

            <Icon
              name="arrow"
              size={17}
            />

          </button>

        </form>


        <div className="auth-switch">

          {signup
            ? "Already have an account?"
            : "New to Najaf Academy?"}

          <button
            type="button"
            onClick={() =>
              setMode(
                signup
                  ? "signin"
                  : "signup"
              )
            }
          >

            {signup
              ? "Sign in"
              : "Create account"}

          </button>

        </div>


        <small className="auth-note">
        </small>

      </div>

    </div>
  );
}


/* =========================================================
   CHECKOUT MODAL
========================================================= */

function CheckoutModal({
  course,
  currency,
  onClose,
  onComplete,
}) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");


  const submit = (event) => {

    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim()
    ) {
      return;
    }

    onComplete();

  };


  return (
    <div className="modal-backdrop">

      <div className="checkout-modal">

        <button
          className="modal-close"
          onClick={onClose}
          type="button"
        >

          <Icon
            name="close"
            size={21}
          />

        </button>


        <div className="checkout-header">

          <span className="eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>
            Complete your enrollment.
          </h1>

          <p>
            This demo checkout creates a
            course purchase record and
            unlocks the learning experience.
          </p>

        </div>


        <div className="checkout-course">

          <img
            src={course.image}
            alt={course.title}
          />


          <div>

            <span>
              {course.category}
            </span>

            <strong>
              {course.title}
            </strong>

            <small>
              Lifetime access Â·{" "}
              {course.lessons} lessons
            </small>

          </div>


          <strong className="checkout-price">

            {formatPrice(
              course.price,
              currency
            )}

          </strong>

        </div>


        <form onSubmit={submit}>

          <label>

            Full name

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Your full name"
              required
            />

          </label>


          <label>

            Email address

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              required
            />

          </label>


          <div className="demo-payment">

            <div>

              <Icon
                name="check"
                size={17}
              />

              <div>

                <strong>
                  Demo payment mode
                </strong>

                <span>
                  No real card information
                  is requested or stored.
                </span>

              </div>

            </div>

          </div>


          <button
            className="primary-button full"
            type="submit"
          >

            Confirm purchase

            <Icon
              name="arrow"
              size={17}
            />

          </button>

        </form>

      </div>

    </div>
  );
}
/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({
  courses,
  wishlist,
  onWishlist,
  onOpen,
  onExplore,
  currency,
}) {
  return (
    <main>

      {/* HERO */}

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="container hero-inner">

          <div className="hero-copy">

            <span className="eyebrow">
              PROFESSIONAL ONLINE LEARNING
            </span>

            <h1>
              Learn skills that
              <br />
              move your career.
            </h1>

            <p>
              Practical courses, structured learning,
              assessments and professional credentials.
            </p>


            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={onExplore}
              >
                Explore courses

                <Icon
                  name="arrow"
                  size={18}
                />
              </button>


              <button
                className="hero-secondary"
                onClick={() =>
                  onOpen(courses[0])
                }
              >
                View featured program
              </button>

            </div>


            <div className="hero-trust">

              <span>
                âœ“ Practical projects
              </span>

              <span>
                âœ“ Assessments
              </span>

              <span>
                âœ“ Completion credentials
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="stats-strip">

        <div className="container stats-grid">

          <div>
            <strong>
              42K+
            </strong>

            <span>
              Learners enrolled
            </span>
          </div>


          <div>
            <strong>
              4.8/5
            </strong>

            <span>
              Average course rating
            </span>
          </div>


          <div>
            <strong>
              96%
            </strong>

            <span>
              Assessment pass rate
            </span>
          </div>


          <div>
            <strong>
              18
            </strong>

            <span>
              Professional programs
            </span>
          </div>

        </div>

      </section>


      {/* POPULAR PROGRAMS */}

      <section className="container section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              POPULAR PROGRAMS
            </span>

            <h2>
              Build skills companies need.
            </h2>

          </div>


          <button
            className="text-button"
            onClick={onExplore}
          >
            View all courses

            <Icon
              name="arrow"
              size={17}
            />
          </button>

        </div>


        <div className="course-grid">

          {courses.map((course) => (

            <CourseCard
              key={course.id}
              course={course}
              wishlist={wishlist}
              onWishlist={onWishlist}
              onOpen={onOpen}
              currency={currency}
            />

          ))}

        </div>

      </section>


      {/* LEARNING PROCESS */}

      <section className="learning-process">

        <div className="container">

          <div className="section-heading light-heading">

            <div>

              <span className="eyebrow light">
                HOW IT WORKS
              </span>

              <h2>
                Learn with a clear path.
              </h2>

            </div>

          </div>


          <div className="process-grid">

            <div className="process-card">

              <span>
                01
              </span>

              <div className="process-icon">
                <Icon
                  name="book"
                  size={24}
                />
              </div>

              <h3>
                Learn
              </h3>

              <p>
                Follow structured lessons designed
                around practical skills and projects.
              </p>

            </div>


            <div className="process-card">

              <span>
                02
              </span>

              <div className="process-icon">
                <Icon
                  name="trophy"
                  size={24}
                />
              </div>

              <h3>
                Test
              </h3>

              <p>
                Complete your lessons and demonstrate
                what you have learned through assessment.
              </p>

            </div>


            <div className="process-card">

              <span>
                03
              </span>

              <div className="process-icon">
                <Icon
                  name="award"
                  size={24}
                />
              </div>

              <h3>
                Certify
              </h3>

              <p>
                Pass the final assessment and receive
                your professional completion credential.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* TESTIMONIALS */}

      <section className="container section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              LEARNER STORIES
            </span>

            <h2>
              Built for people who want progress.
            </h2>

          </div>

        </div>


        <div className="testimonial-grid">

          {[
            {
              name: "Aarav Sharma",
              role: "Cybersecurity learner",
              quote:
                "The structured lessons and assessments made it much easier to understand what I actually knew.",
            },

            {
              name: "Sara Khan",
              role: "Web development learner",
              quote:
                "I liked being able to learn at my own pace and keep my progress saved automatically.",
            },

            {
              name: "Rahul Mehta",
              role: "AI learner",
              quote:
                "The final assessment gave the courses a real sense of completion instead of just watching videos.",
            },

          ].map((item) => (

            <article
              className="testimonial-card"
              key={item.name}
            >

              <div className="testimonial-rating">
                â˜…â˜…â˜…â˜…â˜…
              </div>

              <p>
                "{item.quote}"
              </p>


              <div className="testimonial-person">

                <div className="testimonial-avatar">
                  {item.name.charAt(0)}
                </div>

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.role}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* FAQ */}

      <section className="container section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              GOOD TO KNOW
            </span>

            <h2>
              Frequently asked questions.
            </h2>

          </div>

        </div>


        <div className="faq-list">

          {[
            {
              q:
                "Do I get a certificate after finishing a course?",

              a:
                "Yes. Once you complete every lesson and pass the final assessment, a completion certificate is generated automatically and stored in your Certificates page.",
            },

            {
              q:
                "Can I learn at my own pace?",

              a:
                "All courses are fully self-paced. Your progress is saved automatically so you can pick up exactly where you left off, on any device.",
            },

            {
              q:
                "What happens if I fail the final assessment?",

              a:
                "You can retake the assessment as many times as you need. There is no limit and no extra cost.",
            },

            {
              q:
                "Is there a refund policy?",

              a:
                "Reach out through your account and our team will review purchases made within the last 14 days.",
            },

          ].map((item) => (

            <details
              className="faq-item"
              key={item.q}
            >

              <summary>

                {item.q}

                <span className="faq-plus">
                  +
                </span>

              </summary>

              <p>
                {item.a}
              </p>

            </details>

          ))}

        </div>

      </section>


      {/* CAREER BANNER */}

      <section className="career-banner">

        <div className="container career-banner-inner">

          <div>

            <span className="eyebrow">
              LEARN â†’ TEST â†’ CERTIFY
            </span>

            <h2>
              Don't just watch lessons.
              <br />
              Prove what you know.
            </h2>

          </div>


          <div className="career-steps">

            <div>

              <strong>
                01
              </strong>

              <span>
                Learn
              </span>

            </div>


            <div>

              <strong>
                02
              </strong>

              <span>
                Test
              </span>

            </div>


            <div>

              <strong>
                03
              </strong>

              <span>
                Certificate
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function Footer({
  navigate,
  openAuth,
  newsletterEmail,
  setNewsletterEmail,
  notify,
}) {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div>

          <div className="footer-brand">

            <span className="brand-mark">
              N
            </span>

            <div>

              <strong>
                NAJAF ACADEMY
              </strong>

              <span>
                Professional learning platform
              </span>

            </div>

          </div>


          <p>
            Build practical skills, complete
            assessments and turn learning into
            professional credentials.
          </p>


          <form
            className="footer-newsletter"
            onSubmit={(event) => {

              event.preventDefault();

              if (!newsletterEmail.trim()) {
                return;
              }

              notify(
                "Thanks â€” you're on the list."
              );

              setNewsletterEmail("");

            }}
          >

            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(event) =>
                setNewsletterEmail(
                  event.target.value
                )
              }
              placeholder="Your email"
              aria-label="Newsletter email"
            />


            <button type="submit">
              Subscribe
            </button>

          </form>

        </div>


        <div>

          <h4>
            Learning
          </h4>

          <button
            onClick={() =>
              navigate("courses")
            }
          >
            Explore courses
          </button>


          <button
            onClick={() =>
              navigate("learning")
            }
          >
            My Learning
          </button>


          <button
            onClick={() =>
              navigate("certificates")
            }
          >
            Certificates
          </button>

        </div>


        <div>

          <h4>
            Academy
          </h4>

          <button
            onClick={() =>
              navigate("wishlist")
            }
          >
            Wishlist
          </button>


          <button
            onClick={() =>
              navigate("map")
            }
          >
            Bengaluru location
          </button>


          <button
            onClick={() =>
              openAuth("signin")
            }
          >
            Account
          </button>

        </div>

      </div>


      <div className="container footer-bottom">

        Â© {new Date().getFullYear()}{" "}
        NAJAF ACADEMY. All rights reserved.

      </div>

    </footer>
  );
}
/* =========================================================
   APP
========================================================= */



/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({
  course,
  wishlist,
  onWishlist,
  onOpen,
  currency = "USD",
  onPreview,
}

export default function App() {

  /* =======================================================
     CORE STATE
  ======================================================= */

  const [page, setPage] = useState(
    window.location.pathname.replace("/", "") || "home"
  );

  const [theme, setTheme] = useState(
    readStorage("najafTheme", "light")
  );

  const [currency, setCurrency] = useState(
    readStorage("najafCurrency", "USD")
  );

  const [user, setUser] = useState(
    readStorage("najafUser", null)
  );

  const [enrolled, setEnrolled] = useState(
    readStorage("najafEnrolled", [])
  );

  const [progress, setProgress] = useState(
    readStorage("najafProgress", {})
  );

  const [wishlist, setWishlist] = useState(
    readStorage("najafWishlist", [])
  );

  const [purchases, setPurchases] = useState(
    readStorage("najafPurchases", [])
  );

  const [certificates, setCertificates] = useState(
    readStorage("najafCertificates", [])
  );

  const [testResults, setTestResults] = useState(
    readStorage("najafTestResults", {})
  );


  /* =======================================================
     MODALS
  ======================================================= */

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [learningCourse, setLearningCourse] =
    useState(null);

  const [checkoutCourse, setCheckoutCourse] =
    useState(null);


  /* =======================================================
     AUTH
  ======================================================= */

  const [authOpen, setAuthOpen] =
    useState(false);

  const [authMode, setAuthMode] =
    useState("signin");


  /* =======================================================
     UI
  ======================================================= */

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [profileOpen, setProfileOpen] =
    useState(false);


  /* =======================================================
     LOGIN FORM
  ======================================================= */

  const [loginForm, setLoginForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const [newsletterEmail, setNewsletterEmail] =
    useState("");


  /* =======================================================
     GOOGLE LOGIN
  ======================================================= */

  const [googleReady, setGoogleReady] =
    useState(false);

  const googleButtonHostRef =
    useRef(null);

  const googleInitializedRef =
    useRef(false);


  /* =======================================================
     SAVE THEME
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafTheme",
      theme
    );

    document.body.className =
      theme;

  }, [theme]);


  /* =======================================================
     SAVE CURRENCY
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafCurrency",
      currency
    );

  }, [currency]);


  /* =======================================================
     SAVE USER
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafUser",
      user
    );

  }, [user]);


  /* =======================================================
     SAVE ENROLLMENTS
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafEnrolled",
      enrolled
    );

  }, [enrolled]);


  /* =======================================================
     SAVE PROGRESS
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafProgress",
      progress
    );

  }, [progress]);


  /* =======================================================
     SAVE WISHLIST
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafWishlist",
      wishlist
    );

  }, [wishlist]);


  /* =======================================================
     SAVE PURCHASES
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafPurchases",
      purchases
    );

  }, [purchases]);


  /* =======================================================
     SAVE CERTIFICATES
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafCertificates",
      certificates
    );

  }, [certificates]);


  /* =======================================================
     SAVE TEST RESULTS
  ======================================================= */

  useEffect(() => {

    saveStorage(
      "najafTestResults",
      testResults
    );

  }, [testResults]);


  /* =======================================================
     ROUTE SYNC
  ======================================================= */

  useEffect(() => {

    const path =
      window.location.pathname.replace(
        "/",
        ""
      );

    if (
      path &&
      path !== page
    ) {
      setPage(path);
    }

  }, [page]);


  /* =======================================================
     BROWSER BACK / FORWARD
  ======================================================= */

  useEffect(() => {

    const handlePopState = () => {

      setPage(
        window.location.pathname.replace(
          "/",
          ""
        ) || "home"
      );

    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);


  /* =======================================================
     GOOGLE ID INITIALIZATION
  ======================================================= */

  useEffect(() => {

    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    let cancelled = false;


    const tryInit = () => {

      if (cancelled) {
        return;
      }


      if (
        !window.google?.accounts?.id
      ) {

        window.setTimeout(
          tryInit,
          200
        );

        return;
      }


      if (
        googleInitializedRef.current
      ) {
        return;
      }


      googleInitializedRef.current =
        true;


      window.google.accounts.id.initialize({
        client_id:
          GOOGLE_CLIENT_ID,

        auto_select:
          false,

        callback: (response) => {

          try {

            const encoded =
              response.credential
                .split(".")[1];


            const payload =
              JSON.parse(
                window.atob(
                  encoded
                    .replace(/-/g, "+")
                    .replace(/_/g, "/")
                )
              );


            const googleUser = {

              name:
                payload.name ||
                "Google Learner",

              email:
                payload.email ||
                "",

              picture:
                payload.picture ||
                "",

              provider:
                "google",

            };


            setUser(
              googleUser
            );

            setAuthOpen(false);

            notify(
              "Google login successful."
            );

          } catch {

            notify(
              "Google login could not be completed."
            );

          }

        },

      });


      if (
        googleButtonHostRef.current
      ) {

        window.google.accounts.id.renderButton(

          googleButtonHostRef.current,

          {
            type: "standard",
            theme: "outline",
            size: "large",
            width: 320,
          }

        );

      }


      setGoogleReady(true);

    };


    tryInit();


    return () => {

      cancelled = true;

    };

  }, []);


  /* =======================================================
     NOTIFICATION
  ======================================================= */

  const notify = (message) => {

    setToast(message);

    window.clearTimeout(
      window.__najafToast
    );

    window.__najafToast =
      window.setTimeout(() => {

        setToast("");

      }, 3500);

  };


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = (nextPage) => {

    const safePage =
      nextPage || "home";


    window.history.pushState(
      {},
      "",
      `/${safePage}`
    );


    setPage(
      safePage
    );


    setMobileMenu(false);

    setProfileOpen(false);


    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };


  /* =======================================================
     OPEN AUTH
  ======================================================= */

  const openAuth = (
    mode = "signin"
  ) => {

    setAuthMode(mode);

    setAuthOpen(true);

  };


  /* =======================================================
     OPEN COURSE
  ======================================================= */

  const openCourse = (course) => {

    setSelectedCourse(
      course
    );

  };


  /* =======================================================
     WISHLIST
  ======================================================= */

  const toggleWishlist = (
    courseId
  ) => {

    setWishlist((current) => {

      if (
        current.includes(courseId)
      ) {

        notify(
          "Removed from wishlist."
        );

        return current.filter(
          (id) =>
            id !== courseId
        );

      }


      notify(
        "Course saved to wishlist."
      );


      return [
        ...current,
        courseId,
      ];

    });

  };


  /* =======================================================
     ENROLL / BUY
  ======================================================= */

  const enrollCourse = (
    course
  ) => {

    if (!user) {

      setSelectedCourse(null);

      openAuth("signin");

      notify(
        "Sign in before purchasing a course."
      );

      return;

    }


    if (
      enrolled.includes(
        course.id
      )
    ) {

      setSelectedCourse(null);

      setLearningCourse(
        course
      );

      return;

    }


    setSelectedCourse(null);

    setCheckoutCourse(
      course
    );

  };


  /* =======================================================
     COMPLETE PURCHASE
  ======================================================= */

  const completePurchase = () => {

    if (!checkoutCourse) {
      return;
    }


    const course =
      checkoutCourse;


    setEnrolled(
      (current) =>
        current.includes(course.id)
          ? current
          : [
              ...current,
              course.id,
            ]
    );


    setProgress(
      (current) => ({
        ...current,

        [course.id]:
          current[course.id] || 0,

      })
    );


    const purchase = {

      id:
        makeCredentialId(
          "PURCHASE",
          course.id
        ),

      courseId:
        course.id,

      courseTitle:
        course.title,

      amount:
        course.price,

      currency:
        currency,

      date:
        new Date().toISOString(),

      userName:
        user?.name ||
        "Najaf Learner",

      userEmail:
        user?.email ||
        "",

    };


    setPurchases(
      (current) => [
        purchase,
        ...current,
      ]
    );


    const purchaseCertificate = {

      id:
        purchase.id,

      type:
        "purchase",

      courseId:
        course.id,

      courseTitle:
        course.title,

      date:
        purchase.date,

      userName:
        purchase.userName,

      userEmail:
        purchase.userEmail,

    };


    setCertificates(
      (current) => {

        const exists =
          current.some(
            (item) =>
              item.type ===
                "purchase" &&
              item.courseId ===
                course.id
          );


        return exists
          ? current
          : [
              purchaseCertificate,
              ...current,
            ];

      }
    );


    setCheckoutCourse(
      null
    );


    notify(
      "Purchase successful. Course added to My Learning."
    );


    setTimeout(() => {

      setLearningCourse(
        course
      );

      navigate(
        "learning"
      );

    }, 400);

  };


  /* =======================================================
     COMPLETE LESSON
  ======================================================= */

  const completeLesson = (
    courseId,
    lessonIndex
  ) => {

    const course =
      COURSES.find(
        (item) =>
          item.id ===
          courseId
      );


    if (!course) {
      return;
    }


    const totalLessons =
      course.lessonsData.length;


    const newProgress =
      Math.round(
        ((lessonIndex + 1) /
          totalLessons) *
          100
      );


    setProgress(
      (current) => ({
        ...current,

        [courseId]:
          Math.max(
            current[courseId] ||
              0,
            newProgress
          ),

      })
    );


    if (
      newProgress >= 100
    ) {

      notify(
        "Course lessons completed. Take the final test to earn your certificate."
      );

    } else {

      notify(
        "Lesson completed."
      );

    }

  };


  /* =======================================================
     EMAIL AUTHENTICATION
  ======================================================= */

  const handleAuth = (
    event
  ) => {

    event.preventDefault();


    const email =
      loginForm.email.trim();


    const password =
      loginForm.password.trim();


    if (
      !email ||
      !password
    ) {

      notify(
        "Please enter your email and password."
      );

      return;

    }


    if (
      password.length < 6
    ) {

      notify(
        "Password must contain at least 6 characters."
      );

      return;

    }


    const name =
      loginForm.name.trim() ||
      email.split("@")[0] ||
      "Najaf Learner";


    const account = {

      name,

      email,

      provider:
        "email",

    };


    setUser(
      account
    );


    setAuthOpen(
      false
    );


    setLoginForm({

      name: "",

      email: "",

      password: "",

    });


    notify(

      authMode === "signup"

        ? "Account created successfully."

        : "Welcome back to Najaf Academy."

    );

  };


  /* =======================================================
     GOOGLE LOGIN BUTTON
  ======================================================= */

  const handleGoogleLogin =
    () => {

      if (
        !GOOGLE_CLIENT_ID
      ) {

        notify(
          "Google Login needs a Google OAuth Client ID. Add REACT_APP_GOOGLE_CLIENT_ID to your .env file. Normal login is working."
        );

        return;

      }


      if (!googleReady) {

        notify(
          "Google authentication is still loading. Try again in a moment."
        );

        return;

      }


      const realGoogleButton =
        googleButtonHostRef.current?.querySelector(
          'div[role="button"]'
        );


      if (
        realGoogleButton
      ) {

        realGoogleButton.click();

        return;

      }


      window.google?.accounts?.id?.prompt();

    };


  /* =======================================================
     SIGN OUT
  ======================================================= */

  const signOut = () => {

    setUser(null);

    setProfileOpen(false);

    notify(
      "You have been signed out."
    );

  };


  /* =======================================================
     START LEARNING
  ======================================================= */

  const startLearning = (
    course
  ) => {

    if (
      !enrolled.includes(
        course.id
      )
    ) {

      setSelectedCourse(
        course
      );

      return;

    }


    setLearningCourse(
      course
    );

  };


  /* =======================================================
     COURSE SEARCH
  ======================================================= */

  const filteredCourses =
    useMemo(() => {

      const term =
        search
          .trim()
          .toLowerCase();


      if (!term) {
        return COURSES;
      }


      return COURSES.filter(
        (course) => {

          return (

            course.title
              .toLowerCase()
              .includes(term)

            ||

            course.category
              .toLowerCase()
              .includes(term)

            ||

            course.instructor
              .toLowerCase()
              .includes(term)

            ||

            course.skills.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(term)
            )

          );

        }
      );

    }, [search]);


  /* =======================================================
     COMPLETED COURSES
  ======================================================= */

  const completedCourses =
    COURSES.filter(
      (course) =>
        enrolled.includes(
          course.id
        ) &&
        (progress[course.id] ||
          0) >= 100 &&
        testResults[
          course.id
        ]?.passed
    );


  /* =======================================================
     ROUTER
  ======================================================= */

  const renderPage = () => {

    switch (page) {

      case "courses":

        return (
          <CoursesPage
            courses={
              filteredCourses
            }

            search={
              search
            }

            setSearch={
              setSearch
            }

            wishlist={
              wishlist
            }

            onWishlist={
              toggleWishlist
            }

            onOpen={
              openCourse
            }

            currency={
              currency
            }
          />
        );


      case "learning":

        return (
          <LearningPage

            courses={
              COURSES
            }

            enrolled={
              enrolled
            }

            progress={
              progress
            }

            testResults={
              testResults
            }

            onBrowse={() =>
              navigate("courses")
            }

            onStart={
              startLearning
            }

          />
        );


      case "certificates":

        return (
          <CertificatesPage

            certificates={
              certificates
            }

            completedCourses={
              completedCourses
            }

            onOpenCertificate={
              (certificate) =>
                downloadCertificate(
                  certificate
                )
            }

          />
        );


      case "wishlist":

        return (
          <WishlistPage

            courses={
              COURSES
            }

            wishlist={
              wishlist
            }

            onWishlist={
              toggleWishlist
            }

            onOpen={
              openCourse
            }

            currency={
              currency
            }

          />
        );


      case "map":

        return (
          <BengaluruPage />
        );


      default:

        return (
          <HomePage

            courses={
              COURSES
            }

            wishlist={
              wishlist
            }

            onWishlist={
              toggleWishlist
            }

            onOpen={
              openCourse
            }

            onExplore={() =>
              navigate("courses")
            }

            currency={
              currency
            }

          />
        );

    }

  };


  /* =======================================================
     CERTIFICATE PRINT / SAVE
  ======================================================= */

  const downloadCertificate = (
    certificate
  ) => {

    const title =
      certificate.type ===
      "completion"

        ? "Certificate of Completion"

        : "Course Purchase Credential";


    const html = `
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          ${title}
        </title>

        <style>

          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #eef2f7;
            font-family: Arial, sans-serif;
          }

          .certificate {
            width: 850px;
            max-width: 90%;
            padding: 70px;
            box-sizing: border-box;
            background: white;
            border: 12px solid #14213d;
            outline: 3px solid #d6a84f;
            outline-offset: -28px;
            text-align: center;
          }

          .brand {
            color: #3157d5;
            letter-spacing: 4px;
            font-weight: 800;
          }

          h1 {
            font-family: Georgia, serif;
            font-size: 44px;
            margin: 30px 0 12px;
            color: #14213d;
          }

          h2 {
            font-size: 30px;
            color: #3157d5;
          }

          .name {
            font-size: 34px;
            font-weight: 700;
            margin: 28px 0;
          }

          .line {
            width: 70%;
            margin: 30px auto;
            border-bottom: 2px solid #d6a84f;
          }

          .small {
            color: #68748a;
            font-size: 13px;
          }

          .id {
            margin-top: 30px;
            font-family: monospace;
            font-size: 12px;
          }

          @media print {

            body {
              background: white;
            }

            .certificate {
              max-width: none;
            }

          }

        </style>

      </head>


      <body>

        <div class="certificate">

          <div class="brand">
            NAJAF ACADEMY
          </div>


          <h1>
            ${title}
          </h1>


          <p>
            This credential is presented to
          </p>


          <div class="name">

            ${
              certificate.userName ||
              "Najaf Learner"
            }

          </div>


          <p>
            for
          </p>


          <h2>
            ${certificate.courseTitle}
          </h2>


          <div class="line"></div>


          <p>
            Issued by Najaf Academy
            Professional Learning Platform
          </p>


          <p class="small">

            Issued:
            ${
              new Date(
                certificate.date
              ).toLocaleDateString()
            }

          </p>


          <p class="id">

            Credential ID:
            ${certificate.id}

          </p>

        </div>


        <script>

          window.onload =
            function() {

              window.print();

            };

        </script>

      </body>

      </html>
    `;


    const windowRef =
      window.open(
        "",
        "_blank",
        "width=1000,height=800"
      );


    if (!windowRef) {

      notify(
        "Please allow pop-ups to print the certificate."
      );

      return;

    }


    windowRef.document.write(
      html
    );

    windowRef.document.close();

  };


  /* =======================================================
     FINAL UI
  ======================================================= */

  return (

    <div
      className={`app ${theme}`}
    >

      {/* GOOGLE LOGIN HOST */}

      <div
        className="google-btn-host"
        ref={
          googleButtonHostRef
        }
      />


      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        <div className="nav-inner">


          {/* BRAND */}

          <button
            className="brand"
            type="button"
            onClick={() =>
              navigate("home")
            }
          >

            <span className="brand-mark">
              N
            </span>


            <span className="brand-text">

              <strong>
                NAJAF ACADEMY
              </strong>

              <small>
                PROFESSIONAL LEARNING
              </small>

            </span>

          </button>


          {/* NAVIGATION */}

          <nav
            className={`main-nav ${
              mobileMenu
                ? "mobile-open"
                : ""
            }`}
          >

            <button
              className={
                page === "home"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate("home")
              }
            >
              Home
            </button>


            <button
              className={
                page === "courses"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate("courses")
              }
            >
              Explore
            </button>


            <button
              className={
                page === "learning"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate("learning")
              }
            >
              My Learning
            </button>


            <button
              className={
                page === "certificates"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate(
                  "certificates"
                )
              }
            >
              Certificates
            </button>


            <button
              className={
                page === "wishlist"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate("wishlist")
              }
            >

              Wishlist

              {wishlist.length >
                0 && (

                <span className="nav-badge">
                  {wishlist.length}
                </span>

              )}

            </button>


            <button
              className={
                page === "map"
                  ? "active"
                  : ""
              }

              onClick={() =>
                navigate("map")
              }
            >
              Bengaluru
            </button>

          </nav>


          {/* NAV ACTIONS */}

          <div className="nav-actions">


            {/* CURRENCY */}

            <select
              className="currency-select"
              value={
                currency
              }

              onChange={(event) =>
                setCurrency(
                  event.target.value
                )
              }

              aria-label="Currency"
            >

              <option value="USD">
                USD
              </option>

              <option value="INR">
                INR
              </option>

              <option value="GBP">
                GBP
              </option>

              <option value="EUR">
                EUR
              </option>

            </select>


            {/* THEME */}

            <button
              className="icon-button"
              type="button"

              onClick={() =>
                setTheme(
                  (current) =>
                    current ===
                    "light"
                      ? "dark"
                      : "light"
                )
              }

              aria-label="Toggle theme"
            >

              <Icon
                name={
                  theme === "light"
                    ? "moon"
                    : "sun"
                }

                size={19}
              />

            </button>


            {/* USER */}

            {user ? (

              <div className="profile-wrapper">

                <button
                  className="profile-button"
                  type="button"

                  onClick={() =>
                    setProfileOpen(
                      (current) =>
                        !current
                    )
                  }
                >

                  <span className="profile-avatar">

                    {user.name
                      ?.charAt(0)
                      .toUpperCase() ||
                      "N"}

                  </span>

                  <span className="profile-name">
                    {user.name}
                  </span>

                </button>


                {profileOpen && (

                  <div className="profile-menu">

                    <div className="profile-header">

                      <div className="profile-avatar">

                        {user.name
                          ?.charAt(0)
                          .toUpperCase() ||
                          "N"}

                      </div>


                      <div>

                        <strong>
                          {user.name}
                        </strong>

                        <span>
                          {user.email}
                        </span>

                      </div>

                    </div>


                    <button
                      onClick={() => {

                        setProfileOpen(
                          false
                        );

                        navigate(
                          "learning"
                        );

                      }}
                    >

                      <Icon
                        name="book"
                        size={17}
                      />

                      My Learning

                    </button>


                    <button
                      onClick={() => {

                        setProfileOpen(
                          false
                        );

                        navigate(
                          "certificates"
                        );

                      }}
                    >

                      <Icon
                        name="award"
                        size={17}
                      />

                      Certificates

                    </button>


                    <button
                      onClick={
                        signOut
                      }
                    >

                      <Icon
                        name="logout"
                        size={17}
                      />

                      Sign out

                    </button>

                  </div>

                )}

              </div>

            ) : (

              <>

                <button
                  className="text-button"
                  onClick={() =>
                    openAuth(
                      "signin"
                    )
                  }
                >
                  Sign in
                </button>


                <button
                  className="primary-button nav-cta"
                  onClick={() =>
                    openAuth(
                      "signup"
                    )
                  }
                >
                  Get started
                </button>

              </>

            )}


            {/* MOBILE MENU */}

            <button
              className="mobile-menu-button"
              type="button"

              onClick={() =>
                setMobileMenu(
                  (current) =>
                    !current
                )
              }

              aria-label="Menu"
            >

              <Icon
                name={
                  mobileMenu
                    ? "close"
                    : "menu"
                }

                size={22}
              />

            </button>

          </div>

        </div>

      </header>


      {/* =================================================
          PAGE
      ================================================= */}

      {renderPage()}


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer
        navigate={navigate}
        openAuth={openAuth}
        newsletterEmail={
          newsletterEmail
        }
        setNewsletterEmail={
          setNewsletterEmail
        }
        notify={notify}
      />


      {/* =================================================
          COURSE DETAILS
      ================================================= */}

      {selectedCourse && (

        <CourseDetailsModal

          course={
            selectedCourse
          }

          enrolled={
            enrolled
          }

          progress={
            progress
          }

          wishlist={
            wishlist
          }

          onClose={() =>
            setSelectedCourse(
              null
            )
          }

          onBuy={
            enrollCourse
          }

          onWishlist={
            toggleWishlist
          }

          onStart={
            startLearning
          }

          currency={
            currency
          }

        />

      )}


      {/* =================================================
          CHECKOUT
      ================================================= */}

      {checkoutCourse && (

        <CheckoutModal

          course={
            checkoutCourse
          }

          currency={
            currency
          }

          onClose={() =>
            setCheckoutCourse(
              null
            )
          }

          onComplete={
            completePurchase
          }

        />

      )}


      {/* =================================================
          LEARNING PLAYER
      ================================================= */}

      {learningCourse && (

        <LearningPlayer

          course={
            learningCourse
          }

          progress={
            progress
          }

          testResults={
            testResults
          }

          onClose={() =>
            setLearningCourse(
              null
            )
          }

          onLessonComplete={
            completeLesson
          }

          onTestComplete={(
            courseId,
            score,
            passed
          ) => {

            setTestResults(
              (current) => ({

                ...current,

                [courseId]: {

                  score,

                  passed,

                  date:
                    new Date()
                      .toISOString(),

                },

              })
            );


            if (passed) {

              const course =
                COURSES.find(
                  (item) =>
                    item.id ===
                    courseId
                );


              if (course) {

                setProgress(
                  (current) => ({

                    ...current,

                    [courseId]:
                      100,

                  })
                );


                const completionCertificate = {

                  id:
                    makeCredentialId(
                      "COMPLETE",
                      courseId
                    ),

                  type:
                    "completion",

                  courseId:

                    courseId,

                  courseTitle:
                    course.title,

                  date:
                    new Date()
                      .toISOString(),

                  userName:
                    user?.name ||
                    "Najaf Learner",

                  userEmail:
                    user?.email ||
                    "",

                  score,

                };


                setCertificates(
                  (current) => {

                    const exists =
                      current.some(
                        (item) =>
                          item.type ===
                            "completion" &&
                          item.courseId ===
                            courseId
                      );


                    return exists

                      ? current

                      : [
                          completionCertificate,
                          ...current,
                        ];

                  }
                );


                notify(
                  "Congratulations! Your completion certificate is ready."
                );

              }

            } else {

              notify(
                "Test not passed. Review the lessons and try again."
              );

            }

          }}

        />

      )}


      {/* =================================================
          AUTH MODAL
      ================================================= */}

      {authOpen && (

        <AuthModal

          mode={
            authMode
          }

          setMode={
            setAuthMode
          }

          form={
            loginForm
          }

          setForm={
            setLoginForm
          }

          onClose={() =>
            setAuthOpen(
              false
            )
          }

          onSubmit={
            handleAuth
          }

          onGoogle={
            handleGoogleLogin
          }

        />

      )}


      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (

        <div className="toast">

          <span className="toast-check">

            <Icon
              name="check"
              size={16}
            />

          </span>


          <span>
            {toast}
          </span>


          <button
            type="button"

            onClick={() =>
              setToast("")
            }
          >

            <Icon
              name="close"
              size={15}
            />

          </button>

        </div>

      )}

    </div>

  );

}


