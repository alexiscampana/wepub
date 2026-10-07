import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";

const SUPPORT_OPTIONS = [
  {
    icon: "💬",
    title: "Live chat",
    desc: "Chat with our team in real-time.",
    badge: "Avg. reply: 2 min",
    color: "#00b67a",
    bg: "#e6f9f2",
  },
  {
    icon: "📧",
    title: "Email support",
    desc: "Send us a message anytime.",
    badge: "Reply within 24h",
    color: "#2196f3",
    bg: "#e3f2fd",
  },
  {
    icon: "📚",
    title: "Help center",
    desc: "Browse 500+ articles and guides.",
    badge: "Self-serve",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    icon: "👥",
    title: "Community forum",
    desc: "Ask questions, share tips.",
    badge: "50k+ members",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
];

export default function ContactPage({ onNavigate, user, onLogout }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <SharedNav
        onNavigate={onNavigate}
        activePage="contact"
        user={user}
        onLogout={onLogout}
      />

      {/* HERO */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px) 56px",
          textAlign: "center",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#00b67a",
            marginBottom: 12,
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-1px",
          }}
        >
          We're here to help
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            maxWidth: 440,
            margin: "0 auto",
          }}
        >
          Questions, feedback, or just want to say hi? Pick the best way to
          reach us.
        </p>
      </section>

      {/* SUPPORT OPTIONS */}
      <section
        style={{
          padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px)",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: 14,
          }}
        >
          {SUPPORT_OPTIONS.map((opt) => (
            <div
              key={opt.title}
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                cursor: "pointer",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: opt.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 14,
                }}
              >
                {opt.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                {opt.title}
              </h3>
              <p style={{ fontSize: 13, color: "#777", marginBottom: 12 }}>
                {opt.desc}
              </p>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: opt.bg,
                  color: opt.color,
                  borderRadius: 99,
                  padding: "3px 10px",
                }}
              >
                {opt.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        style={{ padding: "0 40px 72px", maxWidth: 700, margin: "0 auto" }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ebebeb",
            borderRadius: 20,
            padding: "36px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: "-0.3px",
            }}
          >
            Send us a message
          </h2>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>
            We read every message and reply within one business day.
          </p>

          {submitted ? (
            <div
              style={{
                background: "#f4fdf9",
                border: "1px solid #c8f0e0",
                borderRadius: 14,
                padding: "36px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                Message received!
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                Thanks, {form.name}! We'll get back to you at {form.email}{" "}
                within one business day.
              </p>
              <button
                style={{ ...btnStyle("green"), marginTop: 20 }}
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    type: "general",
                  });
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Type selector */}
              <div>
                <label style={labelStyle}>What's this about?</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["general", "General inquiry"],
                    ["support", "Technical support"],
                    ["billing", "Billing"],
                    ["sales", "Talk to sales"],
                    ["press", "Press & media"],
                  ].map(([val, label]) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setForm((f) => ({ ...f, type: val }))}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 99,
                        fontSize: 13,
                        border: "1px solid",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: form.type === val ? "#111" : "#fff",
                        color: form.type === val ? "#fff" : "#555",
                        borderColor: form.type === val ? "#111" : "#ddd",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="Brief subject line"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Message *</label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
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
                style={{ ...btnStyle("green", "lg"), justifyContent: "center" }}
              >
                Send message →
              </button>
            </form>
          )}
        </div>

        {/* Office info */}
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          {[
            {
              icon: "📍",
              title: "Headquarters",
              info: "Rua do Ouro 42, Lisbon, Portugal",
            },
            {
              icon: "🕐",
              title: "Support hours",
              info: "Mon–Fri, 9am–6pm GMT",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fafafa",
                border: "1px solid #ebebeb",
                borderRadius: 14,
                padding: "18px 20px",
                display: "flex",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "#777" }}>{item.info}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
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
