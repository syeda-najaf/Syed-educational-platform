import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   NAJAF ACADEMY
   Premium Learning Platform
   ========================================================= */

const ACADEMY = "NAJAF ACADEMY";

const COURSES = [
  {
    id: 1,
    title: "Meta Front-End Developer",
    category: "Web Development",
    level: "Beginner",
    instructor: "Meta",
    rating: 4.8,
    learners: "212K",
    duration: "7 months",
    lessons: 142,
    price: 55,
    oldPrice: 85,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=90",
    description:
      "Master HTML, CSS, JavaScript, React and modern front-end development through practical projects.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
    ],
  },
  {
    id: 2,
    title: "Google Cybersecurity Professional Certificate",
    category: "Cybersecurity",
    level: "Beginner",
    instructor: "Google Career Certificates",
    rating: 4.9,
    learners: "186K",
    duration: "6 months",
    lessons: 128,
    price: 49,
    oldPrice: 79,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=90",
    description:
      "Build practical cybersecurity skills in Linux, Python, networks, security operations and incident response.",
    skills: [
      "Cybersecurity",
      "Python",
      "Linux",
      "SIEM",
      "Network Security",
      "Incident Response",
    ],
  },
  {
    id: 3,
    title: "Machine Learning Specialization",
    category: "AI & Machine Learning",
    level: "Intermediate",
    instructor: "DeepLearning.AI",
    rating: 4.8,
    learners: "94K",
    duration: "4 months",
    lessons: 96,
    price: 59,
    oldPrice: 89,
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1600&q=90",
    description:
      "Learn practical machine learning concepts and build intelligent applications with Python.",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Neural Networks",
      "Data",
      "AI",
    ],
  },
  {
    id: 4,
    title: "AWS Cloud Solutions Architecture",
    category: "Cloud Computing",
    level: "Intermediate",
    instructor: "AWS",
    rating: 4.9,
    learners: "76K",
    duration: "5 months",
    lessons: 110,
    price: 69,
    oldPrice: 99,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=90",
    description:
      "Understand cloud architecture, AWS services, security, scalability and deployment strategies.",
    skills: [
      "AWS",
      "Cloud",
      "Architecture",
      "Security",
      "DevOps",
      "Scalability",
    ],
  },
  {
    id: 5,
    title: "Python for Data Science",
    category: "Data Science",
    level: "Beginner",
    instructor: "Najaf Academy",
    rating: 4.7,
    learners: "58K",
    duration: "3 months",
    lessons: 82,
    price: 39,
    oldPrice: 65,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=90",
    description:
      "Learn Python, NumPy, Pandas, visualization and practical data analysis workflows.",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Data Analysis",
      "Visualization",
    ],
  },
  {
    id: 6,
    title: "Ethical Hacking & Penetration Testing",
    category: "Cybersecurity",
    level: "Intermediate",
    instructor: "Najaf Security Lab",
    rating: 4.9,
    learners: "43K",
    duration: "4 months",
    lessons: 105,
    price: 64,
    oldPrice: 95,
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=90",
    description:
      "Learn ethical hacking methodology, web security, reconnaissance and defensive testing.",
    skills: [
      "Ethical Hacking",
      "Web Security",
      "Linux",
      "Networking",
      "Burp Suite",
    ],
  },
];

const LESSONS = [
  "Welcome and course orientation",
  "Understanding the fundamentals",
  "Core concepts",
  "Hands-on practical lab",
  "Industry workflow",
  "Mini project",
  "Assessment",
  "Final project",
];

const CATEGORIES = [
  "All",
  "Web Development",
  "Cybersecurity",
  "AI & Machine Learning",
  "Cloud Computing",
  "Data Science",
];

const money = (value) => `$${value}`;

/* =========================================================
   STORAGE
   ========================================================= */

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in some browser modes.
  }
}

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
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
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
    heart: (
      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
    ),
    heartFill: (
      <path
        d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"
        fill="currentColor"
      />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    moon: (
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        <path d="m4.9 4.9 1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22Z" />
        <path d="M4 5.5v16M8 7h8M8 11h8" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12.5-1 8 4.5-2 4.5 2-1-8" />
      </>
    ),
    play: <path d="m9 6 9 6-9 6V6Z" fill="currentColor" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    map: (
      <>
        <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
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
        <path d="M10 17l5-5-5-5M15 12H3M21 4v16" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3L12 3Z" />
        <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
  };

  return <svg {...props}>{icons[name] || icons.info}</svg>;
}

/* =========================================================
   COURSE CARD
   ========================================================= */

