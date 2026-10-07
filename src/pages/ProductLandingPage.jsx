import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { addToCart } from "../cartStore.js";

const FEATURES = [
  {
    icon: "🪔",
    title: "Adjustable color temperature",
    desc: "Dial from warm amber (2700K) to cool daylight (6500K) with a whisper-quiet rotary knob. Perfect for any time of day or task.",
  },
  {
    icon: "⚡",
    title: "15W USB-C fast charge",
    desc: "The lamp base doubles as a fast charger. Keep your phone topped up without reaching for an extra cable.",
  },
  {
    icon: "🔆",
    title: "5 brightness levels",
    desc: "From a subtle 10% glow for late-night focus to 100% for detailed work. Flicker-free at every level.",
  },
  {
    icon: "🏗️",
    title: "Aircraft-grade aluminum",
    desc: "Built from a single billet of aluminum. Virtually indestructible, with a satin finish that looks better over time.",
  },
  {
    icon: "🌙",
    title: "Memory function",
    desc: "Powers on at your last-used brightness and color temperature. No fiddling every morning.",
  },
  {
    icon: "♻️",
    title: "10-year LED lifespan",
    desc: "50,000 hours of light. That's over 13 years of 10-hour days. You'll never replace a bulb again.",
  },
];

const REVIEWS = [
  {
    name: "Sarah K.",
    rating: 5,
    date: "May 20, 2026",
    initials: "SK",
    bg: "#e6f9f2",
    color: "#00b67a",
    text: "I've been through five desk lamps in three years. This is the one I'm keeping forever. The build quality is unlike anything in this price range.",
  },
  {
    name: "James L.",
    rating: 5,
    date: "May 14, 2026",
    initials: "JL",
    bg: "#e3f2fd",
    color: "#2196f3",
    text: "The USB-C charging alone is worth the price. My desk has never been cleaner. The light quality is exceptional — no eye strain after 8-hour sessions.",
  },
  {
    name: "Priya M.",
    rating: 5,
    date: "May 8, 2026",
    initials: "PM",
    bg: "#ede9fe",
    color: "#7c3aed",
    text: "Bought this for my home office and immediately ordered one for my partner. The warm/cool temperature dial is something I didn't know I needed until now.",
  },
  {
    name: "Tom R.",
    rating: 4,
    date: "Apr 30, 2026",
    initials: "TR",
    bg: "#fef3c7",
    color: "#d97706",
    text: "Incredible lamp. Took off one star only because I wish the arm were slightly more adjustable. But the light quality and build are flawless.",
  },
];

const FAQS = [
  {
    q: "What's in the box?",
    a: "The Minimal Desk Lamp, a 1.5m USB-C cable, a quick-start guide, and a microfibre polishing cloth.",
  },
  {
    q: "Does it work with my country's voltage?",
    a: "Yes. The power adapter is universal (100–240V, 50/60Hz) and works in all countries. A plug adapter may be required depending on your region.",
  },
  {
    q: "Can I use it without the USB-C charging feature?",
    a: "Absolutely. The USB-C port on the base is a bonus feature — the lamp functions completely independently of it.",
  },
  {
    q: "What's the return policy?",
    a: "30-day hassle-free returns. If you're not happy for any reason, contact us and we'll arrange a free return and full refund.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping is 5–7 business days. Express (2–3 days) and overnight options are available at checkout.",
  },
];

const VARIANTS = ["Matte Black", "White", "Brushed Silver"];

