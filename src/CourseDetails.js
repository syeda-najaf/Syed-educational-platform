javascript
import React from "react";

function CourseDetails({
  course,
  enrolled,
  onBack,
  onEnroll,
}) {
  if (!course) {
    return (
      <main className="page-container">
        <button onClick={onBack}>← Back</button>
        <h1>Course not found</h1>
      </main>
    );
  }

  return (
    <main className="course-details-page">
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to courses
      </button>

      <section className="course-details-hero">
        <div className="course-details-content">
          <span className="section-kicker">
            {course.category || "PROFESSIONAL LEARNING"}
          </span>

          <h1>{course.title}</h1>

          <p>
            {course.description ||
              "Build practical professional skills with NEXORA."}
          </p>

          <div className="details-meta">
            <span>★ {course.rating || "4.8"}</span>
            <span>{course.level || "Beginner"}</span>
            <span>{course.duration || "8 weeks"}</span>
          </div>

          <div className="instructor">
            Instructor:{" "}
            <strong>
              {course.instructor || "NEXORA Faculty"}
            </strong>
          </div>

          {enrolled ? (
            <button
              className="auth-submit"
              onClick={onBack}
            >
              Continue learning →
            </button>
          ) : (
            <button
              className="auth-submit"
              onClick={onEnroll}
            >
              Enroll in this course →
            </button>
          )}
        </div>

        <div className="details-visual">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
            />
          ) : (
            <div className="details-logo">
              N
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;
