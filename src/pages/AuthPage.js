import React, { useMemo, useState } from "react";
import "./AuthPage.css";

function AuthPage({ onAuthenticated, onClose }) {
  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: true,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const passwordStrength = useMemo(() => {
    const password = form.password;

    if (!password) {
      return {
        score: 0,
        label: "Create a secure password",
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = {
      1: "Weak",
      2: "Fair",
      3: "Strong",
      4: "Very strong",
    };

    return {
      score,
      label: labels[score] || "Weak",
    };
  }, [form.password]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setMessage("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const validate = () => {
    const nextErrors = {};

    if (isSignup && !form.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (isSignup && form.password.length < 8) {
      nextErrors.password =
        "Your password must contain at least 8 characters.";
    }

    if (isSignup && !form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (
      isSignup &&
      form.password !== form.confirmPassword
    ) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const user = {
      name: form.name.trim() || form.email.split("@")[0],
      email: form.email.trim(),
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem("nexoraUser", JSON.stringify(user));
    localStorage.setItem("nexoraAuthenticated", "true");

    setMessage(
      isSignup
        ? "Your NEXORA account has been created."
        : "Welcome back to NEXORA."
    );

    setTimeout(() => {
      if (onAuthenticated) {
        onAuthenticated(user);
      }
    }, 400);
  };

  const handleGoogle = () => {
    const user = {
      name: "Google Learner",
      email: "learner@google.com",
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem("nexoraUser", JSON.stringify(user));
    localStorage.setItem("nexoraAuthenticated", "true");

    if (onAuthenticated) {
      onAuthenticated(user);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-background">
        <div className="auth-grid" />
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />
        <div className="auth-orbit orbit-one" />
        <div className="auth-orbit orbit-two" />
      </div>

      <header className="auth-topbar">
        <button className="auth-brand" onClick={onClose}>
          <span className="auth-brand-mark">N</span>

          <span className="auth-brand-text">
            <strong>NEXORA</strong>
            <small>LEARNING INTELLIGENCE</small>
          </span>
        </button>

        <div className="auth-top-status">
          <span className="status-dot" />
          Secure learning environment
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-story">
          <div className="story-badge">
            <span>✦</span>
            THE FUTURE OF PROFESSIONAL LEARNING
          </div>

          <h1>
            Learn smarter.
            <span> Build what's next.</span>
          </h1>

          <p>
            One intelligent learning platform for the skills, credentials and
            career moves that matter.
          </p>

          <div className="story-points">
            <StoryPoint
              number="01"
              title="Career-focused learning"
              text="Build practical skills aligned with modern industry demands."
            />

            <StoryPoint
              number="02"
              title="Intelligent progress tracking"
              text="Understand your momentum, strengths and next priorities."
            />

            <StoryPoint
              number="03"
              title="Professional credentials"
              text="Turn completed learning into meaningful career evidence."
            />
          </div>

          <div className="story-metric">
            <div>
              <strong>2.8M+</strong>
              <span>Learners</span>
            </div>

            <div>
              <strong>7.5K+</strong>
              <span>Programs</span>
            </div>

            <div>
              <strong>94%</strong>
              <span>Satisfaction</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-header">
            <div className="auth-mini-logo">N</div>

            <span className="auth-card-kicker">NEXORA ACCOUNT</span>

            <h2>
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>

            <p>
              {isSignup
                ? "Create your professional learning identity."
                : "Sign in to continue your learning journey."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              className={!isSignup ? "active" : ""}
              onClick={() => switchMode("signin")}
              type="button"
            >
              Sign in
            </button>

            <button
              className={isSignup ? "active" : ""}
              onClick={() => switchMode("signup")}
              type="button"
            >
              Create account
            </button>
          </div>

          <button className="google-button" onClick={handleGoogle}>
            <span className="google-symbol">G</span>
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="field-group">
                <label htmlFor="name">Full name</label>

                <div
                  className={`input-wrap ${
                    errors.name ? "input-error" : ""
                  }`}
                >
                  <span className="field-icon">◎</span>

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>

                {errors.name && (
                  <small className="error-text">{errors.name}</small>
                )}
              </div>
            )}

            <div className="field-group">
              <label htmlFor="email">Email address</label>

              <div
                className={`input-wrap ${
                  errors.email ? "input-error" : ""
                }`}
              >
                <span className="field-icon">@</span>

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>

                {!isSignup && (
                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() =>
                      setMessage(
                        "Password recovery instructions will be connected to your authentication backend."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div
                className={`input-wrap ${
                  errors.password ? "input-error" : ""
                }`}
              >
                <span className="field-icon">◈</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder={
                    isSignup
                      ? "Create a secure password"
                      : "Enter your password"
                  }
                  autoComplete={
                    isSignup ? "new-password" : "current-password"
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}

              {isSignup && form.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((bar) => (
                      <span
                        key={bar}
                        className={
                          bar <= passwordStrength.score ? "filled" : ""
                        }
                      />
                    ))}
                  </div>

                  <small>{passwordStrength.label}</small>
                </div>
              )}
            </div>

            {isSignup && (
              <div className="field-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div
                  className={`input-wrap ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                >
                  <span className="field-icon">◈</span>

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small className="error-text">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
            )}

            {!isSignup && (
              <label className="remember-row">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(event) =>
                    updateField(
                      "remember",
                      event.target.checked
                    )
                  }
                />

                <span>Remember me</span>
              </label>
            )}

            {message && (
              <div className="auth-message">
                <span>✓</span>
                {message}
              </div>
            )}

            <button className="auth-submit" type="submit">
              <span>
                {isSignup
                  ? "Create my NEXORA account"
                  : "Sign in to NEXORA"}
              </span>
              <b>→</b>
            </button>
          </form>

          <p className="switch-account">
            {isSignup
              ? "Already have an account?"
              : "New to NEXORA?"}

            <button
              type="button"
              onClick={() =>
                switchMode(isSignup ? "signin" : "signup")
              }
            >
              {isSignup ? "Sign in" : "Create an account"}
            </button>
          </p>

          <div className="security-note">
            <span>⌁</span>

            <div>
              <strong>Your learning identity, protected.</strong>
              <small>
                Authentication and account security are designed for
                professional use.
              </small>
            </div>
          </div>
        </section>
      </main>

      <footer className="auth-footer">
        <span>© 2026 NEXORA Learning Technologies</span>

        <div>
          <button type="button">Privacy</button>
          <button type="button">Terms</button>
          <button type="button">Security</button>
          <button type="button">Help</button>
        </div>
      </footer>
    </div>
  );
}

function StoryPoint({ number, title, text }) {
  return (
    <div className="story-point">
      <span>{number}</span>

      <div>
        <strong>{title}</strong>
        <small>{text}</small>
      </div>
    </div>
  );
}

export default AuthPage;