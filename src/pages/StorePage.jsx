import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";
import { SkeletonProductGrid } from "../components/Skeletons.jsx";
import { addToCart } from "../cartStore.js";

const FALLBACK_PRODUCTS = [
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
  },
  {
    id: 5,
    name: "Bamboo Desk Organizer",
    price: 39,
    category: "Home",
    rating: 4.5,
    reviews: 56,
    badge: null,
    emoji: "🗂️",
    color: "#fce8e8",
  },
  {
    id: 6,
    name: "Scented Soy Candle",
    price: 32,
    category: "Home",
    rating: 4.9,
    reviews: 178,
    badge: "Bestseller",
    emoji: "🕯️",
    color: "#fff8e1",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 149,
    category: "Tech",
    rating: 4.8,
    reviews: 92,
    badge: null,
    emoji: "⌨️",
    color: "#e3f2fd",
  },
  {
    id: 8,
    name: "Hardcover Planner 2026",
    price: 44,
    category: "Stationery",
    rating: 4.7,
    reviews: 265,
    badge: "New",
    emoji: "📅",
    color: "#e8f5e9",
  },
];

const CATEGORIES = ["All", "Home", "Kitchen", "Stationery", "Tech"];

export default function StorePage({ onNavigate, user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { getProducts } = await import("../supabaseService.js");
        const { data, error } = await getProducts({ limit: 50 });
        if (!error && data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch {
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()));

  const handleAddToCart = (product) => {
    addToCart({ ...product, variant: product.variant || "Default" });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
    toast.success(`${product.emoji || "🛍️"} ${product.name} added to cart`);
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

      {/* STORE HEADER */}
      <section
        style={{
          padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px) 32px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#00b67a",
              marginBottom: 8,
            }}
          >
            Demo Store
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            ShopPress Market
          </h1>
          <p style={{ fontSize: 15, color: "#777", marginTop: 6 }}>
            A sample store showing what you can build with ShopPress.
          </p>
        </div>
        <button
          onClick={() => onNavigate("cart")}
          style={{
            ...btnStyle("outline"),
            position: "relative",
            padding: "10px 20px",
          }}
        >
          🛒 View cart
        </button>
      </section>

      {/* FILTER BAR */}
      <section
        style={{
          padding: "20px clamp(16px,4vw,40px)",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "7px 16px",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                border: "1px solid",
                background: category === c ? "#111" : "#fff",
                color: category === c ? "#fff" : "#555",
                borderColor: category === c ? "#111" : "#ddd",
                transition: "all 0.15s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="🔍  Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ddd",
            borderRadius: 10,
            fontSize: 14,
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
            width: 220,
          }}
        />
      </section>

      {/* PRODUCTS */}
      <section
        style={{ padding: "clamp(20px,3vw,40px) clamp(16px,4vw,40px) 72px" }}
      >
        {loading ? (
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SkeletonProductGrid count={8} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "64px 0", color: "#aaa" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 16 }}>No products found for "{search}"</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: 20,
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {filtered.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.09)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Product image placeholder */}
                <div
                  style={{
                    height: 160,
                    background: product.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    position: "relative",
                  }}
                >
                  {product.emoji}
                  {product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background:
                          product.badge === "Sale"
                            ? "#ef4444"
                            : product.badge === "New"
                              ? "#2196f3"
                              : "#00b67a",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 99,
                        padding: "3px 10px",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#aaa",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {product.category}
                  </p>
                  <h3
                    style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}
                  >
                    {product.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>
                      {"★".repeat(Math.floor(product.rating))}
                    </span>
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        ...btnStyle(added === product.id ? "outline" : "green"),
                        padding: "7px 14px",
                        fontSize: 12,
                        background:
                          added === product.id ? "#e6f9f2" : "#00b67a",
                        color: added === product.id ? "#00895a" : "#fff",
                        border:
                          added === product.id ? "1px solid #c8f0e0" : "none",
                      }}
                    >
                      {added === product.id ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(32px,5vw,64px) clamp(16px,4vw,40px)",
          textAlign: "center",
          background: "#fafafa",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Build your own store like this
        </h2>
        <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>
          Start with ShopPress and launch in minutes.
        </p>
        <button
          style={btnStyle("green", "lg")}
          onClick={() => onNavigate("signup")}
        >
          Create your store free →
        </button>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
