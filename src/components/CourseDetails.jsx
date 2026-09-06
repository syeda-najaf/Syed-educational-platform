import React, { useState } from "react";

function CourseDetails({
  course,
  onBack,
  onEnroll,
  wishlisted,
  onWishlist,
  enrolled,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openModule, setOpenModule] = useState(0);

  if (!course) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <h2>Course not found</h2>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Explore
          </button>
        </div>
      </section>
    );
  }

  const modules = [
    {
      title: "Introduction and foundations",
      lessons: 5,
      duration: "1h 40m",
      items: [
        "Welcome and course orientation",
        "Understanding the fundamentals",
        "Industry terminology",
        "Tools and professional workflow",
        "Knowledge check",
      ],
    },
    {
      title: "Core professional skills",
      lessons: 7,
      duration: "3h 15m",
      items: [
        "Core concepts",
        "Practical workflows",
        "Professional tools",
        "Real-world scenarios",
        "Hands-on exercise",
        "Assessment",
        "Module project",
      ],
    },
    {
      title: "Advanced applications",
      lessons: 6,
      duration: "3h 50m",
      items: [
        "Advanced concepts",
        "Architecture and strategy",
        "Problem solving",
        "Industry case study",
        "Practical challenge",
        "Final assessment",
      ],
    },
    {
      title: "Career project",
      lessons: 4,
      duration: "4h 20m",
      items: [
        "Project planning",
        "Build your project",
        "Review and improve",
        "Final submission",
      ],
    },
  ];

  return (
    <section className="course-details-page">
      <div className="course-details-hero">
        <div className="details-breadcrumb">
          <button onClick={onBack}>← Explore</button>
          <span>/</span>
          <span>{course.category}</span>
        </div>

        <div className="details-layout">
          <div className="details-copy">
            <span className="eyebrow">{course.category.toUpperCase()}</span>

            <h1>{course.title}</h1>

            <p className="details-description">{course.description}</p>

            <div className="details-rating">
              <strong>{course.rating}</strong>
              <span className="stars">★★★★★</span>
              <span>{course.reviews.toLocaleString()} reviews</span>
            </div>

            <p className="details-instructor">
              Created by <strong>{course.instructor}</strong>
            </p>

            <div className="details-stats">
              <span>◷ {course.duration}</span>
              <span>◉ {course.level}</span>
              <span>▣ {course.hours} hours</span>
              <span>✓ Certificate</span>
            </div>
          </div>

          <div className="enroll-card">
            <div
              className="details-cover"
              style={{
                background: `linear-gradient(135deg, ${course.color}, #111827)`,
              }}
            >
              <span>{course.icon}</span>
              <small>NEXORA PROFESSIONAL PROGRAM</small>
            </div>

            <div className="enroll-content">
              <div className="price-row">
                <strong>₹{course.price}</strong>
                <del>₹{course.oldPrice}</del>
                <span>38% off</span>
              </div>

              <p className="offer">
                🔥 Limited-time enrollment offer
              </p>

              <button
                className="btn btn-primary btn-block"
                onClick={() => onEnroll(course)}
              >
                {enrolled ? "Continue learning →" : "Enroll now →"}
              </button>

              <button
                className={`btn btn-block ${
                  wishlisted ? "btn-saved" : "btn-outline"
                }`}
                onClick={() => onWishlist(course.id)}
              >
                {wishlisted ? "♥ Saved to wishlist" : "♡ Save to wishlist"}
              </button>

              <div className="enroll-features">
                <span>✓ Full lifetime access</span>
                <span>✓ Certificate upon completion</span>
                <span>✓ Learn at your own pace</span>
                <span>✓ Mobile and desktop access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-main">
        <div className="details-content">
          <div className="details-tabs">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            <button
              className={activeTab === "curriculum" ? "active" : ""}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </button>

            <button
              className={activeTab === "skills" ? "active" : ""}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>

            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="details-tab-content">
              <h2>About this program</h2>

              <p>
                This professional learning program is designed to take you
                from core concepts to practical application. You'll develop
                skills through structured lessons, exercises and a final
                career-focused project.
              </p>

              <h3>What you'll learn</h3>

              <div className="learn-grid">
                {course.skills.map((skill) => (
                  <div key={skill}>
                    <span>✓</span>
                    {skill}
                  </div>
                ))}
              </div>

              <h3>Who this is for</h3>

              <p>
                This program is suitable for students, career changers,
                working professionals and anyone who wants a structured path
                into {course.category.toLowerCase()}.
              </p>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="curriculum">
              <h2>Course curriculum</h2>
              <p>
                {modules.length} modules · {course.hours} hours of learning
              </p>

              {modules.map((module, index) => (
                <div className="module" key={module.title}>
                  <button
                    className="module-header"
                    onClick={() =>
                      setOpenModule(openModule === index ? -1 : index)
                    }
                  >
                    <span className="module-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="module-info">
                      <strong>{module.title}</strong>
                      <small>
                        {module.lessons} lessons · {module.duration}
                      </small>
                    </span>

                    <span>{openModule === index ? "−" : "+"}</span>
                  </button>

                  {openModule === index && (
                    <div className="module-lessons">
                      {module.items.map((lesson, lessonIndex) => (
                        <div key={lesson}>
                          <span>{lessonIndex + 1}</span>
                          <p>{lesson}</p>
                          <small>
                            {lessonIndex % 2 === 0 ? "Video" : "Practice"}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="details-tab-content">
              <h2>Skills you'll gain</h2>

              <p>
                Complete this program to build a practical skill profile across
                the following areas.
              </p>

              <div className="skill-cloud">
                {course.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="career-outcome">
                <span>✦</span>
                <div>
                  <strong>Career outcome</strong>
                  <p>
                    Apply these skills to projects, portfolios and
                    professional opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews">
              <h2>Learner reviews</h2>

              <div className="review-summary">
                <strong>{course.rating}</strong>
                <div>
                  <span className="stars">★★★★★</span>
                  <small>{course.reviews.toLocaleString()} reviews</small>
                </div>
              </div>

              <Review
                name="Ayesha Khan"
                rating="5.0"
                text="The structure is excellent. The practical sections made the concepts much easier to understand."
              />

              <Review
                name="Rahul Mehta"
                rating="4.8"
                text="Very useful for building a professional foundation. I especially liked the project-based learning."
              />

              <Review
                name="Sarah Williams"
                rating="4.9"
                text="Clear explanations, strong curriculum and a very good learning experience."
              />
            </div>
          )}
        </div>

        <aside className="details-sidebar">
          <div className="sidebar-box">
            <span className="eyebrow">THIS PROGRAM INCLUDES</span>

            <ul>
              <li>✓ {course.hours} hours of content</li>
              <li>✓ Downloadable resources</li>
              <li>✓ Practice assessments</li>
              <li>✓ Certificate of completion</li>
              <li>✓ Lifetime access</li>
            </ul>
          </div>

          <div className="sidebar-box career-side-box">
            <span>✦</span>
            <strong>Career focused</strong>
            <p>
              Build skills designed around real professional requirements.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Review({ name, rating, text }) {
  return (
    <div className="review">
      <div className="review-avatar">{name.charAt(0)}</div>

      <div>
        <strong>{name}</strong>
        <div>
          <span className="stars">★★★★★</span>
          <small>{rating}</small>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CourseDetails;