import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";

const PAST_ISSUES = [
  {
    issue: "#24",
    date: "May 28, 2026",
    title: "How content marketing drives 3x more sales",
    emoji: "📈",
    preview:
      "The stores growing fastest aren't just selling — they're publishing. Here's the playbook.",
  },
  {
    issue: "#23",
    date: "May 21, 2026",
    title: "The complete SEO guide for e-commerce in 2026",
    emoji: "🔍",
    preview:
      "Google's latest updates changed the rules again. Here's what's working right now.",
  },
  {
    issue: "#22",
    date: "May 14, 2026",
    title: "10 block editor tricks that will change how you publish",
    emoji: "✏️",
    preview:
      "Most publishers use 20% of the editor's power. These tricks will transform your workflow.",
  },
  {
    issue: "#21",
    date: "May 7, 2026",
    title: "Why subscription commerce is the future of DTC",
    emoji: "🔄",
    preview:
      "Recurring revenue, higher LTV, and predictable cash flow — here's how to launch.",
  },
];

const TESTIMONIALS = [
  {
    initials: "KL",
    bg: "#e6f9f2",
    color: "#00b67a",
    name: "Kim L.",
    role: "Founder, Petal Studio",
    quote: "Best newsletter I get. Always actionable, never fluff.",
  },
  {
    initials: "MO",
    bg: "#e3f2fd",
    color: "#2196f3",
    name: "Marco O.",
    role: "E-commerce director",
    quote: "Learned more from this newsletter than any course I've paid for.",
  },
  {
    initials: "AW",
    bg: "#ede9fe",
    color: "#7c3aed",
    name: "Abby W.",
    role: "Content creator",
    quote: "I forward this to my whole team every week. Required reading.",
  },
];

export default function NewsletterPage({ onNavigate, user, onLogout }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const toast = useToast();

  const INTEREST_TAGS = [
    "Commerce tips",
    "Content strategy",
    "SEO",
    "Email marketing",
    "Product updates",
    "Case studies",
  ];

  const toggleInterest = (tag) =>
    setInterests((i) =>
      i.includes(tag) ? i.filter((x) => x !== tag) : [...i, tag],
    );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
    toast.success(`You're subscribed, ${firstName || "friend"}! 🎉`);
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
      <SharedNav onNavigate={onNavigate} user={user} onLogout={onLogout} />

      {/* HERO */}
      <section
        style={{
          padding: "88px 40px 72px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9 0%, #eff6ff 100%)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 99,
            padding: "5px 14px",
            fontSize: 13,
            color: "#555",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          📬 Weekly · Free · 18,400 subscribers
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 620,
            margin: "0 auto 16px",
          }}
        >
          The newsletter for creators who sell
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "#555",
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.75,
          }}
        >
          Every week: actionable tips on commerce, content, SEO, and growing
          your online business. No fluff. No spam. Unsubscribe anytime.
        </p>

        {subscribed ? (
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #c8f0e0",
              borderRadius: 20,
              padding: "32px",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              You're in!
            </h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
              Welcome to the ShopPress newsletter, {firstName || "friend"}!
              Check your inbox for a confirmation email. First issue lands this
              Tuesday.
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 20,
              padding: "28px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#666",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#666",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: `1px solid ${error ? "#fca5a5" : "#ddd"}`,
                      borderRadius: 10,
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#666",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  What are you interested in? (optional)
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {INTEREST_TAGS.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 99,
                        fontSize: 12,
                        border: "1px solid",
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: "pointer",
                        background: interests.includes(tag) ? "#111" : "#fff",
                        color: interests.includes(tag) ? "#fff" : "#555",
                        borderColor: interests.includes(tag) ? "#111" : "#ddd",
                        transition: "all 0.15s",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                style={{
                  ...btnStyle("green", "lg"),
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Subscribe free →
              </button>
              <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                No spam, ever. Unsubscribe with one click.
              </p>
            </form>
          </div>
        )}
      </section>

      {/* STATS */}
      <section
        style={{
          borderBottom: "1px solid #f0f0f0",
          padding: "clamp(24px,4vw,28px) clamp(16px,4vw,40px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["18,400+", "Subscribers"],
            ["52%", "Avg open rate"],
            ["Weekly", "Every Tuesday"],
            ["100%", "Free forever"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-0.5px",
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAST ISSUES */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            Recent issues
          </h2>
          <p style={{ fontSize: 15, color: "#666" }}>
            Here's what our subscribers have been reading.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PAST_ISSUES.map((issue) => (
            <div
              key={issue.issue}
              onClick={() => onNavigate("blog")}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "20px",
                border: "1px solid #ebebeb",
                borderRadius: 14,
                cursor: "pointer",
                transition: "box-shadow 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "#f4fdf9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {issue.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: "#f0f0f0",
                      color: "#555",
                      borderRadius: 99,
                      padding: "2px 8px",
                    }}
                  >
                    Issue {issue.issue}
                  </span>
                  <span style={{ fontSize: 12, color: "#aaa" }}>
                    {issue.date}
                  </span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                  {issue.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#777",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {issue.preview}
                </p>
              </div>
              <span
                style={{
                  color: "#ccc",
                  fontSize: 18,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                →
              </span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button
            style={btnStyle("outline")}
            onClick={() => onNavigate("blog")}
          >
            Browse all articles →
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 32,
              textAlign: "center",
              letterSpacing: "-0.3px",
            }}
          >
            What subscribers say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <div
                  style={{ color: "#f59e0b", fontSize: 13, marginBottom: 12 }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: t.bg,
                      color: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
