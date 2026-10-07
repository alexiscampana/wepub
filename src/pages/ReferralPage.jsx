import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const TIERS = [
  {
    name: "Starter",
    icon: "🌱",
    commission: "20%",
    threshold: "$0",
    perks: [
      "Unique referral link",
      "Real-time dashboard",
      "Monthly payouts",
      "Email support",
    ],
  },
  {
    name: "Growth",
    icon: "🚀",
    commission: "25%",
    threshold: "$500 earned",
    perks: [
      "Everything in Starter",
      "Priority payouts",
      "Co-branded materials",
      "Dedicated manager",
    ],
  },
  {
    name: "Elite",
    icon: "💎",
    commission: "30%",
    threshold: "$2,000 earned",
    perks: [
      "Everything in Growth",
      "Custom landing pages",
      "Revenue share bonuses",
      "VIP partner events",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "🔗",
    title: "Get your link",
    desc: "Sign up and instantly receive a unique referral link to share anywhere.",
  },
  {
    step: "02",
    icon: "📣",
    title: "Share it",
    desc: "Share via your blog, newsletter, social media, YouTube, or anywhere your audience lives.",
  },
  {
    step: "03",
    icon: "💰",
    title: "Earn commission",
    desc: "Earn 20–30% recurring commission on every paying customer you refer — for as long as they stay.",
  },
  {
    step: "04",
    icon: "🏦",
    title: "Get paid",
    desc: "Payouts via PayPal or bank transfer on the 1st of every month. No minimum threshold.",
  },
];

const TESTIMONIALS = [
  {
    name: "Lena K.",
    role: "Content creator, 45k followers",
    initials: "LK",
    bg: "#e6f9f2",
    color: "#00b67a",
    earned: "$3,200 earned",
    quote:
      "I mentioned ShopPress in one YouTube video and made enough to cover my rent. The recurring commissions keep compounding every month.",
  },
  {
    name: "Marco B.",
    role: "E-commerce consultant",
    initials: "MB",
    bg: "#e3f2fd",
    color: "#2196f3",
    earned: "$8,500 earned",
    quote:
      "I recommend ShopPress to every client I work with. The 25% recurring commission is the best affiliate deal I've found in this space.",
  },
  {
    name: "Aisha T.",
    role: "Blogger & course creator",
    initials: "AT",
    bg: "#ede9fe",
    color: "#7c3aed",
    earned: "$1,800 earned",
    quote:
      "Set it up once, earn forever. My first referral from 8 months ago is still paying me commission every single month.",
  },
];

const FAQS = [
  {
    q: "How long do cookies last?",
    a: "Our referral cookies last 90 days. If someone clicks your link and subscribes within 90 days, you earn the commission.",
  },
  {
    q: "Do I earn on renewals?",
    a: "Yes — you earn your commission percentage on every renewal payment, not just the first. It's truly recurring income.",
  },
  {
    q: "When do I get paid?",
    a: "Payouts are processed on the 1st of every month for the previous month's earnings. We pay via PayPal or bank transfer.",
  },
  {
    q: "Is there a minimum payout?",
    a: "No minimum. Even if you earned $5 last month, it gets paid out. We don't hold your money.",
  },
  {
    q: "Can I refer existing ShopPress users?",
    a: "Only new customers count. If someone already has a ShopPress account, referring them won't generate a commission.",
  },
  {
    q: "What promotional materials do you provide?",
    a: "We provide banners, logos, product screenshots, email templates, and copy you can use. Growth and Elite affiliates get co-branded assets.",
  },
];

export default function ReferralPage({ onNavigate, user, onLogout }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

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
          💸 Earn up to 30% recurring commission
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 5vw, 54px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-1px",
            maxWidth: 640,
            margin: "0 auto 16px",
          }}
        >
          Refer ShopPress.
          <br />
          <span style={{ color: "#00b67a" }}>Earn every month.</span>
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
          Share ShopPress with your audience and earn recurring commissions for
          every customer you bring in — forever.
        </p>

        {joined ? (
          <div
            style={{
              maxWidth: 420,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #c8f0e0",
              borderRadius: 20,
              padding: "28px",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              You're on the list!
            </h3>
            <p style={{ fontSize: 14, color: "#666" }}>
              We'll send your affiliate dashboard link to{" "}
              <strong>{email}</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: 440,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 20,
              padding: "24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#555",
                marginBottom: 14,
              }}
            >
              Apply to become an affiliate
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "11px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                style={btnStyle("green")}
                onClick={() => email.includes("@") && setJoined(true)}
              >
                Apply now
              </button>
            </div>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 10 }}>
              Free to join. No approval wait time.
            </p>
          </div>
        )}

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 52,
          }}
        >
          {[
            ["$2.4M+", "Paid to affiliates"],
            ["4,200+", "Active affiliates"],
            ["90 days", "Cookie duration"],
            ["20–30%", "Recurring commission"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-0.5px",
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
              How it works
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              Start earning in under 5 minutes.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: 24,
            }}
          >
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.step}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#f4fdf9",
                    border: "2px solid #c8f0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    margin: "0 auto 16px",
                  }}
                >
                  {step.icon}
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 28,
                      left: "calc(50% + 32px)",
                      right: "calc(-50% + 32px)",
                      height: 2,
                      background: "#f0f0f0",
                    }}
                  />
                )}
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#00b67a",
                    letterSpacing: "0.08em",
                    marginBottom: 6,
                  }}
                >
                  STEP {step.step}
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
              Commission tiers
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              The more you refer, the more you earn. Tiers unlock automatically.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: 16,
            }}
          >
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                style={{
                  background: "#fff",
                  border: i === 1 ? "2px solid #00b67a" : "1px solid #ebebeb",
                  borderRadius: 20,
                  padding: "28px 24px",
                  position: "relative",
                }}
              >
                {i === 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#00b67a",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 99,
                      padding: "4px 14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <div style={{ fontSize: 36, marginBottom: 12 }}>
                  {tier.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {tier.name}
                </h3>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
                  Unlocks at {tier.threshold}
                </p>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#00b67a",
                    letterSpacing: "-1px",
                    marginBottom: 20,
                  }}
                >
                  {tier.commission}
                </div>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #f0f0f0",
                    marginBottom: 16,
                  }}
                />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {tier.perks.map((p) => (
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
                      <span style={{ color: "#00b67a", fontWeight: 700 }}>
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

      {/* TESTIMONIALS */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 34,
              fontWeight: 700,
              marginBottom: 40,
              textAlign: "center",
              letterSpacing: "-0.5px",
            }}
          >
            What affiliates say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
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
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#e6f9f2",
                    color: "#00895a",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 99,
                    padding: "4px 12px",
                    marginBottom: 14,
                  }}
                >
                  {t.earned}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingTop: 14,
                    borderTop: "1px solid #f5f5f5",
                  }}
                >
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

      {/* FAQ */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 36,
              textAlign: "center",
              letterSpacing: "-0.5px",
            }}
          >
            Frequently asked questions
          </h2>
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
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

      {/* CTA */}
      <section
        style={{
          padding: "clamp(24px,4vw,80px) clamp(16px,4vw,40px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Ready to start earning?
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Free to join. No approval wait. Start sharing in minutes.
        </p>
        <button
          style={btnStyle("green", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Join the affiliate program →
        </button>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