function CourseCard({
  course,
  wishlist,
  onWishlist,
  onOpen,
  onPreview,
}) {
  const saved = wishlist.includes(course.id);

  return (
    <article className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />

        <span className="level-badge">{course.level}</span>

        <button
          className={`heart-button ${saved ? "saved" : ""}`}
          onClick={() => onWishlist(course)}
          aria-label="Toggle wishlist"
        >
          <Icon name={saved ? "heartFill" : "heart"} size={18} />
        </button>

        <button
          className="preview-button"
          onClick={() => onPreview(course)}
        >
          <Icon name="play" size={15} />
          Preview
        </button>
      </div>

      <div className="course-card-content">
        <span className="course-category">{course.category}</span>

        <button
          className="course-card-title"
          onClick={() => onOpen(course)}
        >
          {course.title}
        </button>

        <p>{course.description}</p>

        <div className="rating">
          <strong>{course.rating}</strong>
          <span>★★★★★</span>
          <small>{course.learners} learners</small>
        </div>

        <div className="card-meta">
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
        </div>

        <div className="card-bottom">
          <div>
            <strong>{money(course.price)}</strong>
            <del>{money(course.oldPrice)}</del>
          </div>

          <button
            className="small-button"
            onClick={() => onOpen(course)}
          >
            View course
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   HOME
   ========================================================= */

function Home({
  onExplore,
  onOpen,
  wishlist,
  onWishlist,
  onPreview,
}) {
  return (
    <main>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">NAJAF ACADEMY</span>

            <h1>
              Learn skills.
              <br />
              <em>Build your future.</em>
            </h1>

            <p>
              Professional online courses, practical projects and
              career-focused credentials for the modern learner.
            </p>

            <div className="hero-buttons">
              <button className="primary-button" onClick={onExplore}>
                Explore courses
                <Icon name="arrow" size={18} />
              </button>

              <button className="secondary-button" onClick={onExplore}>
                Start learning
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500K+</strong>
                <span>Learners</span>
              </div>
              <div>
                <strong>120+</strong>
                <span>Countries</span>
              </div>
              <div>
                <strong>95%</strong>
                <span>Positive rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=90"
              alt="Students learning"
            />

            <div className="floating-card">
              <div className="floating-icon">
                <Icon name="award" size={22} />
              </div>
              <div>
                <strong>Career credentials</strong>
                <span>Build proof of your skills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">POPULAR NOW</span>
              <h2>Courses built for real careers.</h2>
            </div>

            <button className="text-button" onClick={onExplore}>
              Explore all
              <Icon name="arrow" size={16} />
            </button>
          </div>

          <div className="course-grid">
            {COURSES.slice(0, 4).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                wishlist={wishlist}
                onWishlist={onWishlist}
                onOpen={onOpen}
                onPreview={onPreview}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="dark-banner">
        <div className="container dark-banner-inner">
          <div>
            <span className="eyebrow light">LEARN WITH PURPOSE</span>
            <h2>One platform. Thousands of possibilities.</h2>
            <p>
              Build technical skills, complete practical projects and
              collect professional learning credentials.
            </p>
          </div>

          <button className="white-button" onClick={onExplore}>
            Find your course
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COURSES PAGE
   ========================================================= */

function Courses({
  wishlist,
  onWishlist,
  onOpen,
  onPreview,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let result = COURSES.filter((course) => {
      const text =
        `${course.title} ${course.category} ${course.instructor}`.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (category === "All" || course.category === category)
      );
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  return (
    <main>
      <section className="page-heading">
        <div className="container">
          <span className="eyebrow">EXPLORE</span>
          <h1>Find your next skill.</h1>
          <p>
            Browse professional courses across technology and future-focused
            disciplines.
          </p>
        </div>
      </section>

      <section className="container courses-section">
        <div className="course-toolbar">
          <div className="search-input">
            <Icon name="search" size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, skills or instructors..."
            />
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="rating">Highest rated</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
          </select>
        </div>

        <div className="category-row">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="results-line">
          <strong>{filtered.length} courses</strong>
          <span>Learn at your own pace</span>
        </div>

        {filtered.length ? (
          <div className="course-grid">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                wishlist={wishlist}
                onWishlist={onWishlist}
                onOpen={onOpen}
                onPreview={onPreview}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={32} />
            <h2>No courses found</h2>
            <p>Try another search term or category.</p>
            <button
              className="secondary-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
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
   COURSE DETAILS
   ========================================================= */

function CourseModal({
  course,
  onClose,
  onBuy,
  onWishlist,
  wishlist,
  enrolled,
  progress,
  onProgress,
}) {
  const isSaved = wishlist.includes(course.id);
  const isEnrolled = enrolled.includes(course.id);
  const currentProgress = progress[course.id] || 0;

  const startCourse = () => {
    if (!isEnrolled) {
      onBuy(course);
    } else {
      onProgress(course.id, Math.min(100, currentProgress + 10));
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="course-detail-modal">
        <button className="close-button" onClick={onClose}>
          <Icon name="close" size={21} />
        </button>

        <div className="course-detail-hero">
          <img src={course.image} alt={course.title} />

          <div className="hero-overlay" />

          <div className="course-hero-content">
            <span>{course.category}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </div>
        </div>

        <div className="course-stat-strip">
          <span>
            <b>★ {course.rating}</b>
          </span>
          <span>{course.learners} learners</span>
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
        </div>

        <div className="course-detail-layout">
          <div className="course-main-content">
            <section>
              <h2>What you'll learn</h2>

              <div className="learning-grid">
                {course.skills.map((skill) => (
                  <div className="learning-item" key={skill}>
                    <Icon name="check" size={16} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="curriculum">
              <h2>Course curriculum</h2>

              <div className="lesson-list">
                {LESSONS.map((lesson, index) => {
                  const unlocked =
                    isEnrolled &&
                    index <= Math.ceil(currentProgress / 15);

                  return (
                    <div className="lesson-row" key={lesson}>
                      <span className="lesson-number">
                        {index + 1}
                      </span>

                      <div>
                        <strong>{lesson}</strong>
                        <small>
                          {unlocked ? "Available" : "Included with purchase"}
                        </small>
                      </div>

                      <Icon
                        name={unlocked ? "play" : "lock"}
                        size={16}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="course-access-card">
            <span className="access-label">COURSE ACCESS</span>

            <div className="price-line">
              <strong>{money(course.price)}</strong>
              <del>{money(course.oldPrice)}</del>
            </div>

            <p className="price-description">
              One-time course purchase with lifetime access and a
              purchase credential.
            </p>

            {isEnrolled && (
              <div className="enrolled-box">
                <Icon name="check" size={17} />
                <div>
                  <strong>You're enrolled</strong>
                  <span>{currentProgress}% complete</span>
                </div>
              </div>
            )}

            <button
              className="primary-button full"
              onClick={startCourse}
            >
              {isEnrolled ? "Continue learning" : "Buy this course"}
              <Icon name="arrow" size={18} />
            </button>

            <button
              className="secondary-button full"
              onClick={() => onWishlist(course)}
            >
              <Icon
                name={isSaved ? "heartFill" : "heart"}
                size={17}
              />
              {isSaved ? "Remove from wishlist" : "Save to wishlist"}
            </button>

            <div className="access-benefits">
              <span>
                <Icon name="check" size={15} />
                Lifetime access
              </span>

              <span>
                <Icon name="award" size={15} />
                Purchase credential
              </span>

              <span>
                <Icon name="award" size={15} />
                Completion certificate
              </span>
            </div>

            {isEnrolled && (
              <div className="modal-progress">
                <div>
                  <span>Your progress</span>
                  <strong>{currentProgress}%</strong>
                </div>

                <div className="progress-bar">
                  <span style={{ width: `${currentProgress}%` }} />
                </div>

                <button
                  className="progress-button"
                  onClick={() =>
                    onProgress(
                      course.id,
                      Math.min(100, currentProgress + 10)
                    )
                  }
                >
                  Mark next lesson complete
                </button>
              </div>
            )}
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
  user,
  onClose,
  onConfirm,
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [method, setMethod] = useState("upi");

  const submit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    onConfirm({
      name: name.trim(),
      email: email.trim(),
      method,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="checkout-modal">
        <button className="close-button" onClick={onClose}>
          <Icon name="close" />
        </button>

        <div className="checkout-title">
          <span className="eyebrow">SECURE CHECKOUT</span>
          <h2>Complete your purchase.</h2>
          <p>
            Confirm your details to activate lifetime access.
          </p>
        </div>

        <div className="checkout-layout">
          <form onSubmit={submit} className="checkout-form">
            <label>
              Full name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <div className="payment-selector">
              <span>Payment method</span>

              <div className="payment-options">
                {["upi", "card", "paypal"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={method === item ? "active" : ""}
                    onClick={() => setMethod(item)}
                  >
                    {item === "upi" && "UPI"}
                    {item === "card" && "💳 Card"}
                    {item === "paypal" && "PayPal"}
                  </button>
                ))}
              </div>
            </div>

            {method === "card" && (
              <>
                <label>
                  Card number
                  <input
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                  />
                </label>

                <div className="two-inputs">
                  <label>
                    Expiry
                    <input placeholder="MM/YY" />
                  </label>

                  <label>
                    CVC
                    <input placeholder="123" />
                  </label>
                </div>
              </>
            )}

            {method === "upi" && (
              <label>
                UPI ID
                <input placeholder="yourname@upi" />
              </label>
            )}

            {method === "paypal" && (
              <div className="payment-note">
                PayPal can be connected to your merchant account.
              </div>
            )}

            <button className="primary-button full" type="submit">
              Confirm purchase
              <Icon name="arrow" size={18} />
            </button>

            <small className="demo-payment">
              Demo checkout. Connect Razorpay, Stripe or PayPal for
              real payment processing.
            </small>
          </form>

          <div className="order-summary">
            <span>YOUR COURSE</span>
            <img src={course.image} alt="" />
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>

            <div className="summary-line">
              <span>Course access</span>
              <strong>{money(course.price)}</strong>
            </div>

            <div className="summary-line">
              <span>Lifetime access</span>
              <strong>Included</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>{money(course.price)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PREVIEW
   ========================================================= */

function PreviewModal({ course, onClose, onBuy }) {
  return (
    <div className="modal-backdrop">
      <div className="preview-modal">
        <button className="close-button" onClick={onClose}>
          <Icon name="close" />
        </button>

        <div className="preview-image">
          <img src={course.image} alt={course.title} />

          <div>
            <div className="big-play">
              <Icon name="play" size={27} />
            </div>
            <span>COURSE PREVIEW</span>
          </div>
        </div>

        <div className="preview-content">
          <span className="eyebrow">{course.category}</span>
          <h2>{course.title}</h2>
          <p>{course.description}</p>

          <button
            className="primary-button"
            onClick={() => onBuy(course)}
          >
            Get full course
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LEARNING
   ========================================================= */

function Learning({
  enrolled,
  progress,
  onOpen,
}) {
  const courses = COURSES.filter((course) =>
    enrolled.includes(course.id)
  );

  return (
    <main>
      <section className="page-heading dark">
        <div className="container">
          <span className="eyebrow light">MY LEARNING</span>
          <h1>Your learning dashboard.</h1>
          <p>Continue your courses and track your progress.</p>
        </div>
      </section>

      <section className="container dashboard">
        <div className="dashboard-stats">
          <div>
            <span>Enrolled</span>
            <strong>{courses.length}</strong>
          </div>

          <div>
            <span>In progress</span>
            <strong>
              {
                courses.filter(
                  (course) =>
                    (progress[course.id] || 0) > 0 &&
                    (progress[course.id] || 0) < 100
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {
                courses.filter(
                  (course) => (progress[course.id] || 0) >= 100
                ).length
              }
            </strong>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="empty-state">
            <Icon name="book" size={32} />
            <h2>No courses yet.</h2>
            <p>Purchase a course to start learning.</p>
          </div>
        ) : (
          <div className="learning-list">
            {courses.map((course) => {
              const value = progress[course.id] || 0;

              return (
                <article className="learning-card" key={course.id}>
                  <img src={course.image} alt="" />

                  <div>
                    <span className="course-category">
                      {course.category}
                    </span>

                    <h2>{course.title}</h2>
                    <p>{course.instructor}</p>

                    <div className="progress-line">
                      <div>
                        <span style={{ width: `${value}%` }} />
                      </div>
                      <strong>{value}%</strong>
                    </div>

                    <small>
                      {value >= 100
                        ? "Course completed"
                        : "Continue your learning journey"}
                    </small>
                  </div>

                  <button
                    className="primary-button"
                    onClick={() => onOpen(course)}
                  >
                    {value >= 100 ? "Review" : "Continue"}
                    <Icon name="arrow" size={17} />
                  </button>
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
   WISHLIST
   ========================================================= */

function Wishlist({
  wishlist,
  onWishlist,
  onOpen,
  onPreview,
}) {
  const courses = COURSES.filter((course) =>
    wishlist.includes(course.id)
  );

  return (
    <main>
      <section className="page-heading">
        <div className="container">
          <span className="eyebrow">YOUR SHORTLIST</span>
          <h1>Wishlist.</h1>
          <p>Keep interesting courses close while you decide.</p>
        </div>
      </section>

      <section className="container courses-section">
        {courses.length ? (
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                wishlist={wishlist}
                onWishlist={onWishlist}
                onOpen={onOpen}
                onPreview={onPreview}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="heart" size={32} />
            <h2>Your wishlist is empty.</h2>
            <p>Tap the heart on a course to save it here.</p>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   CERTIFICATES
   ========================================================= */

function Certificates({
  purchases,
  completed,
  onPrint,
}) {
  const purchasedCourses = COURSES.filter((course) =>
    purchases.some((item) => item.courseId === course.id)
  );

  const completedCourses = COURSES.filter((course) =>
    completed.includes(course.id)
  );

  return (
    <main>
      <section className="page-heading dark">
        <div className="container">
          <span className="eyebrow light">
            PROFESSIONAL CREDENTIALS
          </span>
          <h1>Your certificates.</h1>
          <p>
            Purchase credentials and completion certificates in one
            place.
          </p>
        </div>
      </section>

      <section className="container certificate-page">
        <div className="credential-info">
          <div className="credential-icon">
            <Icon name="award" size={27} />
          </div>

          <div>
            <h2>Certificate center</h2>
            <p>
              A purchase credential confirms course access. A
              completion certificate is unlocked after completing the
              course.
            </p>
          </div>
        </div>

        <h2 className="certificate-heading">
          Purchase credentials
        </h2>

        {purchasedCourses.length ? (
          <div className="certificate-grid">
            {purchasedCourses.map((course) => {
              const purchase = purchases.find(
                (item) => item.courseId === course.id
              );

              return (
                <div className="certificate-card" key={course.id}>
                  <div className="purchase-certificate">
                    <div className="certificate-top">
                      <span>{ACADEMY}</span>
                      <Icon name="award" size={24} />
                    </div>

                    <div className="certificate-center">
                      <small>PURCHASE CREDENTIAL</small>
                      <h3>Purchase Confirmed</h3>

                      <p>This certifies that</p>

                      <strong>
                        {purchase?.name || "Najaf Academy Learner"}
                      </strong>

                      <p>has purchased access to</p>

                      <h4>{course.title}</h4>

                      <div className="certificate-id">
                        <span>Credential ID</span>
                        <strong>{purchase?.id}</strong>
                      </div>
                    </div>

                    <div className="certificate-bottom">
                      <span>Verified purchase</span>
                      <span>{purchase?.date}</span>
                    </div>
                  </div>

                  <button
                    className="secondary-button full"
                    onClick={() =>
                      onPrint(
                        "Purchase Credential",
                        course.title,
                        purchase?.id
                      )
                    }
                  >
                    <Icon name="download" size={16} />
                    Print / Save PDF
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state small">
            <Icon name="cart" size={29} />
            <h3>No purchases yet.</h3>
            <p>Purchase a course to receive your credential.</p>
          </div>
        )}

        <h2 className="certificate-heading completion-title">
          Completion certificates
        </h2>

        {completedCourses.length ? (
          <div className="certificate-grid">
            {completedCourses.map((course) => (
              <div className="certificate-card" key={course.id}>
                <div className="completion-certificate">
                  <div className="completion-inner">
                    <span>CERTIFICATE OF COMPLETION</span>

                    <div className="certificate-seal">
                      <Icon name="award" size={28} />
                    </div>

                    <h2>{ACADEMY}</h2>

                    <p>This certificate is proudly presented to</p>

                    <h3>Academy Learner</h3>

                    <p>for successfully completing</p>

                    <h4>{course.title}</h4>

                    <div className="signature">
                      NAJAF ACADEMY
                      <small>Professional Learning Credential</small>
                    </div>
                  </div>
                </div>

                <button
                  className="secondary-button full"
                  onClick={() =>
                    onPrint(
                      "Certificate of Completion",
                      course.title,
                      `NAJAF-COMP-${course.id}`
                    )
                  }
                >
                  <Icon name="download" size={16} />
                  Print / Save PDF
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="locked-certificate">
            <Icon name="lock" size={23} />
            <div>
              <strong>Completion certificate locked</strong>
              <span>
                Finish 100% of an enrolled course to unlock it.
              </span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   MAP
   ========================================================= */

function MapPage() {
  return (
    <main>
      <section className="page-heading">
        <div className="container">
          <span className="eyebrow">LOCATION</span>
          <h1>Najaf Academy Bengaluru.</h1>
          <p>
            Our academy location is restricted to Bengaluru only.
          </p>
        </div>
      </section>

      <section className="container map-section">
        <div className="map-information">
          <span className="eyebrow">BENGALURU ONLY</span>

          <h2>Find us in Bengaluru.</h2>

          <p>
            Najaf Academy learning support and academy information
            are centered in Bengaluru.
          </p>

          <div className="location-box">
            <Icon name="map" size={22} />
            <div>
              <strong>Bengaluru, Karnataka</strong>
              <span>India</span>
            </div>
          </div>

          <a
            className="primary-button full"
            href="https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20Karnataka"
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps
            <Icon name="arrow" size={17} />
          </a>
        </div>

        <div className="map-frame">
          <iframe
            title="Najaf Academy Bengaluru"
            src="https://www.google.com/maps?q=Bengaluru%2C%20Karnataka&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   AUTH
   ========================================================= */

function AuthModal({ onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    onLogin({
      name: name.trim(),
      email: email.trim(),
      provider: "email",
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          <Icon name="close" />
        </button>

        <div className="auth-brand">N</div>

        <span className="eyebrow">WELCOME BACK</span>

        <h2>Sign in to Najaf Academy.</h2>

        <p>
          Access your learning dashboard, certificates and wishlist.
        </p>

        <form onSubmit={submit}>
          <label>
            Your name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
            />
          </label>

          <button className="primary-button full" type="submit">
            Continue
            <Icon name="arrow" size={17} />
          </button>
        </form>

        <div className="google-note">
          <strong>Google / Gmail login</strong>
          <span>
            Connect Google Identity Services or Firebase Auth for
            production Google account authentication.
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AI
   ========================================================= */

function AIAssistant({ onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hi! I can help you choose a course, understand the curriculum or plan your learning path."
  );

  const ask = () => {
    const q = question.toLowerCase();

    if (q.includes("cyber")) {
      setAnswer(
        "For cybersecurity, start with the Google Cybersecurity Professional Certificate and then move into Ethical Hacking & Penetration Testing."
      );
    } else if (q.includes("react") || q.includes("web")) {
      setAnswer(
        "The Meta Front-End Developer course is the best match for HTML, CSS, JavaScript, React and responsive web development."
      );
    } else if (q.includes("machine") || q.includes("ai")) {
      setAnswer(
        "The Machine Learning Specialization is a strong path for Python, machine learning and AI fundamentals."
      );
    } else {
      setAnswer(
        "Tell me whether your goal is Web Development, Cybersecurity, AI/ML, Cloud or Data Science and I will suggest a learning path."
      );
    }

    setQuestion("");
  };

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <div>
          <span>
            <Icon name="sparkles" size={17} />
            NAJAF AI
          </span>
          <strong>Learning assistant</strong>
        </div>

        <button onClick={onClose}>
          <Icon name="close" size={17} />
        </button>
      </div>

      <div className="ai-answer">
        {answer}
      </div>

      <div className="ai-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") ask();
          }}
          placeholder="Ask about courses..."
        />

        <button onClick={ask}>
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [page, setPage] = useState(
    window.location.pathname.replace("/", "") || "home"
  );

  const [theme, setTheme] = useState(
    read("najafTheme", "light")
  );

  const [wishlist, setWishlist] = useState(
    read("najafWishlist", [])
  );

  const [enrolled, setEnrolled] = useState(
    read("najafEnrolled", [])
  );

  const [progress, setProgress] = useState(
    read("najafProgress", {})
  );

  const [purchases, setPurchases] = useState(
    read("najafPurchases", [])
  );

  const [user, setUser] = useState(
    read("najafUser", null)
  );

  const [notifications, setNotifications] = useState(
    read("najafNotifications", [])
  );

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save("najafTheme", theme);
  }, [theme]);

  useEffect(() => save("najafWishlist", wishlist), [wishlist]);
  useEffect(() => save("najafEnrolled", enrolled), [enrolled]);
  useEffect(() => save("najafProgress", progress), [progress]);
  useEffect(() => save("najafPurchases", purchases), [purchases]);
  useEffect(() => save("najafUser", user), [user]);
  useEffect(
    () => save("najafNotifications", notifications),
    [notifications]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCourse(null);
        setCheckoutCourse(null);
        setPreviewCourse(null);
        setShowAuth(false);
        setShowAI(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (target) => {
    setPage(target);
    setShowMobileMenu(false);
    setShowNotifications(false);
    setShowProfile(false);

    window.history.pushState({}, "", `/${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (course) => {
    setWishlist((current) =>
      current.includes(course.id)
        ? current.filter((id) => id !== course.id)
        : [...current, course.id]
    );
  };

  const beginPurchase = (course) => {
    setSelectedCourse(null);
    setPreviewCourse(null);

    if (enrolled.includes(course.id)) {
      setSelectedCourse(course);
      return;
    }

    setCheckoutCourse(course);
  };

  const completePurchase = ({ name, email, method }) => {
    const course = checkoutCourse;

    if (!course) return;

    const id = `NAJAF-${Date.now().toString(36).toUpperCase()}`;

    const purchase = {
      id,
      courseId: course.id,
      name,
      email,
      method,
      date: new Date().toLocaleDateString("en-IN"),
    };

    setPurchases((current) => [purchase, ...current]);

    setEnrolled((current) =>
      current.includes(course.id)
        ? current
        : [...current, course.id]
    );

    setProgress((current) => ({
      ...current,
      [course.id]: current[course.id] || 0,
    }));

    setNotifications((current) => [
      {
        id: Date.now(),
        title: "Purchase confirmed",
        text: `${course.title} is now in My Learning.`,
      },
      {
        id: Date.now() + 1,
        title: "Purchase credential created",
        text: "Your credential is ready in Certificates.",
      },
      ...current,
    ]);

    setCheckoutCourse(null);

    alert(
      "Purchase successful!\n\nYour course is now active and your purchase credential has been created."
    );

    navigate("learning");
  };

  const updateProgress = (courseId, value) => {
    setProgress((current) => ({
      ...current,
      [courseId]: value,
    }));

    if (value >= 100) {
      setNotifications((current) => [
        {
          id: Date.now(),
          title: "Course completed",
          text: "Your completion certificate is now available.",
        },
        ...current,
      ]);

      alert(
        "Congratulations! Course completed.\n\nYour completion certificate is now available."
      );
    }
  };

  const printCertificate = (type, title, id) => {
    const learner =
      user?.name ||
      purchases.find((p) => p.id === id)?.name ||
      "Najaf Academy Learner";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${type}</title>
        <style>
          body {
            margin:0;
            padding:40px;
            background:#f4f0e8;
            font-family:Arial,sans-serif;
            color:#182230;
          }
          .certificate {
            max-width:900px;
            margin:0 auto;
            padding:70px;
            background:white;
            border:12px solid #162033;
            text-align:center;
          }
          .academy {
            letter-spacing:5px;
            font-size:14px;
            font-weight:bold;
          }
          .label {
            margin-top:60px;
            letter-spacing:4px;
            font-size:13px;
          }
          h1 {
            font-family:Georgia,serif;
            font-size:48px;
            margin:20px 0;
          }
          .learner {
            font-family:Georgia,serif;
            font-size:32px;
            margin:25px;
          }
          h2 {
            font-size:24px;
            max-width:700px;
            margin:25px auto;
          }
          .id {
            margin-top:60px;
            font-size:12px;
            letter-spacing:2px;
          }
          @media print {
            body { padding:0; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="academy">NAJAF ACADEMY</div>
          <div class="label">${type.toUpperCase()}</div>
          <h1>${type}</h1>
          <p>This certificate is presented to</p>
          <div class="learner">${learner}</div>
          <p>for</p>
          <h2>${title}</h2>
          <div class="id">CREDENTIAL ID: ${id || "NAJAF-CREDENTIAL"}</div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    const popup = window.open("", "_blank");

    if (!popup) {
      alert("Please allow pop-ups to print your certificate.");
      return;
    }

    popup.document.open();
    popup.document.write(html);
    popup.document.close();
  };

  const completed = enrolled.filter(
    (id) => (progress[id] || 0) >= 100
  );

  let content;

  if (page === "courses") {
    content = (
      <Courses
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onOpen={setSelectedCourse}
        onPreview={setPreviewCourse}
      />
    );
  } else if (page === "learning") {
    content = (
      <Learning
        enrolled={enrolled}
        progress={progress}
        onOpen={setSelectedCourse}
      />
    );
  } else if (page === "wishlist") {
    content = (
      <Wishlist
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onOpen={setSelectedCourse}
        onPreview={setPreviewCourse}
      />
    );
  } else if (page === "certificates") {
    content = (
      <Certificates
        purchases={purchases}
        completed={completed}
        onPrint={printCertificate}
      />
    );
  } else if (page === "map") {
    content = <MapPage />;
  } else {
    content = (
      <Home
        onExplore={() => navigate("courses")}
        onOpen={setSelectedCourse}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onPreview={setPreviewCourse}
      />
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => navigate("home")}
          >
            <span className="brand-mark">N</span>

            <span>
              <strong>NAJAF ACADEMY</strong>
              <small>GLOBAL LEARNING PLATFORM</small>
            </span>
          </button>

          <nav className={`main-nav ${showMobileMenu ? "open" : ""}`}>
            {[
              ["home", "Home"],
              ["courses", "Explore"],
              ["learning", "My Learning"],
              ["wishlist", "Wishlist"],
              ["certificates", "Certificates"],
              ["map", "Bengaluru"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={page === key ? "active" : ""}
                onClick={() => navigate(key)}
              >
                {label}

                {key === "wishlist" &&
                  wishlist.length > 0 && (
                    <span className="nav-count">
                      {wishlist.length}
                    </span>
                  )}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              title="Toggle theme"
              onClick={() =>
                setTheme((current) =>
                  current === "light" ? "dark" : "light"
                )
              }
            >
              <Icon
                name={theme === "light" ? "moon" : "sun"}
                size={19}
              />
            </button>

            <button
              className="icon-button notification-button"
              title="Notifications"
              onClick={() => {
                setShowNotifications((v) => !v);
                setShowProfile(false);
              }}
            >
              <Icon name="bell" size={19} />

              {notifications.length > 0 && (
                <span className="notification-dot">
                  {notifications.length}
                </span>
              )}
            </button>

            {user ? (
              <button
                className="avatar"
                onClick={() => {
                  setShowProfile((v) => !v);
                  setShowNotifications(false);
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                className="login-button"
                onClick={() => setShowAuth(true)}
              >
                Sign in
              </button>
            )}

            <button
              className="mobile-menu"
              onClick={() =>
                setShowMobileMenu((v) => !v)
              }
            >
              <Icon name="menu" size={21} />
            </button>
          </div>

          {showNotifications && (
            <div className="dropdown notification-menu">
              <strong>Notifications</strong>

              {notifications.length === 0 ? (
                <p>No new notifications.</p>
              ) : (
                notifications.slice(0, 5).map((item) => (
                  <div className="notification-item" key={item.id}>
                    <span>{item.title}</span>
                    <small>{item.text}</small>
                  </div>
                ))
              )}

              {notifications.length > 0 && (
                <button
                  className="clear-notifications"
                  onClick={() => setNotifications([])}
                >
                  Clear notifications
                </button>
              )}
            </div>
          )}

          {showProfile && user && (
            <div className="dropdown profile-menu">
              <div className="profile-heading">
                <div className="avatar large">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <button onClick={() => navigate("learning")}>
                <Icon name="book" size={16} />
                My Learning
              </button>

              <button onClick={() => navigate("certificates")}>
                <Icon name="award" size={16} />
                Certificates
              </button>

              <button
                onClick={() => {
                  setUser(null);
                  setShowProfile(false);
                }}
              >
                <Icon name="logout" size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {content}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <span>N</span>
              <strong>NAJAF ACADEMY</strong>
            </div>

            <p>
              Professional learning for technology, careers and
              the future.
            </p>
          </div>

          <div>
            <h4>Platform</h4>
            <button onClick={() => navigate("courses")}>
              Courses
            </button>
            <button onClick={() => navigate("learning")}>
              My Learning
            </button>
            <button onClick={() => navigate("certificates")}>
              Certificates
            </button>
          </div>

          <div>
            <h4>Location</h4>
            <button onClick={() => navigate("map")}>
              Bengaluru
            </button>
            <a href="mailto:support@najafacademy.com">
              <Icon name="mail" size={15} />
              Email support
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Najaf Academy. All rights
          reserved.
        </div>
      </footer>

      <button
        className="ai-floating"
        onClick={() => setShowAI((v) => !v)}
      >
        <Icon name="sparkles" size={20} />
        Najaf AI
      </button>

      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onBuy={beginPurchase}
          onWishlist={toggleWishlist}
          wishlist={wishlist}
          enrolled={enrolled}
          progress={progress}
          onProgress={updateProgress}
        />
      )}

      {previewCourse && (
        <PreviewModal
          course={previewCourse}
          onClose={() => setPreviewCourse(null)}
          onBuy={beginPurchase}
        />
      )}

      {checkoutCourse && (
        <CheckoutModal
          course={checkoutCourse}
          user={user}
          onClose={() => setCheckoutCourse(null)}
          onConfirm={completePurchase}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={(account) => {
            setUser(account);
            setShowAuth(false);
            alert(`Welcome to ${ACADEMY}, ${account.name}!`);
          }}
        />
      )}
    </div>
  );
}