import React, { useState } from "react";
import "./AuthPage.css";

function AuthPage({ onLogin, onAuthenticated }) {
  const [mode, setMode] = useState("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const user = {
      name:
        name.trim() ||
        cleanEmail.split("@")[0],

      email: cleanEmail,

      role: "Professional Learner",
    };

    localStorage.setItem(
      "nexora_authenticated",
      "true"
    );

    localStorage.setItem(
      "nexora_user",
      JSON.stringify(user)
    );

    if (typeof onLogin === "function") {
      onLogin(user);
    }

    if (
      typeof onAuthenticated === "function"
    ) {
      onAuthenticated(user);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
  };

  return (
    <div className="auth-page">

      <div className="auth-background">

        <div className="auth-orb auth-orb-one" />
        <div className="auth-orb auth-orb-two" />
        <div className="auth-orb auth-orb-three" />

        <div className="auth-grid" />

      </div>

      <div className="auth-container">

        <div className="auth-brand">

          <div className="auth-brand-mark">
            N
          </div>

          <div>
            <strong>NEXORA</strong>

            <span>
              LEARNING INTELLIGENCE
            </span>
          </div>

        </div>

        <div className="auth-layout">

          <div className="auth-intro">

            <span className="auth-eyebrow">
              NEXORA LEARNING INTELLIGENCE
            </span>

            <h1>
              Build skills.
              <br />
              Build momentum.
              <br />
              <span>Build your future.</span>
            </h1>

            <p>
              A professional learning environment
              for AI, cybersecurity, software,
              cloud, data and modern business.
            </p>

            <div className="auth-proof">

              <div>
                <strong>2.8M+</strong>
                <span>Learners</span>
              </div>

              <div>
                <strong>7,500+</strong>
                <span>Programs</span>
              </div>

              <div>
                <strong>94%</strong>
                <span>Satisfaction</span>
              </div>

            </div>

          </div>

          <div className="auth-card">

            <div className="auth-card-heading">

              <span className="auth-eyebrow">
                {mode === "signin"
                  ? "WELCOME BACK"
                  : "JOIN NEXORA"}
              </span>

              <h2>
                {mode === "signin"
                  ? "Continue your learning."
                  : "Build your next advantage."}
              </h2>

              <p>
                {mode === "signin"
                  ? "Sign in to continue your professional learning journey."
                  : "Create your professional learning account in seconds."}
              </p>

            </div>

            <div className="auth-tabs">

              <button
                type="button"
                className={
                  mode === "signin"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  switchMode("signin")
                }
              >
                Sign in
              </button>

              <button
                type="button"
                className={
                  mode === "signup"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  switchMode("signup")
                }
              >
                Create account
              </button>

            </div>

            <form onSubmit={submitForm}>

              {mode === "signup" && (
                <div className="auth-field">

                  <label>
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    autoComplete="name"
                  />

                </div>
              )}

              <div className="auth-field">

                <label>
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  autoComplete="email"
                />

              </div>

              <div className="auth-field">

                <div className="field-label-row">

                  <label>
                    Password
                  </label>

                  {mode === "signin" && (
                    <button
                      type="button"
                      className="forgot-button"
                      onClick={() =>
                        alert(
                          "Password recovery will be connected to the backend authentication system."
                        )
                      }
                    >
                      Forgot password?
                    </button>
                  )}

                </div>

                <div className="password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete={
                      mode === "signin"
                        ? "current-password"
                        : "new-password"
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              {mode === "signup" && (
                <label className="terms-row">

                  <input
                    type="checkbox"
                    required
                  />

                  <span>
                    I agree to the NEXORA
                    terms and privacy policy.
                  </span>

                </label>
              )}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
              >
                {mode === "signin"
                  ? "Sign in to NEXORA"
                  : "Create my account"}

                <span>→</span>
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="social-button"
              onClick={() =>
                alert(
                  "Google authentication will be connected when the backend is added."
                )
              }
            >
              <span className="google-icon">
                G
              </span>

              Continue with Google
            </button>

            <p className="auth-switch">

              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() =>
                  switchMode(
                    mode === "signin"
                      ? "signup"
                      : "signin"
                  )
                }
              >
                {mode === "signin"
                  ? "Create one"
                  : "Sign in"}
              </button>

            </p>

          </div>

        </div>

        <div className="auth-footer">

          <span>
            © 2026 NEXORA
          </span>

          <span>
            Learning intelligence for
            modern professionals.
          </span>

        </div>

      </div>

    </div>
  );
}

export default AuthPage;