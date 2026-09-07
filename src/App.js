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

/* =========================================================
   GOOGLE LOGIN
   ---------------------------------------------------------
   Add your Google Client ID later:

   const GOOGLE_CLIENT_ID =
     "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

   The normal email login works without Google configuration.
========================================================= */

const GOOGLE_CLIENT_ID =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_GOOGLE_CLIENT_ID) ||
  "";

/* =========================================================
   COURSE DATA
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
    lessons: 8,
    price: 49,
    oldPrice: 79,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85",
    description:
      "Build practical cybersecurity skills across security operations, networking, Linux, Python, SIEM and incident response.",
    skills: [
      "Cybersecurity",
      "Python",
      "Linux",
      "SIEM",
      "Network Security",
      "Incident Response",
    ],
    lessonsData: [
      {
        title: "Introduction to Cybersecurity",
        duration: "18 min",
      },
      {
        title: "Security Foundations",
        duration: "24 min",
      },
      {
        title: "Networking Basics",
        duration: "32 min",
      },
      {
        title: "Linux and Command Line",
        duration: "29 min",
      },
      {
        title: "Python for Security",
        duration: "36 min",
      },
      {
        title: "Security Operations",
        duration: "31 min",
      },
      {
        title: "Incident Response",
        duration: "27 min",
      },
      {
        title: "Final Security Assessment",
        duration: "40 min",
      },
    ],
    quiz: [
      {
        question: "What is the primary purpose of a firewall?",
        options: [
          "Store passwords",
          "Control network traffic",
          "Create websites",
          "Compress files",
        ],
        answer: 1,
      },
      {
        question: "Which Linux command lists files?",
        options: ["ls", "cd", "pwd", "mkdir"],
        answer: 0,
      },
      {
        question: "What does SIEM commonly help organizations do?",
        options: [
          "Edit videos",
          "Monitor and analyze security events",
          "Design logos",
          "Build mobile games",
        ],
        answer: 1,
      },
      {
        question: "Which principle gives users only required access?",
        options: [
          "Least privilege",
          "Open access",
          "Maximum privilege",
          "Anonymous access",
        ],
        answer: 0,
      },
      {
        question: "What is phishing?",
        options: [
          "A database",
          "A social engineering attack",
          "A programming language",
          "A firewall rule",
        ],
        answer: 1,
      },
    ],
  },

  {
    id: 2,
    title: "Machine Learning Specialization",
    category: "AI & Machine Learning",
    level: "Intermediate",
    instructor: "DeepLearning.AI",
    rating: 4.8,
    students: "94K",
    duration: "4 months",
    lessons: 8,
    price: 59,
    oldPrice: 89,
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1400&q=85",
    description:
      "Learn practical machine learning concepts and build intelligent applications with Python and modern ML techniques.",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Neural Networks",
      "Data",
      "AI",
    ],
    lessonsData: [
      {
        title: "Machine Learning Foundations",
        duration: "28 min",
      },
      {
        title: "Linear Regression",
        duration: "34 min",
      },
      {
        title: "Classification",
        duration: "31 min",
      },
      {
        title: "Model Evaluation",
        duration: "27 min",
      },
      {
        title: "Feature Engineering",
        duration: "30 min",
      },
      {
        title: "Neural Networks",
        duration: "42 min",
      },
      {
        title: "TensorFlow Basics",
        duration: "39 min",
      },
      {
        title: "Final ML Assessment",
        duration: "45 min",
      },
    ],
    quiz: [
      {
        question: "Which language is commonly used for machine learning?",
        options: ["Python", "HTML", "CSS", "SQL only"],
        answer: 0,
      },
      {
        question: "What is supervised learning?",
        options: [
          "Learning without data",
          "Learning from labeled examples",
          "Deleting datasets",
          "Designing interfaces",
        ],
        answer: 1,
      },
      {
        question: "What is a feature?",
        options: [
          "An input variable used by a model",
          "A password",
          "A browser",
          "A server",
        ],
        answer: 0,
      },
      {
        question: "What is classification used for?",
        options: [
          "Predicting categories",
          "Formatting CSS",
          "Compressing images",
          "Creating URLs",
        ],
        answer: 0,
      },
      {
        question: "What is TensorFlow?",
        options: [
          "A browser",
          "An ML framework",
          "An operating system",
          "A database only",
        ],
        answer: 1,
      },
    ],
  },

  {
    id: 3,
    title: "Meta Front-End Developer",
    category: "Web Development",
    level: "Beginner",
    instructor: "Meta",
    rating: 4.8,
    students: "212K",
    duration: "7 months",
    lessons: 8,
    price: 55,
    oldPrice: 85,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
    description:
      "Master HTML, CSS, JavaScript, React and responsive web development by building production-ready projects.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
    ],
    lessonsData: [
      {
        title: "HTML Foundations",
        duration: "22 min",
      },
      {
        title: "Modern CSS",
        duration: "31 min",
      },
      {
        title: "Responsive Design",
        duration: "26 min",
      },
      {
        title: "JavaScript Fundamentals",
        duration: "38 min",
      },
      {
        title: "DOM and Events",
        duration: "34 min",
      },
      {
        title: "React Fundamentals",
        duration: "42 min",
      },
      {
        title: "React Components",
        duration: "36 min",
      },
      {
        title: "Final Front-End Assessment",
        duration: "40 min",
      },
    ],
    quiz: [
      {
        question: "What does HTML primarily define?",
        options: [
          "Page structure",
          "Server security",
          "Database indexes",
          "Cloud billing",
        ],
        answer: 0,
      },
      {
        question: "Which technology is used for styling web pages?",
        options: ["CSS", "SQL", "Python", "Git"],
        answer: 0,
      },
      {
        question: "What is React?",
        options: [
          "A JavaScript library",
          "A database",
          "A browser",
          "A Linux command",
        ],
        answer: 0,
      },
      {
        question: "Which Git command creates a commit?",
        options: ["git push", "git commit", "git clone", "git pull"],
        answer: 1,
      },
      {
        question: "Responsive design helps websites work across:",
        options: [
          "Only laptops",
          "Different screen sizes",
          "Only servers",
          "Only databases",
        ],
        answer: 1,
      },
    ],
  },

  {
    id: 4,
    title: "AWS Cloud Solutions Architecture",
    category: "Cloud Computing",
    level: "Intermediate",
    instructor: "AWS",
    rating: 4.9,
    students: "76K",
    duration: "5 months",
    lessons: 8,
    price: 69,
    oldPrice: 99,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    description:
      "Understand cloud architecture, AWS services, security, scalability and deployment patterns used by modern companies.",
    skills: [
      "AWS",
      "Cloud",
      "EC2",
      "S3",
      "IAM",
      "Architecture",
    ],
    lessonsData: [
      {
        title: "Cloud Computing Fundamentals",
        duration: "25 min",
      },
      {
        title: "AWS Global Infrastructure",
        duration: "28 min",
      },
      {
        title: "EC2 Essentials",
        duration: "34 min",
      },
      {
        title: "S3 Storage",
        duration: "26 min",
      },
      {
        title: "IAM and Security",
        duration: "33 min",
      },
      {
        title: "Scalable Architecture",
        duration: "38 min",
      },
      {
        title: "Cloud Deployment",
        duration: "35 min",
      },
      {
        title: "Final Cloud Assessment",
        duration: "40 min",
      },
    ],
    quiz: [
      {
        question: "What is EC2?",
        options: [
          "A compute service",
          "A design tool",
          "A database query",
          "A programming language",
        ],
        answer: 0,
      },
      {
        question: "What is Amazon S3 primarily used for?",
        options: [
          "Object storage",
          "Video editing",
          "Email only",
          "CSS styling",
        ],
        answer: 0,
      },
      {
        question: "IAM helps manage:",
        options: [
          "Identities and permissions",
          "CSS files",
          "Images",
          "HTML tags",
        ],
        answer: 0,
      },
      {
        question: "Cloud scalability means:",
        options: [
          "Increasing or decreasing resources as needed",
          "Deleting servers",
          "Changing passwords",
          "Designing logos",
        ],
        answer: 0,
      },
      {
        question: "Which is a cloud deployment concern?",
        options: [
          "Security",
          "Font size only",
          "Keyboard color",
          "Wallpaper",
        ],
        answer: 0,
      },
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
};

const formatPrice = (price, currency) => {
  const rates = {
    USD: 1,
    INR: 83.5,
    GBP: 0.79,
    EUR: 0.92,
  };

  const symbols = {
    USD: "$",
    INR: "₹",
    GBP: "£",
    EUR: "€",
  };

  const value = price * (rates[currency] || 1);

  return `${symbols[currency] || "$"}${Math.round(value)}`;
};

const makeCredentialId = (prefix, courseId) => {
  return `${prefix}-${courseId}-${Date.now()
    .toString(36)
    .toUpperCase()}`;
};

/* =========================================================
   ICON
========================================================= */

