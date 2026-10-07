import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";
import { getCart, updateQuantity, removeFromCart } from "../cartStore.js";

export default function CartPage({ onNavigate, user, onLogout }) {
  const [items, setItems] = useState(() => getCart());
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const toast = useToast();

  useEffect(() => {
    const refresh = () => setItems(getCart());
    window.addEventListener("sp_cart_updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sp_cart_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const updateQty = (id, delta) => {
    setItems(updateQuantity(id, delta));
  };

  const removeItem = (id) => {
    const item = items.find((i) => i.id === id);
    setItems(removeFromCart(id));
    toast.info(`${item?.name} removed from cart`);
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 50 ? 0 : 8;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promo.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoError("");
      toast.success("Promo code applied! 10% discount added.");
    } else {
      setPromoError("Invalid promo code. Try SAVE10.");
      setPromoApplied(false);
      toast.error("Invalid promo code. Try SAVE10.");
    }
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
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px) 80px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: "-0.5px",
          }}
        >
          Your cart{" "}
          <span style={{ fontSize: 18, fontWeight: 400, color: "#aaa" }}>
            ({items.length} items)
          </span>
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
              Your cart is empty
            </h2>
            <p style={{ color: "#888", marginBottom: 28 }}>
              Looks like you haven't added anything yet.
            </p>
            <button
              style={btnStyle("green", "lg")}
              onClick={() => onNavigate("store")}
            >
              Browse the store →
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* CART ITEMS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 16,
                    padding: "20px",
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <div
                    onClick={() => onNavigate("product-" + item.id)}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      background: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        marginBottom: 3,
                        cursor: "pointer",
                      }}
                      onClick={() => onNavigate("product-" + item.id)}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{ fontSize: 12, color: "#aaa", marginBottom: 10 }}
                    >
                      {item.variant}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e5e5e5",
                          borderRadius: 8,
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{
                            width: 32,
                            height: 32,
                            background: "#fafafa",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 16,
                            color: "#555",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            width: 32,
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{
                            width: 32,
                            height: 32,
                            background: "#fafafa",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 16,
                            color: "#555",
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#bbb",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#bbb")
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, flexShrink: 0 }}>
                    ${item.price * item.qty}
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <button
                onClick={() => onNavigate("store")}
                style={{
                  ...btnStyle("outline"),
                  alignSelf: "flex-start",
                  marginTop: 4,
                }}
              >
                ← Continue shopping
              </button>
            </div>

            {/* ORDER SUMMARY */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                position: "sticky",
                top: 80,
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Order summary
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <Row label="Subtotal" value={`$${subtotal}`} />
                {promoApplied && (
                  <Row
                    label="Promo (SAVE10)"
                    value={`−$${discount}`}
                    valueColor="#00b67a"
                  />
                )}
                <Row
                  label={shipping === 0 ? "Shipping" : "Shipping"}
                  value={shipping === 0 ? "Free" : `$${shipping}`}
                  valueColor={shipping === 0 ? "#00b67a" : "#111"}
                />
                <hr
                  style={{ border: "none", borderTop: "1px solid #f0f0f0" }}
                />
                <Row label="Total" value={`$${total}`} bold />
              </div>

              {/* Promo code */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#444",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Promo code
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="e.g. SAVE10"
                    style={{
                      flex: 1,
                      padding: "9px 12px",
                      border: "1px solid #ddd",
                      borderRadius: 8,
                      fontSize: 13,
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <button style={btnStyle("outline")} onClick={applyPromo}>
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}>
                    {promoError}
                  </p>
                )}
                {promoApplied && (
                  <p style={{ fontSize: 12, color: "#00b67a", marginTop: 6 }}>
                    ✓ 10% discount applied!
                  </p>
                )}
              </div>

              <button
                style={{
                  ...btnStyle("green", "lg"),
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={() => onNavigate("checkout")}
              >
                Proceed to checkout →
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 16,
                }}
              >
                {["🔒 Secure", "↩️ Easy returns", "🚚 Fast shipping"].map(
                  (t) => (
                    <span key={t} style={{ fontSize: 11, color: "#aaa" }}>
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

function Row({ label, value, bold, valueColor }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 14,
          color: bold ? "#111" : "#666",
          fontWeight: bold ? 600 : 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: bold ? 18 : 14,
          fontWeight: bold ? 700 : 500,
          color: valueColor || (bold ? "#111" : "#333"),
        }}
      >
        {value}
      </span>
    </div>
  );
}