export default function ProductLandingPage({ onNavigate, user, onLogout }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleAdd = () => {
    addToCart(
      {
        id: 1,
        name: "Minimal Desk Lamp",
        price: 89,
        emoji: "🪔",
        color: "#fef3c7",
        variant: VARIANTS[selectedVariant],
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "88vh",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          alignItems: "center",
          gap: 64,
        }}
      >
        {/* Product visual */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #fef3c7, #fff8e1)",
              borderRadius: 32,
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 160,
              position: "relative",
              overflow: "hidden",
            }}
          >
            🪔
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle, rgba(255,200,50,0.4) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
          </div>
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              background: "#111",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 99,
              padding: "6px 14px",
            }}
          >
            Bestseller
          </div>
          {/* Rating badge */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <span style={{ color: "#f59e0b", fontSize: 14 }}>★★★★★</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>4.8</span>
            <span style={{ fontSize: 12, color: "#aaa" }}>(124 reviews)</span>
          </div>
        </div>

        {/* Product info */}
        <div>
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
            Home · Lighting
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              marginBottom: 12,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Minimal
            <br />
            Desk Lamp
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 24,
              maxWidth: 400,
            }}
          >
            The last desk lamp you'll ever buy. Aircraft-grade aluminum,
            adjustable color temperature, and a built-in 15W USB-C charger.
          </p>

          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-1.5px",
              marginBottom: 24,
            }}
          >
            $89
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#aaa",
                marginLeft: 8,
              }}
            >
              free shipping over $50
            </span>
          </div>

          {/* Variants */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#555",
                marginBottom: 10,
              }}
            >
              Color:{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                {VARIANTS[selectedVariant]}
              </span>
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {VARIANTS.map((v, i) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(i)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    border: `2px solid ${selectedVariant === i ? "#111" : "#ddd"}`,
                    background: selectedVariant === i ? "#111" : "#fff",
                    color: selectedVariant === i ? "#fff" : "#555",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e5e5e5",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: 44,
                  height: 48,
                  background: "#fafafa",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#555",
                }}
              >
                −
              </button>
              <span
                style={{
                  width: 44,
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: 44,
                  height: 48,
                  background: "#fafafa",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#555",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              style={{
                ...btnStyle(added ? "outline" : "green", "lg"),
                flex: 1,
                justifyContent: "center",
                background: added ? "#e6f9f2" : "#00b67a",
                color: added ? "#00895a" : "#fff",
                border: added ? "1px solid #c8f0e0" : "none",
              }}
            >
              {added ? "✓ Added to cart!" : "Add to cart — $" + 89 * qty}
            </button>
          </div>
          <button
            style={{
              ...btnStyle("outline", "lg"),
              width: "100%",
              justifyContent: "center",
            }}
            onClick={() => onNavigate("checkout")}
          >
            Buy now
          </button>

          {/* Trust signals */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
              padding: "16px 0",
              borderTop: "1px solid #f0f0f0",
              flexWrap: "wrap",
            }}
          >
            {[
              "🚚 Free shipping over $50",
              "↩️ 30-day returns",
              "🔒 Secure checkout",
              "✅ In stock",
            ].map((t) => (
              <span key={t} style={{ fontSize: 12, color: "#888" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "clamp(24px,4vw,80px) clamp(16px,4vw,40px)",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "-0.5px",
              }}
            >
              Designed for the way you work
            </h2>
            <p style={{ fontSize: 16, color: "#666" }}>
              Every detail considered. Nothing wasted.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "24px",
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
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <section
        style={{
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          {[
            ["12W", "Power consumption"],
            ["50,000h", "LED lifespan"],
            ["2700–6500K", "Color range"],
            ["5", "Brightness levels"],
            ["15W", "USB-C output"],
          ].map(([val, label], i) => (
            <div
              key={label}
              style={{
                padding: "28px 20px",
                textAlign: "center",
                borderRight: i < 4 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#00b67a",
                  letterSpacing: "-0.5px",
                  marginBottom: 4,
                }}
              >
                {val}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "clamp(24px,4vw,80px) clamp(16px,4vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 34,
                  fontWeight: 700,
                  marginBottom: 4,
                  letterSpacing: "-0.5px",
                }}
              >
                What customers say
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#f59e0b", fontSize: 18 }}>★★★★★</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  4.8 out of 5
                </span>
                <span style={{ fontSize: 14, color: "#aaa" }}>
                  · 124 verified reviews
                </span>
              </div>
            </div>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("product-1")}
            >
              Write a review
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <div
                  style={{ color: "#f59e0b", fontSize: 14, marginBottom: 12 }}
                >
                  {"★".repeat(r.rating)}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#444",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  "{r.text}"
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
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: r.bg,
                      color: r.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{r.date}</div>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      background: "#e6f9f2",
                      color: "#00895a",
                      borderRadius: 99,
                      padding: "2px 8px",
                      fontWeight: 600,
                    }}
                  >
                    Verified
                  </span>
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
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 32,
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

      {/* FINAL CTA */}
      <section
        style={{
          padding: "clamp(24px,4vw,88px) clamp(16px,4vw,40px)",
          textAlign: "center",
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 24 }}>🪔</div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
            letterSpacing: "-1px",
          }}
        >
          Light up your workspace.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            marginBottom: 36,
            maxWidth: 420,
            margin: "0 auto 36px",
          }}
        >
          Free shipping. 30-day returns. In stock and ready to ship today.
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
            style={{
              ...btnStyle("green", "lg"),
              fontSize: 16,
              padding: "14px 32px",
            }}
            onClick={handleAdd}
          >
            Add to cart — $89
          </button>
          <button
            style={{
              ...btnStyle("outline", "lg"),
              background: "transparent",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
              fontSize: 16,
              padding: "14px 32px",
            }}
            onClick={() => onNavigate("store")}
          >
            Browse all products
          </button>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
