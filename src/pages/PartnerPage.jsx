import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";

const PARTNER_TYPES = [
  {
    icon: "🏢",
    title: "Agency partner",
    desc: "Build and launch ShopPress stores for your clients. Get certified, earn referral revenue, and list your agency in our partner directory.",
    perks: [
      "Agency certification badge",
      "Partner directory listing",
      "25% recurring commission",
      "Early access to new features",
      "Co-marketing opportunities",
      "Dedicated partner manager",
    ],
  },
  {
    icon: "🔌",
    title: "Technology partner",
    desc: "Integrate your product with ShopPress. Reach 1M+ merchants through our plugin marketplace and joint go-to-market programs.",
    perks: [
      "Plugin marketplace listing",
      "Joint press releases",
      "API priority support",
      "Revenue sharing program",
      "Co-branded case studies",
      "Partner summit invites",
    ],
  },
  {
    icon: "📚",
    title: "Education partner",
    desc: "Teach ShopPress to your students, community, or audience. Get certified content, co-branded materials, and educator discounts.",
    perks: [
      "Free educator accounts",
      "Curriculum resources",
      "Student discount codes",
      "Certification program",
      "Webinar collaboration",
      "Community recognition",
    ],
  },
];

const LOGOS = [
  "Acme Agency",
  "Pixel Studio",
  "BuildCo",
  "Nova Digital",
  "Spark Labs",
  "Crest Media",
  "Forge Co",
  "Bloom Agency",
];

const PROCESS = [
  {
    step: "01",
    title: "Apply",
    desc: "Fill out our partner application. Most applicants hear back within 2 business days.",
  },
  {
    step: "02",
    title: "Get certified",
    desc: "Complete our free online certification course. Takes about 3 hours at your own pace.",
  },
  {
    step: "03",
    title: "Get listed",
    desc: "Your profile goes live in our partner directory — visible to 1M+ merchants.",
  },
  {
    step: "04",
    title: "Grow together",
    desc: "Access co-marketing, joint deals, and your dedicated partner manager.",
  },
];

const FAQS = [
  {
    q: "Is there a cost to join?",
    a: "No — the ShopPress Partner Program is completely free to join. We make money when our partners and merchants succeed.",
  },
  {
    q: "How does the referral commission work?",
    a: "Agency and education partners earn 25% recurring commission on every merchant they refer. Commissions are paid monthly with no cap.",
  },
  {
    q: "How long does certification take?",
    a: "The certification course takes approximately 3 hours and is fully self-paced. You can complete it on your schedule.",
  },
  {
    q: "Can I be both an agency and technology partner?",
    a: "Yes — many partners participate in multiple tracks. You'll get a combined dashboard and a single partner manager.",
  },
];

export default function PartnerPage({ onNavigate, user, onLogout }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: "agency",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitted(true);
    toast.success(
      "Application submitted! We'll review it within 2 business days.",
    );
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(0,182,122,0.2)",
            color: "#4ade80",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 99,
            padding: "4px 14px",
            marginBottom: 20,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Partner Program
        </span>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 600,
            margin: "0 auto 16px",
          }}
        >
          Grow your business
          <br />
          by growing ours
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 460,
            margin: "0 auto 40px",
            lineHeight: 1.75,
          }}
        >
          Join 800+ agencies, developers, and educators who partner with
          ShopPress to deliver more value to their clients and audiences.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{ ...btnStyle("green", "lg"), fontSize: 15 }}
            onClick={() =>
              document
                .getElementById("apply-form")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Apply to partner →
          </button>
          <button
            style={{
              ...btnStyle("outline", "lg"),
              background: "transparent",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.25)",
              fontSize: 15,
            }}
            onClick={() => onNavigate("referral")}
          >
            Affiliate program instead
          </button>
        </div>
        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 56,
          }}
        >
          {[
            ["800+", "Active partners"],
            ["1M+", "Merchant reach"],
            ["25%", "Recurring commission"],
            ["48h", "Avg approval time"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-0.5px",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 2,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section
        style={{
          padding: "clamp(24px,4vw,28px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#aaa",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Partners include
          </span>
          {LOGOS.map((l) => (
            <span
              key={l}
              style={{ fontSize: 14, fontWeight: 600, color: "#ccc" }}
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.5px",
              }}
            >
              Choose your track
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              Different ways to partner, all with real business benefits.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 20,
            }}
          >
            {PARTNER_TYPES.map((pt) => (
              <div
                key={pt.title}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 20,
                  padding: "28px 24px",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{pt.icon}</div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 8,
                    textTransform: "capitalize",
                  }}
                >
                  {pt.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  {pt.desc}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {pt.perks.map((p) => (
                    <li
                      key={p}
                      style={{
                        fontSize: 13,
                        color: "#444",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "#00b67a",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>{" "}
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 34,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            How it works
          </h2>
          <p style={{ fontSize: 16, color: "#666", marginBottom: 48 }}>
            From application to first client in under a week.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: 32,
            }}
          >
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#e6f9f2",
                    border: "2px solid #c8f0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#00b67a",
                    fontSize: 15,
                    margin: "0 auto 16px",
                  }}
                >
                  {p.step}
                </div>
                {i < PROCESS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 26,
                      left: "calc(50% + 30px)",
                      right: "calc(-50% + 30px)",
                      height: 2,
                      background: "#f0f0f0",
                    }}
                  />
                )}
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 32,
              textAlign: "center",
              letterSpacing: "-0.3px",
            }}
          >
            Questions & answers
          </h2>
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 22px",
                    background: openFaq === i ? "#fafafa" : "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#111",
                    borderBottom:
                      i < FAQS.length - 1 || openFaq === i
                        ? "1px solid #f0f0f0"
                        : "none",
                    gap: 12,
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                  <span
                    style={{
                      fontSize: 20,
                      color: "#aaa",
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "16px 22px 20px",
                      background: "#fafafa",
                      borderBottom:
                        i < FAQS.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "#666",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section
        id="apply-form"
        style={{ padding: "72px 40px 80px", background: "#fafafa" }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.5px",
              }}
            >
              Apply to partner
            </h2>
            <p style={{ fontSize: 15, color: "#666" }}>
              We review all applications within 2 business days.
            </p>
          </div>
          {submitted ? (
            <div
              style={{
                background: "#f4fdf9",
                border: "1px solid #c8f0e0",
                borderRadius: 16,
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                Application received!
              </h3>
              <p style={{ fontSize: 14, color: "#666" }}>
                We'll review your application and get back to you at{" "}
                <strong>{form.email}</strong> within 2 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 20,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  ["Full name", "name", "Alex Johnson"],
                  ["Company", "company", "Acme Agency"],
                ].map(([label, key, placeholder]) => (
                  <div key={key}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#444",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {label} *
                    </label>
                    <input
                      type="text"
                      value={form[key]}
                      onChange={set(key)}
                      placeholder={placeholder}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #ddd",
                        borderRadius: 10,
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#444",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Work email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@company.com"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
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
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#444",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Partner track *
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["agency", "technology", "education"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setForm((f) => ({ ...f, type }))}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 99,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        border: "1px solid",
                        background: form.type === type ? "#111" : "#fff",
                        color: form.type === type ? "#fff" : "#555",
                        borderColor: form.type === type ? "#111" : "#ddd",
                        transition: "all 0.15s",
                        textTransform: "capitalize",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#444",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Tell us about your business
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={3}
                  placeholder="What do you do, who are your clients, and why do you want to partner with ShopPress?"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{ ...btnStyle("green", "lg"), justifyContent: "center" }}
              >
                Submit application →
              </button>
            </form>
          )}
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
