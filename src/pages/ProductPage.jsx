import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { addToCart } from "../cartStore.js";
import { useToast } from "../components/Toast.jsx";

const PRODUCTS = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: 89,
    category: "Home",
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    emoji: "🪔",
    color: "#fef3c7",
    description:
      "A beautifully simple desk lamp designed for focus. Adjustable color temperature from warm amber to cool daylight. Whisper-quiet dimmer. Charges your phone via USB-C base.",
    specs: [
      ["Material", "Aircraft-grade aluminum"],
      ["Light source", "LED (3000–6500K)"],
      ["Wattage", "12W"],
      ["USB-C output", "15W fast charge"],
      ["Dimensions", "35cm × 12cm base"],
    ],
    variants: ["Matte Black", "White", "Brushed Silver"],
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Kit",
    price: 64,
    category: "Kitchen",
    rating: 4.9,
    reviews: 87,
    badge: "New",
    emoji: "☕",
    color: "#e0f7fa",
    description:
      "Hand-thrown ceramic dripper, server, and filters in one kit. Brews a clean, nuanced cup. Dishwasher safe. Comes in a beautiful gift-ready box.",
    specs: [
      ["Material", "High-fired stoneware"],
      ["Capacity", "600ml server"],
      ["Filters", "100 unbleached included"],
      ["Compatible", "Size 2 filters"],
      ["Weight", "680g"],
    ],
    variants: ["Cream", "Slate", "Terracotta"],
  },
  {
    id: 3,
    name: "Linen Notebook A5",
    price: 28,
    category: "Stationery",
    rating: 4.7,
    reviews: 203,
    badge: null,
    emoji: "📓",
    color: "#f3e8ff",
    description:
      "192 pages of 100gsm ivory paper in a natural linen cover. Lay-flat binding, ribbon bookmark, and back pocket. Perfect for journaling, sketching, or daily planning.",
    specs: [
      ["Pages", "192 (96 leaves)"],
      ["Paper weight", "100gsm ivory"],
      ["Size", "A5 (148 × 210mm)"],
      ["Binding", "Swiss lay-flat"],
      ["Ruling", "Dotted or lined"],
    ],
    variants: ["Natural Linen", "Midnight", "Forest"],
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 49,
    category: "Tech",
    rating: 4.6,
    reviews: 341,
    badge: "Sale",
    emoji: "⚡",
    color: "#e6f9f2",
    description:
      "15W fast wireless charging for Qi-compatible devices. Works through cases up to 5mm. Soft-touch surface with anti-slip base. Silent LED indicator.",
    specs: [
      ["Output", "15W max"],
      ["Input", "USB-C 20W"],
      ["Compatible", "Qi devices"],
      ["Case compatible", "Up to 5mm"],
      ["Dimensions", "100mm diameter"],
    ],
    variants: ["Black", "White"],
  },
];

const REVIEWS = [
  {
    name: "Clara M.",
    rating: 5,
    date: "May 20, 2026",
    text: "Absolutely love this. Exactly as described — quality feels premium and it arrived fast.",
    initials: "CM",
    bg: "#e6f9f2",
    color: "#00b67a",
  },
  {
    name: "Daniel K.",
    rating: 5,
    date: "May 12, 2026",
    text: "Bought this as a gift and the recipient was thrilled. Beautiful packaging too.",
    initials: "DK",
    bg: "#e3f2fd",
    color: "#2196f3",
  },
  {
    name: "Priya S.",
    rating: 4,
    date: "Apr 30, 2026",
    text: "Really happy with the purchase. Only minor note — the box had a small dent but the product inside was perfect.",
    initials: "PS",
    bg: "#ede9fe",
    color: "#7c3aed",
  },
];

