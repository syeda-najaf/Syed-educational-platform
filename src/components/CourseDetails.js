import React, { useState } from "react";

function CourseDetails({ course, onBack, onEnroll }) {
  const [wishlist, setWishlist] = useState(false);

  if (!course) {
    return (
      <section className="page-section">
        <div className="empty-state">
          <div className="empty-icon">N</div>
          <h2>Course not found</h2>
          <p>The program you are looking for could not be found.</p>

          <button className="primary" onClick={onBack}>
            ← Back to Explore
          </button>
        </div>
      </section>
    );
  }

  const instructorName =
    course.instructor ||
    course.instructorName ||
    "Nexora Faculty";

  const learnerCount = Number(course.students || course.learners || 0);

  const initials = instructorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const modules = [
    {
      title: "Foundations & professional setup",
      lessons: 12,
    },
    {
      title: "Core concepts and workflows",
      lessons: 10,
    },
    {
      title: "Hands-on engineering projects",
      lessons: 10,
    },
    {
      title: "Advanced techniques",
      lessons: 10,
    },
    {
      title: "Production implementation",
      lessons: 10,
    },
    {
      title: "Capstone project",
      lessons: 18,
    },
  ];

  return (
    <section className="course-detail-page">

      <button className="back-button" onClick={onBack}>
        ← Back to programs
      </button>

      <div className="course-detail-hero">

        <div className="course-detail-main">

          <span className="eyebrow">
            {(course.category || "PROGRAM").toUpperCase()}
          </span>

          <h1>{course.title}</h1>

          <p className="course-description">
            {course.description}
          </p>

          <div className="course-rating-large">
            <strong>
              ★ {course.rating || "4.8"}
            </strong>

            <span>
              {learnerCount.toLocaleString()} learners
            </span>
          </div>

          <div className="course-detail-meta">

            <div>
              <span>Level</span>
              <strong>{course.level || "Professional"}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{course.duration || "12 weeks"}</strong>
            </div>

            <div>
              <span>Lessons</span>
              <strong>{course.lessons || 0}</strong>
            </div>

            <div>
              <span>Instructor</span>
              <strong>{instructorName}</strong>
            </div>

          </div>

        </div>

        <aside className="enrollment-card">

          <div className="course-preview">

            <div className="preview-glow"></div>

            <div className="preview-icon">
              {course.icon || "NX"}
            </div>

            <div className="preview-play">
              ▶
            </div>

            <span>COURSE PREVIEW</span>

          </div>

          <div className="enrollment-content">

            <div className="price-row">

              <strong>
                ${course.price || 0}
              </strong>

              {course.originalPrice && (
                <del>
                  ${course.originalPrice}
                </del>
              )}

              <span>one-time enrollment</span>

            </div>

            <button
              className="primary enroll-large"
              onClick={() => {
                if (typeof onEnroll === "function") {
                  onEnroll(course);
                }
              }}
            >
              Enroll now →
            </button>

            <button
              className={`wishlist-button ${
                wishlist ? "wishlisted" : ""
              }`}
              onClick={() => setWishlist(!wishlist)}
            >
              {wishlist ? "♥ Added to wishlist" : "♡ Add to wishlist"}
            </button>

            <div className="enrollment-note">
              ✓ Full lifetime access
            </div>

            <div className="enrollment-note">
              ✓ Professional certificate
            </div>

            <div className="enrollment-note">
              ✓ Hands-on projects
            </div>

            <div className="enrollment-note">
              ✓ Career resources
            </div>

          </div>

        </aside>

      </div>

      <div className="course-detail-grid">

        <main>

          <div className="detail-section">

            <span className="eyebrow">
              WHAT YOU'LL LEARN
            </span>

            <h2>
              Build skills that employers value.
            </h2>

            <div className="outcome-grid">

              {(course.outcomes || []).map(
                (outcome, index) => (
                  <div
                    className="outcome-item"
                    key={index}
                  >
                    <span>✓</span>
                    <p>{outcome}</p>
                  </div>
                )
              )}

            </div>

          </div>

          <div className="detail-section">

            <span className="eyebrow">
              CURRICULUM
            </span>

            <h2>Program structure</h2>

            <div className="curriculum-list">

              {modules.map((module, index) => (

                <div
                  className="curriculum-item"
                  key={module.title}
                >

                  <div className="module-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="module-info">
                    <strong>{module.title}</strong>

                    <span>
                      {module.lessons} lessons
                    </span>
                  </div>

                  <span className="module-arrow">
                    +
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="detail-section">

            <span className="eyebrow">
              SKILLS YOU'LL DEVELOP
            </span>

            <h2>Professional skill stack</h2>

            <div className="skill-tags">

              {(course.skills || []).map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </main>

        <aside className="course-side-panel">

          <div className="side-card">

            <span className="eyebrow">
              CAREER IMPACT
            </span>

            <h3>
              Designed for professional growth.
            </h3>

            <div className="impact-stat">
              <strong>94%</strong>

              <span>
                learner confidence improvement
              </span>
            </div>

            <div className="impact-stat">
              <strong>4.9/5</strong>

              <span>
                average learner rating
              </span>
            </div>

            <div className="impact-stat">
              <strong>87%</strong>

              <span>
                complete the capstone
              </span>
            </div>

          </div>

          <div className="side-card instructor-card">

            <span className="eyebrow">
              INSTRUCTOR
            </span>

            <div className="instructor-avatar">
              {initials}
            </div>

            <h3>{instructorName}</h3>

            <p>
              Industry professional and educator
              focused on practical technology skills.
            </p>

            <button className="text-button">
              View instructor profile →
            </button>

          </div>

        </aside>

      </div>

    </section>
  );
}

export default CourseDetails;