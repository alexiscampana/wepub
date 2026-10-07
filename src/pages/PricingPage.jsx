import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";

const PLANS = [
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 23,
    desc: "For new creators and small shops.",
    color: "#555",
    badge: null,
    features: [
      "Up to 100 products",
      "5 content pages",
      "Basic analytics",
      "2 staff accounts",
      "SSL certificate",
      "Email support",
      "ShopPress subdomain",
      "Community access",
    ],
    missing: [
      "Custom domain",
      "Abandoned cart recovery",
      "Priority support",
      "Advanced SEO",
      "API access",
    ],
    cta: "Get started",
  },
  {
    name: "Grow",
    monthlyPrice: 79,
    annualPrice: 63,
    desc: "For scaling businesses and publishers.",
    color: "#00b67a",
    badge: "Most popular",
    features: [
      "Unlimited products",
      "Unlimited content & blog",
      "Advanced analytics",
      "5 staff accounts",
      "Custom domain",
      "Abandoned cart recovery",
      "Priority email & chat",
      "Advanced SEO tools",
      "Plugin marketplace",
    ],
    missing: [
      "Dedicated support",
      "Custom integrations",
      "White-label",
      "API access (full)",
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    desc: "For large teams and high-volume stores.",
    color: "#7c3aed",
    badge: null,
    features: [
      "Everything in Grow",
      "Unlimited staff accounts",
      "Dedicated account manager",
      "SLA & 99.99% uptime",
      "Custom integrations",
      "White-label option",
      "Full API access",
      "SSO / SAML auth",
      "Advanced security & audit logs",
    ],
    missing: [],
    cta: "Contact sales",
  },
];

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "Are there transaction fees?",
    a: "Never. ShopPress charges zero transaction fees on any plan — you keep 100% of your revenue.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
  {
    q: "Do you offer nonprofit or student discounts?",
    a: "Yes — contact our sales team and we'll work something out for eligible organizations.",
  },
];

export default function PricingPage({ onNavigate, user, onLogout }) {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
        activePage="pricing"
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
          Pricing
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-1px",
          }}
        >
          Simple, transparent pricing
        </h1>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          No hidden fees. No transaction cuts. Cancel anytime.
        </p>

        {/* Toggle */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "#f0f0f0",
            borderRadius: 99,
            padding: "4px",
          }}
        >
          <button
            onClick={() => setAnnual(false)}
            style={{
              padding: "8px 20px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              background: !annual ? "#fff" : "transparent",
              color: !annual ? "#111" : "#777",
              boxShadow: !annual ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            style={{
              padding: "8px 20px",
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              background: annual ? "#fff" : "transparent",
              color: annual ? "#111" : "#777",
              boxShadow: annual ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Annual
            <span
              style={{
                background: "#e6f9f2",
                color: "#00895a",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 99,
                padding: "2px 8px",
              }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* PLANS */}
      <section
        style={{
          padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px)",
          maxWidth: 1060,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 16,
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: "#fff",
                border:
                  plan.name === "Grow"
                    ? "2px solid #00b67a"
                    : "1px solid #ebebeb",
                borderRadius: 20,
                padding: "28px 24px",
                position: "relative",
                boxShadow:
                  plan.name === "Grow"
                    ? "0 8px 32px rgba(0,182,122,0.12)"
                    : "none",
              }}
            >
              {plan.badge && (
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
                    padding: "4px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.badge}
                </div>
              )}
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: plan.color,
                }}
              >
                {plan.name}
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
                {plan.desc}
              </p>

              {plan.monthlyPrice ? (
                <div style={{ marginBottom: 20 }}>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      letterSpacing: "-1px",
                    }}
                  >
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span style={{ fontSize: 14, color: "#888" }}> / month</span>
                  {annual && (
                    <div
                      style={{ fontSize: 12, color: "#00895a", marginTop: 2 }}
                    >
                      Billed annually (${plan.annualPrice * 12}/yr)
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-1px",
                    marginBottom: 20,
                  }}
                >
                  Custom
                </div>
              )}

              <button
                onClick={() =>
                  plan.name === "Enterprise"
                    ? onNavigate("enterprise")
                    : onNavigate("signup")
                }
                style={{
                  ...btnStyle(
                    plan.name === "Grow"
                      ? "green"
                      : plan.name === "Enterprise"
                        ? "outline"
                        : "outline",
                    "md",
                  ),
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: 24,
                  padding: "11px 18px",
                }}
              >
                {plan.cta}
              </button>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #f0f0f0",
                  marginBottom: 20,
                }}
              />

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 13,
                      color: "#444",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        color: "#00b67a",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>{" "}
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 13,
                      color: "#ccc",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span style={{ flexShrink: 0, marginTop: 1 }}>—</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section
        style={{
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
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
            "No transaction fees",
            "Cancel anytime",
            "14-day free trial",
            "SOC 2 certified",
            "99.99% uptime",
          ].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 13,
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#00b67a", fontWeight: 700 }}>✓</span> {t}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "clamp(24px,4vw,72px) clamp(16px,4vw,40px)",
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
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
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "18px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#111",
                  textAlign: "left",
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: 20,
                    color: "#aaa",
                    transition: "transform 0.2s",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.7,
                    paddingBottom: 18,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(24px,4vw,64px) clamp(16px,4vw,40px)",
          textAlign: "center",
          background: "linear-gradient(135deg, #f4fdf9 0%, #eff6ff 100%)",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Start free for 14 days
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          No credit card required. Upgrade whenever you're ready.
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
            style={btnStyle("green", "lg")}
            onClick={() => onNavigate("signup")}
          >
            Get started free
          </button>
          <button
            style={btnStyle("outline", "lg")}
            onClick={() => onNavigate("enterprise")}
          >
            Talk to sales
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
