import { useState } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";
import { addToCart } from "../cartStore.js";

const INITIAL_WISHLIST = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: 89,
    originalPrice: null,
    emoji: "🪔",
    color: "#fef3c7",
    category: "Home",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: "Linen Notebook A5",
    price: 28,
    originalPrice: null,
    emoji: "📓",
    color: "#f3e8ff",
    category: "Stationery",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 6,
    name: "Scented Soy Candle",
    price: 32,
    originalPrice: 40,
    emoji: "🕯️",
    color: "#fff8e1",
    category: "Home",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    price: 149,
    originalPrice: null,
    emoji: "⌨️",
    color: "#e3f2fd",
    category: "Tech",
    rating: 4.8,
    inStock: false,
  },
];

export default function WishlistPage({ onNavigate, user, onLogout }) {
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [addedToCart, setAddedToCart] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const toast = useToast();

  const remove = (id) => {
    const item = items.find((i) => i.id === id);
    setRemovedIds((r) => [...r, id]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 300);
    toast.info(`${item?.name} removed from wishlist`);
  };

  const moveToCart = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      emoji: item.emoji,
      color: item.color,
      variant: "Default",
    });
    setAddedToCart((c) => [...c, id]);
    toast.success(`${item.emoji} ${item.name} moved to cart!`);
    setTimeout(() => {
      remove(id);
    }, 1200);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        background: "#f7f8fa",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <SharedNav onNavigate={onNavigate} user={user} onLogout={onLogout} />

      <section
        style={{ maxWidth: 1060, margin: "0 auto", padding: "48px 40px 80px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                marginBottom: 4,
                letterSpacing: "-0.5px",
              }}
            >
              Wishlist
            </h1>
            <p style={{ fontSize: 15, color: "#888" }}>
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("store")}
            >
              Browse store
            </button>
            {items.some((i) => i.inStock) && (
              <button
                style={btnStyle("green")}
                onClick={() =>
                  items
                    .filter((i) => i.inStock)
                    .forEach((i) => moveToCart(i.id))
                }
              >
                Add all to cart
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🤍</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: "#888", marginBottom: 28 }}>
              Save items you love and come back to them anytime.
            </p>
            <button
              style={btnStyle("green", "lg")}
              onClick={() => onNavigate("store")}
            >
              Explore the store →
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: 16,
            }}
          >
            {items.map((item) => {
              const isAdded = addedToCart.includes(item.id);
              const isRemoving = removedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 16,
                    overflow: "hidden",
                    opacity: isRemoving ? 0 : 1,
                    transform: isRemoving ? "scale(0.95)" : "scale(1)",
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative" }}>
                    <div
                      onClick={() => onNavigate("product-" + item.id)}
                      style={{
                        height: 160,
                        background: item.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 64,
                        cursor: "pointer",
                      }}
                    >
                      {item.emoji}
                    </div>
                    {!item.inStock && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(255,255,255,0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            background: "#111",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                            borderRadius: 99,
                            padding: "4px 12px",
                          }}
                        >
                          Out of stock
                        </span>
                      </div>
                    )}
                    {item.originalPrice && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "#ef4444",
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 99,
                          padding: "3px 10px",
                        }}
                      >
                        SALE
                      </span>
                    )}
                    <button
                      onClick={() => remove(item.id)}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ef4444";
                        e.currentTarget.style.background = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#aaa";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.9)";
                      }}
                    >
                      ✕
                    </button>
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
                      {item.category}
                    </p>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 6,
                        cursor: "pointer",
                      }}
                      onClick={() => onNavigate("product-" + item.id)}
                    >
                      {item.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 14,
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span
                          style={{
                            fontSize: 13,
                            color: "#aaa",
                            textDecoration: "line-through",
                          }}
                        >
                          ${item.originalPrice}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 12,
                          color: "#aaa",
                          marginLeft: "auto",
                        }}
                      >
                        ⭐ {item.rating}
                      </span>
                    </div>
                    <button
                      onClick={() => item.inStock && moveToCart(item.id)}
                      disabled={!item.inStock}
                      style={{
                        ...btnStyle(isAdded ? "outline" : "green"),
                        width: "100%",
                        justifyContent: "center",
                        background: !item.inStock
                          ? "#f5f5f5"
                          : isAdded
                            ? "#e6f9f2"
                            : "#00b67a",
                        color: !item.inStock
                          ? "#aaa"
                          : isAdded
                            ? "#00895a"
                            : "#fff",
                        border: isAdded ? "1px solid #c8f0e0" : "none",
                        cursor: !item.inStock ? "not-allowed" : "pointer",
                        fontSize: 13,
                      }}
                    >
                      {!item.inStock
                        ? "Out of stock"
                        : isAdded
                          ? "✓ Added to cart!"
                          : "Move to cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RECOMMENDED */}
        {items.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: "-0.3px",
              }}
            >
              You might also like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                gap: 14,
              }}
            >
              {[
                {
                  id: 2,
                  name: "Ceramic Pour-Over Kit",
                  price: 64,
                  emoji: "☕",
                  color: "#e0f7fa",
                },
                {
                  id: 4,
                  name: "Wireless Charging Pad",
                  price: 49,
                  emoji: "⚡",
                  color: "#e6f9f2",
                },
                {
                  id: 5,
                  name: "Bamboo Desk Organizer",
                  price: 39,
                  emoji: "🗂️",
                  color: "#fce8e8",
                },
              ].map((p) => (
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
                      "0 6px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      height: 110,
                      background: p.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 44,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ padding: "12px" }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        margin: "0 0 4px",
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
                      ${p.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