function Icon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
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
    check: <path d="m5 12 4 4L19 6" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    heart: (
      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12.5-1 8 4.5-2.5 4.5 2.5-1-8" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
        <path d="M4 5.5v16" />
      </>
    ),
    play: (
      <path d="m9 6 10 6-10 6Z" fill="currentColor" stroke="none" />
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
      </>
    ),
    moon: (
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    logout: (
      <>
        <path d="M10 5H5v14h5" />
        <path d="m14 8 4 4-4 4" />
        <path d="M18 12H9" />
      </>
    ),
    map: (
      <>
        <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v4a4 4 0 0 1-8 0Z" />
        <path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4" />
        <path d="M12 12v5M8 21h8M9 17h6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    star: (
      <path
        d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };

  return <svg {...props}>{icons[name] || icons.book}</svg>;
}

/* =========================================================
   APP
========================================================= */

export default function App() {
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

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [learningCourse, setLearningCourse] = useState(null);
  const [checkoutCourse, setCheckoutCourse] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  const [mobileMenu, setMobileMenu] = useState(false);

  const [toast, setToast] = useState("");

  const [search, setSearch] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [googleReady, setGoogleReady] = useState(false);
  const googleButtonHostRef = useRef(null);
  const googleInitializedRef = useRef(false);

  useEffect(() => {
    saveStorage("najafTheme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    saveStorage("najafCurrency", currency);
  }, [currency]);

  useEffect(() => {
    saveStorage("najafUser", user);
  }, [user]);

  useEffect(() => {
    saveStorage("najafEnrolled", enrolled);
  }, [enrolled]);

  useEffect(() => {
    saveStorage("najafProgress", progress);
  }, [progress]);

  useEffect(() => {
    saveStorage("najafWishlist", wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveStorage("najafPurchases", purchases);
  }, [purchases]);

  useEffect(() => {
    saveStorage("najafCertificates", certificates);
  }, [certificates]);

  useEffect(() => {
    saveStorage("najafTestResults", testResults);
  }, [testResults]);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");

    if (path && path !== page) {
      setPage(path);
    }
  }, [page]);

  useEffect(() => {
    const handlePopState = () => {
      setPage(window.location.pathname.replace("/", "") || "home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    let cancelled = false;

    const tryInit = () => {
      if (cancelled) return;

      if (!window.google?.accounts?.id) {
        window.setTimeout(tryInit, 200);
        return;
      }

      if (googleInitializedRef.current) return;
      googleInitializedRef.current = true;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        auto_select: false,
        callback: (response) => {
          try {
            const encoded = response.credential.split(".")[1];

            const payload = JSON.parse(
              window.atob(
                encoded.replace(/-/g, "+").replace(/_/g, "/")
              )
            );

            const googleUser = {
              name: payload.name || "Google Learner",
              email: payload.email || "",
              picture: payload.picture || "",
              provider: "google",
            };

            setUser(googleUser);
            setAuthOpen(false);
            notify("Google login successful.");
          } catch {
            notify("Google login could not be completed.");
          }
        },
      });

      if (googleButtonHostRef.current) {
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

  const notify = (message) => {
    setToast(message);

    window.clearTimeout(window.__najafToast);

    window.__najafToast = window.setTimeout(() => {
      setToast("");
    }, 3500);
  };

  const navigate = (nextPage) => {
    const safePage = nextPage || "home";

    window.history.pushState({}, "", `/${safePage}`);

    setPage(safePage);
    setMobileMenu(false);
    setProfileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openAuth = (mode = "signin") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const openCourse = (course) => {
    setSelectedCourse(course);
  };

  const toggleWishlist = (courseId) => {
    setWishlist((current) => {
      if (current.includes(courseId)) {
        notify("Removed from wishlist.");
        return current.filter((id) => id !== courseId);
      }

      notify("Course saved to wishlist.");
      return [...current, courseId];
    });
  };

  const enrollCourse = (course) => {
    if (!user) {
      setSelectedCourse(null);
      openAuth("signin");
      notify("Sign in before purchasing a course.");
      return;
    }

    if (enrolled.includes(course.id)) {
      setSelectedCourse(null);
      setLearningCourse(course);
      return;
    }

    setSelectedCourse(null);
    setCheckoutCourse(course);
  };

  const completePurchase = () => {
    if (!checkoutCourse) return;

    const course = checkoutCourse;

    setEnrolled((current) =>
      current.includes(course.id)
        ? current
        : [...current, course.id]
    );

    setProgress((current) => ({
      ...current,
      [course.id]: current[course.id] || 0,
    }));

    const purchase = {
      id: makeCredentialId("PURCHASE", course.id),
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      currency,
      date: new Date().toISOString(),
      userName: user?.name || "Najaf Learner",
      userEmail: user?.email || "",
    };

    setPurchases((current) => [purchase, ...current]);

    const purchaseCertificate = {
      id: purchase.id,
      type: "purchase",
      courseId: course.id,
      courseTitle: course.title,
      date: purchase.date,
      userName: purchase.userName,
      userEmail: purchase.userEmail,
    };

    setCertificates((current) => {
      const exists = current.some(
        (item) =>
          item.type === "purchase" &&
          item.courseId === course.id
      );

      return exists
        ? current
        : [purchaseCertificate, ...current];
    });

    setCheckoutCourse(null);

    notify(
      "Purchase successful. Course added to My Learning."
    );

    setTimeout(() => {
      setLearningCourse(course);
      navigate("learning");
    }, 400);
  };

  const completeLesson = (courseId, lessonIndex) => {
    const course = COURSES.find(
      (item) => item.id === courseId
    );

    if (!course) return;

    const totalLessons = course.lessonsData.length;

    const newProgress = Math.round(
      ((lessonIndex + 1) / totalLessons) * 100
    );

    setProgress((current) => ({
      ...current,
      [courseId]: Math.max(
        current[courseId] || 0,
        newProgress
      ),
    }));

    if (newProgress >= 100) {
      notify(
        "Course lessons completed. Take the final test to earn your certificate."
      );
    } else {
      notify("Lesson completed.");
    }
  };

  const handleAuth = (event) => {
    event.preventDefault();

    const email = loginForm.email.trim();
    const password = loginForm.password.trim();

    if (!email || !password) {
      notify("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      notify("Password must contain at least 6 characters.");
      return;
    }

    const name =
      loginForm.name.trim() ||
      email.split("@")[0] ||
      "Najaf Learner";

    const account = {
      name,
      email,
      provider: "email",
    };

    setUser(account);
    setAuthOpen(false);

    setLoginForm({
      name: "",
      email: "",
      password: "",
    });

    notify(
      authMode === "signup"
        ? "Your Najaf Academy account has been created."
        : "Welcome back to Najaf Academy."
    );
  };

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      notify(
        "Google Login needs a Google OAuth Client ID — add REACT_APP_GOOGLE_CLIENT_ID to your .env file. Normal login is working."
      );
      return;
    }

    if (!googleReady) {
      notify("Google authentication is still loading — try again in a moment.");
      return;
    }

    const realGoogleButton = googleButtonHostRef.current?.querySelector(
      'div[role="button"]'
    );

    if (realGoogleButton) {
      realGoogleButton.click();
      return;
    }

    window.google?.accounts?.id?.prompt();
  };

  const signOut = () => {
    setUser(null);
    setProfileOpen(false);
    notify("You have been signed out.");
  };

  const startLearning = (course) => {
    if (!enrolled.includes(course.id)) {
      setSelectedCourse(course);
      return;
    }

    setLearningCourse(course);
  };

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return COURSES;

    return COURSES.filter((course) => {
      return (
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(term)
        )
      );
    });
  }, [search]);

  const completedCourses = COURSES.filter(
    (course) =>
      enrolled.includes(course.id) &&
      (progress[course.id] || 0) >= 100 &&
      testResults[course.id]?.passed
  );

  const renderPage = () => {
    switch (page) {
      case "courses":
        return (
          <CoursesPage
            courses={filteredCourses}
            search={search}
            setSearch={setSearch}
            wishlist={wishlist}
            onWishlist={toggleWishlist}
            onOpen={openCourse}
            currency={currency}
          />
        );

      case "learning":
        return (
          <LearningPage
            courses={COURSES}
            enrolled={enrolled}
            progress={progress}
            testResults={testResults}
            onBrowse={() => navigate("courses")}
            onStart={startLearning}
          />
        );

      case "certificates":
        return (
          <CertificatesPage
            certificates={certificates}
            completedCourses={completedCourses}
            onOpenCertificate={(certificate) =>
              downloadCertificate(certificate)
            }
          />
        );

      case "wishlist":
        return (
          <WishlistPage
            courses={COURSES}
            wishlist={wishlist}
            onWishlist={toggleWishlist}
            onOpen={openCourse}
            currency={currency}
          />
        );

      case "map":
        return <BengaluruPage />;

      default:
        return (
          <HomePage
            courses={COURSES}
            wishlist={wishlist}
            onWishlist={toggleWishlist}
            onOpen={openCourse}
            onExplore={() => navigate("courses")}
            currency={currency}
          />
        );
    }
  };

  const downloadCertificate = (certificate) => {
    const title =
      certificate.type === "completion"
        ? "Certificate of Completion"
        : "Course Purchase Credential";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
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
          <div class="brand">NAJAF ACADEMY</div>

          <h1>${title}</h1>

          <p>This credential is presented to</p>

          <div class="name">
            ${certificate.userName || "Najaf Learner"}
          </div>

          <p>for</p>

          <h2>${certificate.courseTitle}</h2>

          <div class="line"></div>

          <p>
            Issued by Najaf Academy Professional Learning Platform
          </p>

          <p class="small">
            Issued: ${new Date(
              certificate.date
            ).toLocaleDateString()}
          </p>

          <p class="id">
            Credential ID: ${certificate.id}
          </p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    const windowRef = window.open(
      "",
      "_blank",
      "width=1000,height=800"
    );

    if (!windowRef) {
      notify("Please allow pop-ups to print the certificate.");
      return;
    }

    windowRef.document.write(html);
    windowRef.document.close();
  };

  return (
    <div className={`app ${theme}`}>
      <div className="google-btn-host" ref={googleButtonHostRef} />

      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            type="button"
            onClick={() => navigate("home")}
          >
            <span className="brand-mark">N</span>

            <span className="brand-text">
              <strong>NAJAF ACADEMY</strong>
              <small>PROFESSIONAL LEARNING</small>
            </span>
          </button>

          <nav
            className={`main-nav ${
              mobileMenu ? "mobile-open" : ""
            }`}
          >
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => navigate("home")}
            >
              Home
            </button>

            <button
              className={page === "courses" ? "active" : ""}
              onClick={() => navigate("courses")}
            >
              Explore
            </button>

            <button
              className={page === "learning" ? "active" : ""}
              onClick={() => navigate("learning")}
            >
              My Learning
            </button>

            <button
              className={page === "certificates" ? "active" : ""}
              onClick={() => navigate("certificates")}
            >
              Certificates
            </button>

            <button
              className={page === "wishlist" ? "active" : ""}
              onClick={() => navigate("wishlist")}
            >
              Wishlist
              {wishlist.length > 0 && (
                <span className="nav-badge">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              className={page === "map" ? "active" : ""}
              onClick={() => navigate("map")}
            >
              Bengaluru
            </button>
          </nav>

          <div className="nav-actions">
            <select
              className="currency-select"
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value)
              }
              aria-label="Currency"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>

            <button
              className="icon-button"
              type="button"
              onClick={() =>
                setTheme((current) =>
                  current === "light" ? "dark" : "light"
                )
              }
              aria-label="Toggle theme"
            >
              <Icon
                name={theme === "light" ? "moon" : "sun"}
                size={19}
              />
            </button>

            {user ? (
              <button
                className="avatar-button"
                type="button"
                onClick={() =>
                  setProfileOpen((current) => !current)
                }
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name} />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </button>
            ) : (
              <>
                <button
                  className="nav-signin"
                  type="button"
                  onClick={() => openAuth("signin")}
                >
                  Sign in
                </button>

                <button
                  className="nav-start"
                  type="button"
                  onClick={() => openAuth("signup")}
                >
                  Get started
                </button>
              </>
            )}

            <button
              className="mobile-menu-button"
              type="button"
              onClick={() =>
                setMobileMenu((current) => !current)
              }
              aria-label="Menu"
            >
              <Icon
                name={mobileMenu ? "close" : "menu"}
                size={22}
              />
            </button>
          </div>

          {profileOpen && user && (
            <div className="profile-menu">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("learning");
                }}
              >
                <Icon name="book" size={17} />
                My Learning
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("certificates");
                }}
              >
                <Icon name="award" size={17} />
                Certificates
              </button>

              <button onClick={signOut}>
                <Icon name="logout" size={17} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {renderPage()}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">N</span>
              <div>
                <strong>NAJAF ACADEMY</strong>
                <span>Professional learning platform</span>
              </div>
            </div>

            <p>
              Build practical skills, complete assessments and
              turn learning into professional credentials.
            </p>

            <form
              className="footer-newsletter"
              onSubmit={(event) => {
                event.preventDefault();

                if (!newsletterEmail.trim()) return;

                notify("Thanks — you're on the list.");
                setNewsletterEmail("");
              }}
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(event) =>
                  setNewsletterEmail(event.target.value)
                }
                placeholder="Your email"
                aria-label="Newsletter email"
              />

              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div>
            <h4>Learning</h4>

            <button onClick={() => navigate("courses")}>
              Explore courses
            </button>

            <button onClick={() => navigate("learning")}>
              My Learning
            </button>

            <button onClick={() => navigate("certificates")}>
              Certificates
            </button>
          </div>

          <div>
            <h4>Academy</h4>

            <button onClick={() => navigate("wishlist")}>
              Wishlist
            </button>

            <button onClick={() => navigate("map")}>
              Bengaluru location
            </button>

            <button onClick={() => openAuth("signin")}>
              Account
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {ACADEMY_NAME}. All
          rights reserved.
        </div>
      </footer>

      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          enrolled={enrolled}
          progress={progress}
          wishlist={wishlist}
          onClose={() => setSelectedCourse(null)}
          onBuy={enrollCourse}
          onWishlist={toggleWishlist}
          onStart={startLearning}
          currency={currency}
        />
      )}

      {checkoutCourse && (
        <CheckoutModal
          course={checkoutCourse}
          currency={currency}
          onClose={() => setCheckoutCourse(null)}
          onComplete={completePurchase}
        />
      )}

      {learningCourse && (
        <LearningPlayer
          course={learningCourse}
          progress={progress}
          testResults={testResults}
          onClose={() => setLearningCourse(null)}
          onLessonComplete={completeLesson}
          onTestComplete={(courseId, score, passed) => {
            setTestResults((current) => ({
              ...current,
              [courseId]: {
                score,
                passed,
                date: new Date().toISOString(),
              },
            }));

            if (passed) {
              const course = COURSES.find(
                (item) => item.id === courseId
              );

              if (course) {
                setProgress((current) => ({
                  ...current,
                  [courseId]: 100,
                }));

                const completionCertificate = {
                  id: makeCredentialId(
                    "COMPLETE",
                    courseId
                  ),
                  type: "completion",
                  courseId,
                  courseTitle: course.title,
                  date: new Date().toISOString(),
                  userName:
                    user?.name || "Najaf Learner",
                  userEmail: user?.email || "",
                  score,
                };

                setCertificates((current) => {
                  const exists = current.some(
                    (item) =>
                      item.type === "completion" &&
                      item.courseId === courseId
                  );

                  return exists
                    ? current
                    : [
                        completionCertificate,
                        ...current,
                      ];
                });

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

      {authOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          form={loginForm}
          setForm={setLoginForm}
          onClose={() => setAuthOpen(false)}
          onSubmit={handleAuth}
          onGoogle={handleGoogleLogin}
        />
      )}

      {toast && (
        <div className="toast">
          <span className="toast-check">
            <Icon name="check" size={16} />
          </span>

          <span>{toast}</span>

          <button
            type="button"
            onClick={() => setToast("")}
          >
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HOME
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
                <Icon name="arrow" size={18} />
              </button>

              <button
                className="hero-secondary"
                onClick={() => onOpen(courses[0])}
              >
                View featured program
              </button>
            </div>

            <div className="hero-trust">
              <span>✓ Practical projects</span>
              <span>✓ Assessments</span>
              <span>✓ Completion credentials</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div>
            <strong>42K+</strong>
            <span>Learners enrolled</span>
          </div>

          <div>
            <strong>4.8/5</strong>
            <span>Average course rating</span>
          </div>

          <div>
            <strong>96%</strong>
            <span>Assessment pass rate</span>
          </div>

          <div>
            <strong>18</strong>
            <span>Professional programs</span>
          </div>
        </div>
      </section>

      <section className="logo-strip">
        <div className="container logo-strip-inner">
          <span className="logo-strip-label">
            SKILLS TAUGHT ALONGSIDE INDUSTRY STANDARDS
          </span>

          <div className="logo-strip-names">
            <span>Google</span>
            <span>Meta</span>
            <span>AWS</span>
            <span>DeepLearning.AI</span>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">POPULAR PROGRAMS</span>
            <h2>Build skills companies need.</h2>
          </div>

          <button
            className="text-button"
            onClick={onExplore}
          >
            View all courses
            <Icon name="arrow" size={17} />
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

      <section className="container section testimonials">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LEARNER OUTCOMES</span>
            <h2>Trusted by working professionals.</h2>
          </div>
        </div>

        <div className="testimonial-grid">
          {[
            {
              quote:
                "The cybersecurity path took me from a support role to a SOC analyst position in under a year. The assessments actually mirror real interview questions.",
              name: "Ananya Rao",
              role: "SOC Analyst, Bengaluru",
            },
            {
              quote:
                "I've tried a few platforms — this is the first one where I finished every module and actually used the certificate on my resume.",
              name: "Marcus Bell",
              role: "Frontend Developer",
            },
            {
              quote:
                "Clear structure, real projects, and the pacing respects that I have a full-time job. The ML specialization was worth every rupee.",
              name: "Priya Nair",
              role: "Data Analyst",
            },
          ].map((item) => (
            <article className="testimonial-card" key={item.name}>
              <div className="testimonial-stars">
                <Icon name="star" size={15} />
                <Icon name="star" size={15} />
                <Icon name="star" size={15} />
                <Icon name="star" size={15} />
                <Icon name="star" size={15} />
              </div>

              <p className="testimonial-quote">"{item.quote}"</p>

              <div className="testimonial-person">
                <div className="testimonial-avatar">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>Frequently asked questions.</h2>
          </div>
        </div>

        <div className="faq-list">
          {[
            {
              q: "Do I get a certificate after finishing a course?",
              a: "Yes. Once you complete every lesson and pass the final assessment, a completion certificate is generated automatically and stored in your Certificates page.",
            },
            {
              q: "Can I learn at my own pace?",
              a: "All courses are fully self-paced. Your progress is saved automatically so you can pick up exactly where you left off, on any device.",
            },
            {
              q: "What happens if I fail the final assessment?",
              a: "You can retake the assessment as many times as you need — there's no limit and no extra cost.",
            },
            {
              q: "Is there a refund policy?",
              a: "Reach out through your account and our team will review purchases made within the last 14 days.",
            },
          ].map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>
                {item.q}
                <span className="faq-plus">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="career-banner">
        <div className="container career-banner-inner">
          <div>
            <span className="eyebrow">LEARN → TEST → CERTIFY</span>
            <h2>
              Don't just watch lessons.
              <br />
              Prove what you know.
            </h2>
          </div>

          <div className="career-steps">
            <div>
              <strong>01</strong>
              <span>Learn</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Test</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Certificate</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({
  course,
  wishlist,
  onWishlist,
  onOpen,
  currency,
}) {
  const saved = wishlist.includes(course.id);

  return (
    <article className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />

        <button
          className={`wishlist-button ${
            saved ? "saved" : ""
          }`}
          onClick={() => onWishlist(course.id)}
          aria-label="Wishlist"
        >
          <Icon name="heart" size={18} />
        </button>

        <span className="course-level">
          {course.level}
        </span>
      </div>

      <div className="course-card-body">
        <span className="course-category">
          {course.category}
        </span>

        <h3>{course.title}</h3>

        <p className="course-instructor">
          {course.instructor}
        </p>

        <div className="course-rating">
          <strong>{course.rating}</strong>

          <span className="stars">
            <Icon name="star" size={14} />
            <Icon name="star" size={14} />
            <Icon name="star" size={14} />
            <Icon name="star" size={14} />
            <Icon name="star" size={14} />
          </span>

          <span>{course.students} learners</span>
        </div>

        <div className="course-card-footer">
          <div>
            <strong>
              {formatPrice(course.price, currency)}
            </strong>

            <del>
              {formatPrice(course.oldPrice, currency)}
            </del>
          </div>

          <button
            className="course-view-button"
            onClick={() => onOpen(course)}
          >
            View
            <Icon name="arrow" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COURSES
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
  return (
    <main className="page">
      <section className="catalog-header">
        <div className="container">
          <span className="eyebrow">COURSE CATALOG</span>

          <h1>Find your next skill.</h1>

          <p>
            Explore professional programs across technology,
            cybersecurity, AI and cloud.
          </p>

          <div className="catalog-search">
            <Icon name="search" size={20} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search courses, skills or instructors..."
            />
          </div>
        </div>
      </section>

      <section className="container catalog-content">
        <div className="catalog-topline">
          <strong>{courses.length} programs</strong>

          <span>
            Learn at your own pace and earn credentials.
          </span>
        </div>

        {courses.length ? (
          <div className="course-grid large">
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
        ) : (
          <div className="empty-state">
            <Icon name="search" size={34} />

            <h2>No courses found</h2>

            <p>
              Try another keyword or search for a skill.
            </p>

            <button
              className="secondary-button"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   LEARNING PAGE
========================================================= */

function LearningPage({
  courses,
  enrolled,
  progress,
  testResults,
  onBrowse,
  onStart,
}) {
  const learningCourses = courses.filter((course) =>
    enrolled.includes(course.id)
  );

  const averageProgress = learningCourses.length
    ? Math.round(
        learningCourses.reduce(
          (sum, course) =>
            sum + (progress[course.id] || 0),
          0
        ) / learningCourses.length
      )
    : 0;

  const completed = learningCourses.filter(
    (course) =>
      (progress[course.id] || 0) >= 100 &&
      testResults[course.id]?.passed
  ).length;

  return (
    <main className="page learning-page">
      <section className="learning-hero">
        <div className="container">
          <div className="learning-hero-content">
            <div>
              <span className="eyebrow light">
                MY LEARNING
              </span>

              <h1>Keep moving forward.</h1>

              <p>
                Your courses, progress, assessments and
                credentials in one professional workspace.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={onBrowse}
            >
              Discover courses
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <div className="learning-stats">
            <div>
              <span className="learning-stat-icon">
                <Icon name="book" size={21} />
              </span>

              <div>
                <strong>
                  {learningCourses.length}
                </strong>

                <span>Courses enrolled</span>
              </div>
            </div>

            <div>
              <span className="learning-stat-icon">
                <Icon name="star" size={21} />
              </span>

              <div>
                <strong>{averageProgress}%</strong>
                <span>Average progress</span>
              </div>
            </div>

            <div>
              <span className="learning-stat-icon">
                <Icon name="trophy" size={21} />
              </span>

              <div>
                <strong>{completed}</strong>
                <span>Completed</span>
              </div>
            </div>

            <div>
              <span className="learning-stat-icon">
                <Icon name="award" size={21} />
              </span>

              <div>
                <strong>
                  {Object.values(testResults).filter(
                    (item) => item.passed
                  ).length}
                </strong>
                <span>Tests passed</span>
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

            <h2>Continue learning</h2>
          </div>
        </div>

        {learningCourses.length === 0 ? (
          <div className="learning-empty">
            <div className="learning-empty-icon">
              <Icon name="book" size={38} />
            </div>

            <h2>Your learning library is empty.</h2>

            <p>
              Purchase your first course and it will appear
              here with lesson progress and assessments.
            </p>

            <button
              className="primary-button"
              onClick={onBrowse}
            >
              Browse courses
              <Icon name="arrow" size={17} />
            </button>
          </div>
        ) : (
          <div className="learning-list">
            {learningCourses.map((course) => {
              const value = progress[course.id] || 0;

              const passed =
                testResults[course.id]?.passed;

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

                    <h3>{course.title}</h3>

                    <p>
                      {course.instructor} ·{" "}
                      {course.duration}
                    </p>

                    <div className="progress-meta">
                      <strong>
                        {value}% complete
                      </strong>

                      <span>
                        {Math.round(
                          (course.lessonsData.length *
                            value) /
                            100
                        )}{" "}
                        of{" "}
                        {course.lessonsData.length}{" "}
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
                          Lessons complete
                        </span>
                      )}

                      {passed && (
                        <span className="certificate-badge">
                          <Icon
                            name="award"
                            size={13}
                          />
                          Certificate earned
                        </span>
                      )}

                      {!passed && value >= 100 && (
                        <span className="test-badge">
                          Final test unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="learning-course-action">
                    <button
                      className="primary-button"
                      onClick={() => onStart(course)}
                    >
                      {passed
                        ? "Review course"
                        : value >= 100
                        ? "Take final test"
                        : value > 0
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
  const [activeLesson, setActiveLesson] = useState(0);
  const [showTest, setShowTest] = useState(
    (progress[course.id] || 0) >= 100
  );

  const [answers, setAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [score, setScore] = useState(0);

  const currentProgress = progress[course.id] || 0;

  const currentLesson =
    course.lessonsData[activeLesson];

  const testResult = testResults[course.id];

  useEffect(() => {
    if (currentProgress >= 100) {
      setShowTest(true);
    }
  }, [currentProgress]);

  const chooseAnswer = (questionIndex, answerIndex) => {
    if (submitted) return;

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answerIndex,
    }));
  };

  const submitTest = () => {
    let correct = 0;

    course.quiz.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct += 1;
      }
    });

    const percentage = Math.round(
      (correct / course.quiz.length) * 100
    );

    const passed = percentage >= 70;

    setScore(percentage);
    setSubmitted(true);

    onTestComplete(
      course.id,
      percentage,
      passed
    );
  };

  return (
    <div className="modal-backdrop learning-player-backdrop">
      <div className="learning-player">
        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-header">
            <div className="mini-brand">N</div>

            <div>
              <strong>NAJAF ACADEMY</strong>
              <span>Course player</span>
            </div>
          </div>

          <div className="player-course-title">
            <span>{course.category}</span>
            <h3>{course.title}</h3>
          </div>

          <div className="player-progress">
            <div>
              <span>Progress</span>
              <strong>{currentProgress}%</strong>
            </div>

            <div className="progress-bar">
              <span
                style={{
                  width: `${currentProgress}%`,
                }}
              />
            </div>
          </div>

          <div className="lesson-list">
            {course.lessonsData.map(
              (lesson, index) => {
                const lessonCompleted =
                  Math.round(
                    ((index + 1) /
                      course.lessonsData.length) *
                      100
                  ) <= currentProgress;

                return (
                  <button
                    key={lesson.title}
                    className={
                      activeLesson === index &&
                      !showTest
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setShowTest(false);
                      setActiveLesson(index);
                    }}
                  >
                    <span className="lesson-number">
                      {lessonCompleted ? (
                        <Icon
                          name="check"
                          size={14}
                        />
                      ) : (
                        index + 1
                      )}
                    </span>

                    <span>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.duration}</small>
                    </span>
                  </button>
                );
              }
            )}

            <button
              className={`final-test-link ${
                showTest ? "active" : ""
              }`}
              disabled={currentProgress < 100}
              onClick={() => {
                if (currentProgress >= 100) {
                  setShowTest(true);
                }
              }}
            >
              <span className="lesson-number">
                <Icon name="trophy" size={14} />
              </span>

              <span>
                <strong>Final assessment</strong>
                <small>
                  {currentProgress >= 100
                    ? "Unlocked"
                    : "Complete lessons first"}
                </small>
              </span>
            </button>
          </div>

          <button
            className="player-close-button"
            onClick={onClose}
          >
            <Icon name="close" size={17} />
            Exit course
          </button>
        </aside>

        <section className="player-main">
          <div className="player-topbar">
            <div>
              <span className="eyebrow">
                {showTest
                  ? "FINAL ASSESSMENT"
                  : `LESSON ${activeLesson + 1}`}
              </span>

              <h2>
                {showTest
                  ? "Test your knowledge"
                  : currentLesson.title}
              </h2>
            </div>

            <button
              className="player-x"
              onClick={onClose}
            >
              <Icon name="close" size={21} />
            </button>
          </div>

          {!showTest ? (
            <div className="lesson-view">
              <div className="lesson-video">
                <div className="video-glow"></div>

                <div className="video-play">
                  <Icon name="play" size={29} />
                </div>

                <span>
                  NAJAF ACADEMY · LEARNING VIDEO
                </span>
              </div>

              <div className="lesson-copy">
                <div>
                  <span className="course-category">
                    COURSE LESSON
                  </span>

                  <h1>{currentLesson.title}</h1>

                  <p>
                    Work through this lesson carefully.
                    Complete it to update your learning
                    progress and unlock the final
                    assessment.
                  </p>
                </div>

                <div className="lesson-objectives">
                  <div>
                    <Icon name="check" size={17} />
                    <span>
                      Practical concepts and examples
                    </span>
                  </div>

                  <div>
                    <Icon name="check" size={17} />
                    <span>
                      Career-focused learning outcome
                    </span>
                  </div>

                  <div>
                    <Icon name="check" size={17} />
                    <span>
                      Progress saved automatically
                    </span>
                  </div>
                </div>

                <div className="lesson-navigation">
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
                        course.lessonsData.length - 1
                      ) {
                        setActiveLesson(
                          (current) => current + 1
                        );
                      } else {
                        setShowTest(true);
                      }
                    }}
                  >
                    {activeLesson ===
                    course.lessonsData.length - 1
                      ? "Complete course"
                      : "Complete lesson"}

                    <Icon name="check" size={17} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="test-view">
              <div className="test-intro">
                <div className="test-icon">
                  <Icon name="trophy" size={30} />
                </div>

                <div>
                  <span className="eyebrow">
                    FINAL TEST
                  </span>

                  <h1>
                    Demonstrate what you learned.
                  </h1>

                  <p>
                    Answer all questions. You need at
                    least <strong>70%</strong> to pass and
                    unlock your completion certificate.
                  </p>
                </div>
              </div>

              <div className="test-rules">
                <span>5 questions</span>
                <span>70% pass mark</span>
                <span>Certificate after passing</span>
              </div>

              <div className="quiz-list">
                {course.quiz.map(
                  (question, questionIndex) => (
                    <article
                      className="quiz-question"
                      key={question.question}
                    >
                      <div className="question-number">
                        {String(
                          questionIndex + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="question-content">
                        <h3>
                          {question.question}
                        </h3>

                        <div className="quiz-options">
                          {question.options.map(
                            (option, optionIndex) => {
                              const selected =
                                answers[
                                  questionIndex
                                ] === optionIndex;

                              let stateClass = "";

                              if (submitted) {
                                if (
                                  optionIndex ===
                                  question.answer
                                ) {
                                  stateClass = "correct";
                                } else if (
                                  selected &&
                                  optionIndex !==
                                    question.answer
                                ) {
                                  stateClass = "wrong";
                                }
                              }

                              return (
                                <button
                                  key={option}
                                  className={`quiz-option ${
                                    selected
                                      ? "selected"
                                      : ""
                                  } ${stateClass}`}
                                  onClick={() =>
                                    chooseAnswer(
                                      questionIndex,
                                      optionIndex
                                    )
                                  }
                                  disabled={submitted}
                                >
                                  <span>
                                    {String.fromCharCode(
                                      65 +
                                        optionIndex
                                    )}
                                  </span>

                                  {option}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>

              {!submitted ? (
                <button
                  className="primary-button test-submit"
                  disabled={
                    Object.keys(answers).length !==
                    course.quiz.length
                  }
                  onClick={submitTest}
                >
                  Submit final test
                  <Icon
                    name="arrow"
                    size={17}
                  />
                </button>
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
                          : "close"
                      }
                      size={28}
                    />
                  </div>

                  <div>
                    <span>
                      {score >= 70
                        ? "TEST PASSED"
                        : "TEST NOT PASSED"}
                    </span>

                    <h2>{score}%</h2>

                    <p>
                      {score >= 70
                        ? "Excellent. Your completion certificate has been unlocked."
                        : "You need 70% to pass. Review the lessons and try the assessment again."}
                    </p>
                  </div>

                  {score < 70 && (
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setAnswers({});
                        setSubmitted(false);
                        setScore(0);
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
              )}

              {testResult?.passed && !submitted && (
                <div className="already-passed">
                  <Icon name="award" size={19} />

                  <span>
                    You previously passed this assessment
                    with {testResult.score}%.
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
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
        >
          <Icon name="close" size={22} />
        </button>

        <div className="course-hero-image">
          <img
            src={course.image}
            alt={course.title}
          />

          <div className="course-hero-overlay">
            <span>{course.category}</span>

            <h1>{course.title}</h1>

            <p>{course.description}</p>
          </div>
        </div>

        <div className="course-details-layout">
          <div className="course-details-main">
            <div className="course-meta-row">
              <span>
                <Icon name="star" size={15} />
                {course.rating}
              </span>

              <span>{course.students} learners</span>

              <span>{course.duration}</span>

              <span>{course.lessons} lessons</span>
            </div>

            <h2>What you'll learn</h2>

            <div className="skills-grid">
              {course.skills.map((skill) => (
                <div key={skill}>
                  <Icon name="check" size={16} />
                  {skill}
                </div>
              ))}
            </div>

            <h2>Course curriculum</h2>

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

          <aside className="course-buy-card">
            <span className="buy-eyebrow">
              COURSE ACCESS
            </span>

            <div className="buy-price">
              {formatPrice(course.price, currency)}

              <del>
                {formatPrice(
                  course.oldPrice,
                  currency
                )}
              </del>
            </div>

            <p>
              One-time purchase with lifetime course
              access and a purchase credential.
            </p>

            {isEnrolled ? (
              <>
                <div className="already-enrolled">
                  <Icon name="check" size={17} />

                  <span>
                    You're enrolled in this course.
                  </span>
                </div>

                <button
                  className="primary-button full"
                  onClick={() => {
                    onClose();
                    onStart(course);
                  }}
                >
                  {value >= 100
                    ? "Take final test"
                    : "Continue learning"}

                  <Icon
                    name="arrow"
                    size={17}
                  />
                </button>
              </>
            ) : (
              <button
                className="primary-button full"
                onClick={() => onBuy(course)}
              >
                Buy this course
                <Icon name="arrow" size={17} />
              </button>
            )}

            <button
              className={`secondary-button full ${
                wishlist.includes(course.id)
                  ? "wishlist-active"
                  : ""
              }`}
              onClick={() =>
                onWishlist(course.id)
              }
            >
              <Icon name="heart" size={17} />

              {wishlist.includes(course.id)
                ? "Saved to wishlist"
                : "Save to wishlist"}
            </button>

            <div className="buy-features">
              <div>
                <Icon name="check" size={16} />
                Lifetime access
              </div>

              <div>
                <Icon name="award" size={16} />
                Purchase credential
              </div>

              <div>
                <Icon name="trophy" size={16} />
                Final assessment
              </div>

              <div>
                <Icon name="download" size={16} />
                Completion certificate
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CHECKOUT
========================================================= */

function CheckoutModal({
  course,
  currency,
  onClose,
  onComplete,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
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
        >
          <Icon name="close" size={21} />
        </button>

        <div className="checkout-header">
          <span className="eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>Complete your enrollment.</h1>

          <p>
            This demo checkout creates a course purchase
            record and unlocks the learning experience.
          </p>
        </div>

        <div className="checkout-course">
          <img
            src={course.image}
            alt={course.title}
          />

          <div>
            <span>{course.category}</span>
            <strong>{course.title}</strong>

            <small>
              Lifetime access · {course.lessons} lessons
            </small>
          </div>

          <strong className="checkout-price">
            {formatPrice(course.price, currency)}
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
              <Icon name="check" size={17} />

              <div>
                <strong>Demo payment mode</strong>
                <span>
                  No real card information is requested
                  or stored.
                </span>
              </div>
            </div>
          </div>

          <button
            className="primary-button full"
            type="submit"
          >
            Confirm purchase
            <Icon name="arrow" size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   CERTIFICATES
========================================================= */

function CertificatesPage({
  certificates,
  completedCourses,
  onOpenCertificate,
}) {
  return (
    <main className="page">
      <section className="certificate-hero">
        <div className="container">
          <span className="eyebrow light">
            PROFESSIONAL CREDENTIALS
          </span>

          <h1>Your achievements, documented.</h1>

          <p>
            Purchase credentials and completion certificates
            live in your professional credential library.
          </p>
        </div>
      </section>

      <section className="container certificates-content">
        <div className="certificate-summary">
          <div>
            <span className="summary-icon">
              <Icon name="award" size={25} />
            </span>

            <div>
              <strong>
                {certificates.length}
              </strong>

              <span>Total credentials</span>
            </div>
          </div>

          <div>
            <span className="summary-icon">
              <Icon name="trophy" size={25} />
            </span>

            <div>
              <strong>
                {completedCourses.length}
              </strong>

              <span>Courses completed</span>
            </div>
          </div>

          <div>
            <span className="summary-icon">
              <Icon name="check" size={25} />
            </span>

            <div>
              <strong>
                {
                  certificates.filter(
                    (item) =>
                      item.type === "completion"
                  ).length
                }
              </strong>

              <span>Completion certificates</span>
            </div>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="certificate-empty">
            <div className="certificate-preview">
              <span>CERTIFICATE</span>

              <Icon name="award" size={32} />

              <h2>NAJAF ACADEMY</h2>

              <p>Your name</p>

              <div></div>
            </div>

            <div>
              <span className="eyebrow">
                YOUR CREDENTIAL LIBRARY
              </span>

              <h2>
                Your first certificate is waiting.
              </h2>

              <p>
                Purchase a course, complete all lessons and
                pass its final assessment to unlock your
                completion certificate.
              </p>
            </div>
          </div>
        ) : (
          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <article
                className="credential-card"
                key={certificate.id}
              >
                <div
                  className={`credential-paper ${
                    certificate.type === "completion"
                      ? "completion"
                      : "purchase"
                  }`}
                >
                  <span className="credential-label">
                    {certificate.type ===
                    "completion"
                      ? "CERTIFICATE OF COMPLETION"
                      : "COURSE PURCHASE CREDENTIAL"}
                  </span>

                  <div className="credential-seal">
                    <Icon name="award" size={25} />
                  </div>

                  <strong>NAJAF ACADEMY</strong>

                  <p>Presented to</p>

                  <h3>
                    {certificate.userName ||
                      "Najaf Learner"}
                  </h3>

                  <p>For</p>

                  <h4>
                    {certificate.courseTitle}
                  </h4>

                  <div className="credential-line"></div>

                  <small>
                    {new Date(
                      certificate.date
                    ).toLocaleDateString()}
                  </small>
                </div>

                <div className="credential-footer">
                  <div>
                    <strong>
                      {certificate.type ===
                      "completion"
                        ? "Completion certificate"
                        : "Purchase credential"}
                    </strong>

                    <span>
                      {certificate.id}
                    </span>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      onOpenCertificate(
                        certificate
                      )
                    }
                  >
                    <Icon
                      name="download"
                      size={16}
                    />
                    Print / Save
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   WISHLIST
========================================================= */

function WishlistPage({
  courses,
  wishlist,
  onWishlist,
  onOpen,
  currency,
}) {
  const saved = courses.filter((course) =>
    wishlist.includes(course.id)
  );

  return (
    <main className="page">
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">
            YOUR COLLECTION
          </span>

          <h1>Saved for later.</h1>

          <p>
            Keep interesting programs within reach.
          </p>
        </div>
      </section>

      <section className="container section">
        {saved.length ? (
          <div className="course-grid">
            {saved.map((course) => (
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
            <Icon name="heart" size={35} />

            <h2>Your wishlist is empty.</h2>

            <p>
              Save courses from Explore and they'll appear
              here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   BENGALURU ONLY
========================================================= */

function BengaluruPage() {
  return (
    <main className="page">
      <section className="map-hero">
        <div className="container">
          <span className="eyebrow light">
            ACADEMY LOCATION
          </span>

          <h1>Najaf Academy · Bengaluru</h1>

          <p>
            Our location is focused on Bengaluru,
            Karnataka, India.
          </p>
        </div>
      </section>

      <section className="container map-section">
        <div className="map-info-card">
          <span className="map-icon">
            <Icon name="map" size={27} />
          </span>

          <span className="eyebrow">
            BENGALURU, KARNATAKA
          </span>

          <h2>Learn from Bengaluru.</h2>

          <p>
            Najaf Academy's location section is intentionally
            limited to Bengaluru as requested.
          </p>

          <a
            className="primary-button map-link"
            href="https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20Karnataka%2C%20India"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps
            <Icon name="arrow" size={17} />
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
   AUTH
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
  const signup = mode === "signup";

  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <Icon name="close" size={21} />
        </button>

        <div className="auth-brand">
          <span className="brand-mark">N</span>

          <div>
            <strong>NAJAF ACADEMY</strong>
            <span>Professional learning</span>
          </div>
        </div>

        <span className="eyebrow">
          {signup ? "CREATE ACCOUNT" : "WELCOME BACK"}
        </span>

        <h1>
          {signup
            ? "Start your learning journey."
            : "Sign in to continue."}
        </h1>

        <p className="auth-description">
          Access your courses, progress and professional
          certificates.
        </p>

        <button
          className="google-button"
          type="button"
          onClick={onGoogle}
        >
          <strong>G</strong>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or continue with email</span>
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
            {signup ? "Create account" : "Sign in"}
            <Icon name="arrow" size={17} />
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
                signup ? "signin" : "signup"
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