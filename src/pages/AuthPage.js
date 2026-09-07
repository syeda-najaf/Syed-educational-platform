import React, { useMemo, useState } from "react";
import "./AuthPage.css";

import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";


function AuthPage({ onAuthenticated, onClose }) {
  const [mode, setMode] = useState("signin");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: true,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


  /* =========================================================
     PASSWORD STRENGTH
  ========================================================= */

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


  const isSignup = mode === "signup";


  /* =========================================================
     FIELD UPDATE
  ========================================================= */

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


  /* =========================================================
     SWITCH SIGN IN / SIGN UP
  ========================================================= */

  const switchMode = (newMode) => {
    if (loading || googleLoading) return;

    setMode(newMode);

    setErrors({});
    setMessage("");
    setMessageType("success");

    setShowPassword(false);
    setShowConfirmPassword(false);
  };


  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {
    const nextErrors = {};

    const email = form.email.trim();
    const password = form.password;

    if (isSignup && !form.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!email) {
      nextErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (isSignup && password.length < 8) {
      nextErrors.password =
        "Your password must contain at least 8 characters.";
    }

    if (isSignup && !form.confirmPassword) {
      nextErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      isSignup &&
      password !== form.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };


  /* =========================================================
     FIREBASE ERROR HANDLER
  ========================================================= */

  const getFirebaseErrorMessage = (error) => {
    const code = error?.code || "";

    switch (code) {
      case "auth/email-already-in-use":
        return "An account already exists with this email address.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Your password is too weak. Use at least 8 characters.";

      case "auth/user-not-found":
        return "No account was found with this email address.";

      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";

      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";

      case "auth/popup-blocked":
        return "Your browser blocked the Google sign-in popup. Please allow popups for this site.";

      case "auth/cancelled-popup-request":
        return "The Google sign-in request was cancelled.";

      case "auth/account-exists-with-different-credential":
        return "An account already exists with this email using another sign-in method.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/operation-not-allowed":
        return "This authentication method is not enabled in Firebase.";

      case "auth/unauthorized-domain":
        return "This website domain is not authorized in Firebase Authentication.";

      case "auth/internal-error":
        return "Firebase encountered an internal error. Please try again.";

      default:
        return (
          error?.message ||
          "Something went wrong. Please try again."
        );
    }
  };


  /* =========================================================
     CREATE USER OBJECT
  ========================================================= */

  const createUserObject = (firebaseUser) => {
    return {
      uid: firebaseUser.uid,

      name:
        firebaseUser.displayName ||
        form.name.trim() ||
        firebaseUser.email?.split("@")[0] ||
        "Learner",

      email: firebaseUser.email || "",

      photoURL: firebaseUser.photoURL || "",

      provider:
        firebaseUser.providerData?.[0]?.providerId ||
        "password",

      joinedAt:
        firebaseUser.metadata?.creationTime ||
        new Date().toISOString(),

      lastLoginAt:
        firebaseUser.metadata?.lastSignInTime ||
        new Date().toISOString(),
    };
  };


  /* =========================================================
     SAVE AUTHENTICATED USER
  ========================================================= */

  const completeAuthentication = (firebaseUser) => {
    const user = createUserObject(firebaseUser);

    localStorage.setItem(
      "nexoraUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "nexoraAuthenticated",
      "true"
    );

    /*
      Keep Firebase UID separately so other pages can use it.
    */
    localStorage.setItem(
      "nexoraUid",
      firebaseUser.uid
    );

    if (onAuthenticated) {
      onAuthenticated(user);
    }
  };


  /* =========================================================
     EMAIL / PASSWORD AUTHENTICATION
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || googleLoading) return;

    if (!validate()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage("");
    setMessageType("success");

    try {
      /*
        Remember me:
        checked  -> local persistence
        unchecked -> session persistence
      */

      await setPersistence(
        auth,
        form.remember
          ? browserLocalPersistence
          : browserSessionPersistence
      );


      /* =====================================================
         SIGN UP
      ===================================================== */

      if (isSignup) {
        const credential =
          await createUserWithEmailAndPassword(
            auth,
            form.email.trim(),
            form.password
          );

        /*
          Add the user's real name to Firebase.
        */

        if (form.name.trim()) {
          await updateProfile(
            credential.user,
            {
              displayName: form.name.trim(),
            }
          );
        }

        const updatedUser = auth.currentUser;

        const user = createUserObject(
          updatedUser || credential.user
        );

        localStorage.setItem(
          "nexoraUser",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "nexoraAuthenticated",
          "true"
        );

        localStorage.setItem(
          "nexoraUid",
          credential.user.uid
        );

        setMessage(
          "Your NEXORA account has been created successfully."
        );

        setMessageType("success");

        setTimeout(() => {
          if (onAuthenticated) {
            onAuthenticated(user);
          }
        }, 500);

        return;
      }


      /* =====================================================
         SIGN IN
      ===================================================== */

      const credential =
        await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );

      const user = createUserObject(
        credential.user
      );

      localStorage.setItem(
        "nexoraUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "nexoraAuthenticated",
        "true"
      );

      localStorage.setItem(
        "nexoraUid",
        credential.user.uid
      );

      setMessage(
        "Welcome back to NEXORA."
      );

      setMessageType("success");

      setTimeout(() => {
        if (onAuthenticated) {
          onAuthenticated(user);
        }
      }, 400);

    } catch (error) {
      console.error(
        "Firebase authentication error:",
        error
      );

      const friendlyMessage =
        getFirebaseErrorMessage(error);

      setMessage(friendlyMessage);
      setMessageType("error");

      /*
        Put validation-style errors on the
        relevant field when possible.
      */

      if (
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/invalid-credential"
      ) {
        setErrors({
          email: "Check your email and password.",
        });
      }

    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     REAL GOOGLE LOGIN
  ========================================================= */

  const handleGoogle = async () => {
    if (loading || googleLoading) return;

    setGoogleLoading(true);

    setErrors({});
    setMessage("");
    setMessageType("success");

    try {
      /*
        Google provider
      */

      const provider =
        new GoogleAuthProvider();

      /*
        Ask Google for basic profile information.
      */

      provider.setCustomParameters({
        prompt: "select_account",
      });


      /*
        Use the same Remember Me preference.
      */

      await setPersistence(
        auth,
        form.remember
          ? browserLocalPersistence
          : browserSessionPersistence
      );


      /*
        THIS IS THE REAL GOOGLE POPUP.
        No hardcoded Google user.
      */

      const result =
        await signInWithPopup(
          auth,
          provider
        );


      /*
        Firebase now contains the real Google user.
      */

      const firebaseUser =
        result.user;

      const user =
        createUserObject(firebaseUser);


      /*
        Save user information for your
        existing NEXORA application.
      */

      localStorage.setItem(
        "nexoraUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "nexoraAuthenticated",
        "true"
      );

      localStorage.setItem(
        "nexoraUid",
        firebaseUser.uid
      );


      setMessage(
        `Welcome, ${
          firebaseUser.displayName ||
          "Learner"
        }.`
      );

      setMessageType("success");


      /*
        Give App.js the real authenticated user.
      */

      setTimeout(() => {
        if (onAuthenticated) {
          onAuthenticated(user);
        }
      }, 400);

    } catch (error) {
      console.error(
        "Google authentication error:",
        error
      );

      const friendlyMessage =
        getFirebaseErrorMessage(error);

      setMessage(friendlyMessage);
      setMessageType("error");

    } finally {
      setGoogleLoading(false);
    }
  };


  /* =========================================================
     FORGOT PASSWORD
  ========================================================= */

  const handleForgotPassword = async () => {
    const email = form.email.trim();

    setErrors({});
    setMessage("");
    setMessageType("success");

    if (!email) {
      setErrors({
        email:
          "Enter your email address first."
      });

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setErrors({
        email:
          "Enter a valid email address."
      });

      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        email
      );

      setMessage(
        "Password reset instructions have been sent to your email."
      );

      setMessageType("success");

    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setMessage(
        getFirebaseErrorMessage(error)
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-shell">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="auth-background">

        <div className="auth-grid" />

        <div className="auth-glow auth-glow-one" />

        <div className="auth-glow auth-glow-two" />

        <div className="auth-orbit orbit-one" />

        <div className="auth-orbit orbit-two" />

      </div>


      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="auth-topbar">

        <button
          className="auth-brand"
          onClick={onClose}
          type="button"
        >

          <span className="auth-brand-mark">
            N
          </span>

          <span className="auth-brand-text">

            <strong>
              NEXORA
            </strong>

            <small>
              LEARNING INTELLIGENCE
            </small>

          </span>

        </button>


        <div className="auth-top-status">

          <span className="status-dot" />

          Secure learning environment

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="auth-main">


        {/* ===================================================
            LEFT STORY
        =================================================== */}

        <section className="auth-story">

          <div className="story-badge">

            <span>✦</span>

            THE FUTURE OF PROFESSIONAL LEARNING

          </div>


          <h1>

            Learn smarter.

            <span>
              Build what's next.
            </span>

          </h1>


          <p>

            One intelligent learning platform for
            the skills, credentials and career moves
            that matter.

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
              <strong>
                2.8M+
              </strong>

              <span>
                Learners
              </span>
            </div>


            <div>
              <strong>
                7.5K+
              </strong>

              <span>
                Programs
              </span>
            </div>


            <div>
              <strong>
                94%
              </strong>

              <span>
                Satisfaction
              </span>
            </div>

          </div>

        </section>


        {/* ===================================================
            AUTH CARD
        =================================================== */}

        <section className="auth-card">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="auth-card-header">

            <div className="auth-mini-logo">
              N
            </div>

            <span className="auth-card-kicker">
              NEXORA ACCOUNT
            </span>

            <h2>

              {isSignup
                ? "Create your account"
                : "Welcome back"}

            </h2>

            <p>

              {isSignup
                ? "Create your professional learning identity."
                : "Sign in to continue your learning journey."}

            </p>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="auth-tabs">

            <button
              className={!isSignup ? "active" : ""}
              onClick={() =>
                switchMode("signin")
              }
              type="button"
              disabled={
                loading ||
                googleLoading
              }
            >
              Sign in
            </button>


            <button
              className={isSignup ? "active" : ""}
              onClick={() =>
                switchMode("signup")
              }
              type="button"
              disabled={
                loading ||
                googleLoading
              }
            >
              Create account
            </button>

          </div>


          {/* =================================================
              GOOGLE
          ================================================= */}

          <button
            className="google-button"
            onClick={handleGoogle}
            type="button"
            disabled={
              loading ||
              googleLoading
            }
          >

            <span className="google-symbol">
              G
            </span>

            <span>

              {googleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}

            </span>

          </button>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="auth-divider">

            <span>
              OR
            </span>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>


            {/* ===============================================
                NAME
            =============================================== */}

            {isSignup && (

              <div className="field-group">

                <label htmlFor="name">
                  Full name
                </label>


                <div
                  className={`input-wrap ${
                    errors.name
                      ? "input-error"
                      : ""
                  }`}
                >

                  <span className="field-icon">
                    ◎
                  </span>


                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={
                      loading ||
                      googleLoading
                    }
                  />

                </div>


                {errors.name && (

                  <small className="error-text">
                    {errors.name}
                  </small>

                )}

              </div>

            )}


            {/* ===============================================
                EMAIL
            =============================================== */}

            <div className="field-group">

              <label htmlFor="email">
                Email address
              </label>


              <div
                className={`input-wrap ${
                  errors.email
                    ? "input-error"
                    : ""
                }`}
              >

                <span className="field-icon">
                  @
                </span>


                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={
                    loading ||
                    googleLoading
                  }
                />

              </div>


              {errors.email && (

                <small className="error-text">
                  {errors.email}
                </small>

              )}

            </div>


            {/* ===============================================
                PASSWORD
            =============================================== */}

            <div className="field-group">

              <div className="label-row">

                <label htmlFor="password">
                  Password
                </label>


                {!isSignup && (

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={
                      handleForgotPassword
                    }
                    disabled={
                      loading ||
                      googleLoading
                    }
                  >
                    Forgot password?
                  </button>

                )}

              </div>


              <div
                className={`input-wrap ${
                  errors.password
                    ? "input-error"
                    : ""
                }`}
              >

                <span className="field-icon">
                  ◈
                </span>


                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={(event) =>
                    updateField(
                      "password",
                      event.target.value
                    )
                  }
                  placeholder={
                    isSignup
                      ? "Create a secure password"
                      : "Enter your password"
                  }
                  autoComplete={
                    isSignup
                      ? "new-password"
                      : "current-password"
                  }
                  disabled={
                    loading ||
                    googleLoading
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
                  disabled={
                    loading ||
                    googleLoading
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>


              {errors.password && (

                <small className="error-text">
                  {errors.password}
                </small>

              )}


              {/* =============================================
                  PASSWORD STRENGTH
              ============================================= */}

              {isSignup &&
                form.password && (

                  <div className="password-strength">

                    <div className="strength-bars">

                      {[1, 2, 3, 4].map(
                        (bar) => (

                          <span
                            key={bar}
                            className={
                              bar <=
                              passwordStrength.score
                                ? "filled"
                                : ""
                            }
                          />

                        )
                      )}

                    </div>


                    <small>
                      {passwordStrength.label}
                    </small>

                  </div>

                )}

            </div>


            {/* ===============================================
                CONFIRM PASSWORD
            =============================================== */}

            {isSignup && (

              <div className="field-group">

                <label htmlFor="confirmPassword">
                  Confirm password
                </label>


                <div
                  className={`input-wrap ${
                    errors.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                >

                  <span className="field-icon">
                    ◈
                  </span>


                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={
                      loading ||
                      googleLoading
                    }
                  />


                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) =>
                          !current
                      )
                    }
                    disabled={
                      loading ||
                      googleLoading
                    }
                  >

                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}

                  </button>

                </div>


                {errors.confirmPassword && (

                  <small className="error-text">
                    {errors.confirmPassword}
                  </small>

                )}

              </div>

            )}


            {/* ===============================================
                REMEMBER ME
            =============================================== */}

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
                  disabled={
                    loading ||
                    googleLoading
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

            )}


            {/* ===============================================
                MESSAGE
            =============================================== */}

            {message && (

              <div
                className={`auth-message ${
                  messageType === "error"
                    ? "auth-message-error"
                    : ""
                }`}
              >

                <span>
                  {messageType === "error"
                    ? "!"
                    : "✓"}
                </span>

                {message}

              </div>

            )}


            {/* ===============================================
                SUBMIT
            =============================================== */}

            <button
              className="auth-submit"
              type="submit"
              disabled={
                loading ||
                googleLoading
              }
            >

              <span>

                {loading
                  ? isSignup
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignup
                  ? "Create my NEXORA account"
                  : "Sign in to NEXORA"}

              </span>


              <b>

                {loading
                  ? "..."
                  : "→"}

              </b>

            </button>

          </form>


          {/* =================================================
              SWITCH ACCOUNT
          ================================================= */}

          <p className="switch-account">

            {isSignup
              ? "Already have an account?"
              : "New to NEXORA?"}


            <button
              type="button"
              onClick={() =>
                switchMode(
                  isSignup
                    ? "signin"
                    : "signup"
                )
              }
              disabled={
                loading ||
                googleLoading
              }
            >

              {isSignup
                ? "Sign in"
                : "Create an account"}

            </button>

          </p>


          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="security-note">

            <span>
              ⌁
            </span>


            <div>

              <strong>
                Your learning identity, protected.
              </strong>

              <small>
                Authentication is securely handled
                by Firebase Authentication.
              </small>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="auth-footer">

        <span>
          © 2026 NEXORA Learning Technologies
        </span>


        <div>

          <button type="button">
            Privacy
          </button>

          <button type="button">
            Terms
          </button>

          <button type="button">
            Security
          </button>

          <button type="button">
            Help
          </button>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   STORY POINT COMPONENT
========================================================= */

function StoryPoint({
  number,
  title,
  text,
}) {
  return (
    <div className="story-point">

      <span>
        {number}
      </span>

      <div>

        <strong>
          {title}
        </strong>

        <small>
          {text}
        </small>

      </div>

    </div>
  );
}


export default AuthPage;