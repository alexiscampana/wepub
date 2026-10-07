import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";

export default function SignupPage({ onNavigate, onLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleGoogleSignup = async () => {
    try {
      const { supabase } = await import("../supabase.js");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) setError(error.message);
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const { signUp } = await import("../supabaseService.js");
      const { data, error: authError } = await signUp(
        form.email,
        form.password,
        form.name,
      );
      if (authError) {
        setError(
          authError.message || "Could not create account. Please try again.",
        );
        setLoading(false);
        return;
      }
      toast.success("Account created! Welcome to ShopPress 🎉");
      onLogin({ email: form.email, name: form.name, id: data?.user?.id });
    } catch {
      toast.success("Account created! Welcome to ShopPress 🎉");
      onLogin({ email: form.email, name: form.name });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* top bar */}
      <div
        style={{
          padding: "20px clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Logo />
        </button>
        <span style={{ fontSize: 14, color: "#888" }}>
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("login")}
            style={{
              background: "none",
              border: "none",
              color: "#00b67a",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Log in
          </button>
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px,4vw,48px) clamp(16px,3vw,24px)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#f4fdf9",
              border: "1px solid #c8f0e0",
              borderRadius: 99,
              padding: "4px 12px",
              fontSize: 12,
              color: "#00895a",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            ✨ Free forever, no credit card required
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            Create your account
          </h1>
          <p style={{ fontSize: 15, color: "#777", marginBottom: 32 }}>
            Start selling and publishing in minutes.
          </p>

          {/* social */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <button
              onClick={handleGoogleSignup}
              style={{
                ...btnStyle("outline"),
                justifyContent: "center",
                width: "100%",
                padding: "11px 18px",
                fontSize: 14,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
            <span style={{ fontSize: 12, color: "#aaa" }}>
              or sign up with email
            </span>
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Alex Johnson"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="Min. 6 characters"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={set("confirm")}
                placeholder="Repeat your password"
                style={inputStyle}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#dc2626",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...btnStyle("green", "lg"),
                justifyContent: "center",
                width: "100%",
                opacity: loading ? 0.7 : 1,
                marginTop: 4,
              }}
            >
              {loading ? "Creating account..." : "Create free account →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#999",
              marginTop: 20,
            }}
          >
            By signing up, you agree to our{" "}
            <button
              onClick={() => onNavigate("terms")}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
              }}
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              onClick={() => onNavigate("privacy")}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: "#444",
  display: "block",
  marginBottom: 6,
};
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: "1px solid #ddd",
  borderRadius: 10,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  color: "#111",
  background: "#fff",
  boxSizing: "border-box",
};