export default function ProductPage({ productId, onNavigate, user, onLogout }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const toast = useToast();

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        color: product.color,
        variant: product.variants?.[selectedVariant] || "Default",
      },
      qty,
    );
    setAdded(true);
    toast.success(`${product.emoji} ${product.name} added to cart`);
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

      {/* BREADCRUMB */}
      <div
        style={{
          padding: "clamp(24px,4vw,16px) clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
          fontSize: 13,
          color: "#aaa",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#aaa",
            fontFamily: "'DM Sans', sans-serif",
            padding: 0,
          }}
        >
          Home
        </button>
        <span>›</span>
        <button
          onClick={() => onNavigate("store")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#aaa",
            fontFamily: "'DM Sans', sans-serif",
            padding: 0,
          }}
        >
          Store
        </button>
        <span>›</span>
        <span style={{ color: "#555" }}>{product.name}</span>
      </div>

      {/* PRODUCT MAIN */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px)",
        }}
      >
        {/* Image */}
        <div style={{ paddingRight: 40 }}>
          <div
            style={{
              background: product.color,
              borderRadius: 20,
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              marginBottom: 16,
            }}
          >
            {product.emoji}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[product.emoji, product.emoji, product.emoji].map((e, i) => (
              <div
                key={i}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  background: product.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  border: i === 0 ? "2px solid #00b67a" : "1px solid #ebebeb",
                  cursor: "pointer",
                }}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <span
              style={{
                display: "inline-block",
                background:
                  product.badge === "Sale"
                    ? "#fce8e8"
                    : product.badge === "New"
                      ? "#e3f2fd"
                      : "#e6f9f2",
                color:
                  product.badge === "Sale"
                    ? "#ef4444"
                    : product.badge === "New"
                      ? "#2196f3"
                      : "#00b67a",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 99,
                padding: "3px 12px",
                marginBottom: 14,
              }}
            >
              {product.badge}
            </span>
          )}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 18,
            }}
          >
            <span style={{ color: "#f59e0b" }}>
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {product.rating}
            </span>
            <span style={{ fontSize: 13, color: "#aaa" }}>
              ({product.reviews} reviews)
            </span>
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: 24,
              color: "#111",
            }}
          >
            ${product.price}
          </div>

          {/* Variants */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 10,
                color: "#555",
              }}
            >
              Color:{" "}
              <span style={{ color: "#111" }}>
                {product.variants[selectedVariant]}
              </span>
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {product.variants.map((v, i) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(i)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border:
                      selectedVariant === i
                        ? "2px solid #00b67a"
                        : "1px solid #ddd",
                    background: selectedVariant === i ? "#f4fdf9" : "#fff",
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: selectedVariant === i ? "#00b67a" : "#555",
                    transition: "all 0.15s",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: 40,
                  height: 44,
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
                  width: 40,
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
                  width: 40,
                  height: 44,
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
              {added ? "✓ Added to cart!" : "Add to cart"}
            </button>
          </div>
          <button
            style={{
              ...btnStyle("outline", "lg"),
              width: "100%",
              justifyContent: "center",
            }}
          >
            Buy now
          </button>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 24,
              padding: "16px 0",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            {[
              "🚚 Free shipping over $50",
              "↩️ 30-day returns",
              "🔒 Secure checkout",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  color: "#888",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section
        style={{
          borderTop: "1px solid #f0f0f0",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        <div
          style={{ display: "flex", gap: 0, borderBottom: "1px solid #f0f0f0" }}
        >
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "14px 24px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#00b67a" : "#777",
                borderBottom: `2px solid ${activeTab === tab ? "#00b67a" : "transparent"}`,
                marginBottom: -1,
                textTransform: "capitalize",
              }}
            >
              {tab === "reviews"
                ? `Reviews (${product.reviews})`
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ padding: "28px 0 48px" }}>
          {activeTab === "description" && (
            <p
              style={{
                fontSize: 15,
                color: "#555",
                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              {product.description}
            </p>
          )}
          {activeTab === "specs" && (
            <div style={{ maxWidth: 500 }}>
              {product.specs.map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    padding: "12px 0",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "#888",
                      width: 160,
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div style={{ maxWidth: 680 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 32,
                  padding: "24px",
                  background: "#fafafa",
                  borderRadius: 16,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      letterSpacing: "-2px",
                    }}
                  >
                    {product.rating}
                  </div>
                  <div style={{ color: "#f59e0b", fontSize: 18 }}>
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>
                    {product.reviews} reviews
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div
                      key={star}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ fontSize: 12, color: "#888", width: 12 }}>
                        {star}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          background: "#f0f0f0",
                          borderRadius: 99,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width:
                              star === 5 ? "70%" : star === 4 ? "20%" : "5%",
                            background: "#f59e0b",
                            borderRadius: 99,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: r.bg,
                        color: r.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {r.initials}
                    </div>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {r.name}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "#aaa", marginLeft: 10 }}
                      >
                        {r.date}
                      </span>
                    </div>
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#f59e0b",
                        fontSize: 13,
                      }}
                    >
                      {"★".repeat(r.rating)}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "56px 40px 72px",
          background: "#fafafa",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: "-0.3px",
            }}
          >
            You might also like
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
              gap: 16,
            }}
          >
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate("product-" + p.id)}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 14,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: 130,
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 52,
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ padding: "14px" }}>
                  <h3
                    style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}
                  >
                    {p.name}
                  </h3>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>
                    ${p.price}
                  </span>
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
