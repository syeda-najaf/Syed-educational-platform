import React, { useEffect, useRef, useState } from "react";
import "./AuthPage.css";

/*
=========================================================
NEXORA AUTHENTICATION
Google Sign-In + Email/Password UI
React 18 compatible
=========================================================

IMPORTANT:
Replace this with your Google OAuth Web Client ID.

Example:
123456789012-abcdefghijklmnop.apps.googleusercontent.com
*/
const GOOGLE_CLIENT_ID =
  "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const GOOGLE_SCRIPT_ID = "google-identity-services";

function AuthPage({ onLogin, onAuthenticated }) {
  const [mode, setMode] = useState("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleButtonRef = useRef(null);

  /*
  ========================================================
  LOAD GOOGLE IDENTITY SERVICES
  ========================================================
  */

  useEffect(() => {
    let cancelled = false;

    const loadGoogleScript = () => {
      if (window.google?.accounts?.id) {
        if (!cancelled) {
          setGoogleReady(true);
        }

        return;
      }

      const existingScript =
        document.getElementById(GOOGLE_SCRIPT_ID);

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          handleGoogleScriptLoaded
        );

        return;
      }

      const script = document.createElement("script");

      script.id = GOOGLE_SCRIPT_ID;
      script.src =
        "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = handleGoogleScriptLoaded;

      script.onerror = () => {
        if (!cancelled) {
          setError(
            "Google Sign-In could not be loaded. Please check your internet connection."
          );
        }
      };

      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (
        cancelled ||
        !window.google?.accounts?.id
      ) {
        return;
      }

      if (
        !GOOGLE_CLIENT_ID ||
        GOOGLE_CLIENT_ID.startsWith(
          "YOUR_GOOGLE_CLIENT_ID"
        )
      ) {
        setGoogleReady(false);
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,

          callback: handleGoogleCredential,

          auto_select: false,

          cancel_on_tap_outside: true,

          use_fedcm_for_prompt: true,
        });

        setGoogleReady(true);

        renderGoogleButton();
      } catch (googleError) {
        console.error(
          "Google initialization error:",
          googleError
        );

        setError(
          "Google Sign-In could not be initialized."
        );
      }
    };

    function handleGoogleScriptLoaded() {
      initializeGoogle();
    }

    function renderGoogleButton() {
      if (
        !window.google?.accounts?.id ||
        !googleButtonRef.current
      ) {
        return;
      }

      googleButtonRef.current.innerHTML = "";

      try {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 360,
          }
        );
      } catch (error) {
        console.error(
          "Google button render error:",
          error
        );
      }
    }

    loadGoogleScript();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  ========================================================
  RENDER GOOGLE BUTTON WHEN READY
  ========================================================
  */

  useEffect(() => {
    if (
      !googleReady ||
      !window.google?.accounts?.id ||
      !googleButtonRef.current
    ) {
      return;
    }

    googleButtonRef.current.innerHTML = "";

    try {
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 360,
        }
      );
    } catch (error) {
      console.error(
        "Unable to render Google button:",
        error
      );
    }
  }, [googleReady, mode]);

  /*
  ========================================================
  GOOGLE CREDENTIAL RESPONSE
  ========================================================
  */

  const handleGoogleCredential = async (response) => {
    setError("");
    setGoogleLoading(true);

    try {
      if (!response?.credential) {
        throw new Error(
          "Google did not return a credential."
        );
      }

      /*
      ------------------------------------------------------
      IMPORTANT SECURITY NOTE

      This decodes the Google ID token only so the frontend
      can display the Google profile.

      A production backend should verify the ID token's
      signature, issuer, audience and expiration before
      trusting the identity.

      Do NOT treat client-side decoding as verification.
      ------------------------------------------------------
      */

      const googleUser =
        decodeGoogleCredential(
          response.credential
        );

      if (!googleUser) {
        throw new Error(
          "Unable to read Google account information."
        );
      }

      const user = {
        name:
          googleUser.name ||
          googleUser.given_name ||
          googleUser.email?.split("@")[0] ||
          "Google Learner",

        email: googleUser.email || "",

        role: "Professional Learner",

        provider: "google",

        googleId: googleUser.sub || "",

        picture: googleUser.picture || "",

        emailVerified:
          googleUser.email_verified === true ||
          googleUser.email_verified === "true",
      };

      /*
      ------------------------------------------------------
      Store application session information.

      The raw Google credential is intentionally NOT stored
      in localStorage.
      ------------------------------------------------------
      */

      localStorage.setItem(
        "nexora_authenticated",
        "true"
      );

      localStorage.setItem(
        "nexora_user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "nexora_auth_provider",
        "google"
      );

      if (typeof onLogin === "function") {
        onLogin(user);
      }

      if (
        typeof onAuthenticated === "function"
      ) {
        onAuthenticated(user);
      }
    } catch (googleError) {
      console.error(
        "Google authentication error:",
        googleError
      );

      setError(
        googleError?.message ||
          "Google Sign-In failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  /*
  ========================================================
  DECODE GOOGLE JWT
  ========================================================
  */

  const decodeGoogleCredential = (credential) => {
    try {
      const parts = credential.split(".");

      if (parts.length !== 3) {
        return null;
      }

      const base64Url = parts[1];

      const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const padded =
        base64 +
        "=".repeat(
          (4 - (base64.length % 4)) % 4
        );

      const json = decodeURIComponent(
        window
          .atob(padded)
          .split("")
          .map(
            (character) =>
              `%${(
                "00" +
                character
                  .charCodeAt(0)
                  .toString(16)
              ).slice(-2)}`
          )
          .join("")
      );

      return JSON.parse(json);
    } catch (error) {
      console.error(
        "Google credential decoding failed:",
        error
      );

      return null;
    }
  };

  /*
  ========================================================
  EMAIL/PASSWORD SUBMIT
  ========================================================
  */

  const submitForm = (event) => {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (mode === "signup" && !cleanName) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!cleanEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    /*
    More reliable email validation.
    */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
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
        cleanName ||
        cleanEmail.split("@")[0],

      email: cleanEmail,

      role: "Professional Learner",

      provider: "email",
    };

    /*
    ------------------------------------------------------
    FRONTEND DEMO AUTH

    For real production authentication, verify the
    password through your backend.

    Never store real passwords in localStorage.
    ------------------------------------------------------
    */

    localStorage.setItem(
      "nexora_authenticated",
      "true"
    );

    localStorage.setItem(
      "nexora_user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "nexora_auth_provider",
      "email"
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

  /*
  ========================================================
  SWITCH SIGN-IN / SIGN-UP
  ========================================================
  */

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setPassword("");
  };

  /*
  ========================================================
  GOOGLE FALLBACK
  ========================================================
  */

  const handleGoogleFallback = () => {
    if (
      !GOOGLE_CLIENT_ID ||
      GOOGLE_CLIENT_ID.startsWith(
        "YOUR_GOOGLE_CLIENT_ID"
      )
    ) {
      setError(
        "Add your Google OAuth Web Client ID to AuthPage.js first."
      );

      return;
    }

    if (
      !window.google?.accounts?.id
    ) {
      setError(
        "Google Sign-In is still loading. Please try again."
      );

      return;
    }

    try {
      window.google.accounts.id.prompt();
    } catch (error) {
      console.error(error);

      setError(
        "Unable to open Google Sign-In."
      );
    }
  };

  return (
    <div className="auth-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="auth-background">

        <div className="auth-orb auth-orb-one" />

        <div className="auth-orb auth-orb-two" />

        <div className="auth-orb auth-orb-three" />

        <div className="auth-grid" />

      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="auth-container">

        {/* =================================================
            BRAND
        ================================================= */}

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

        {/* =================================================
            AUTH LAYOUT
        ================================================= */}

        <div className="auth-layout">

          {/* =================================================
              LEFT INTRO
          ================================================= */}

          <div className="auth-intro">

            <span className="auth-eyebrow">
              NEXORA LEARNING INTELLIGENCE
            </span>

            <h1>
              Build skills.
              <br />
              Build momentum.
              <br />
              <span>
                Build your future.
              </span>
            </h1>

            <p>
              A professional learning
              environment for AI,
              cybersecurity, software,
              cloud, data and modern
              business.
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

          {/* =================================================
              AUTH CARD
          ================================================= */}

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

            {/* =================================================
                AUTH TABS
            ================================================= */}

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

            {/* =================================================
                EMAIL FORM
            ================================================= */}

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
                        setError(
                          "Password recovery requires a backend authentication service."
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
                    terms and privacy
                    policy.
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

                <span>
                  →
                </span>

              </button>

            </form>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* =================================================
                GOOGLE SIGN-IN
            ================================================= */}

            <div className="google-auth-wrapper">

              {GOOGLE_CLIENT_ID.startsWith(
                "YOUR_GOOGLE_CLIENT_ID"
              ) ? (
                <button
                  type="button"
                  className="social-button"
                  onClick={
                    handleGoogleFallback
                  }
                >

                  <span className="google-icon">
                    G
                  </span>

                  Continue with Google

                </button>
              ) : (
                <>

                  <div
                    ref={googleButtonRef}
                    className="google-button-container"
                  />

                  {googleLoading && (
                    <div className="google-loading">
                      Connecting to Google...
                    </div>
                  )}

                </>
              )}

            </div>

            {/* =================================================
                MODE SWITCH
            ================================================= */}

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

        {/* =================================================
            FOOTER
        ================================================= */}

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