import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";
import { ButtonSpinner } from "../components/Skeletons.jsx";
import StripeCheckout from "../components/StripeCheckout.jsx";
import { getCart, clearCart } from "../cartStore.js";

const STEPS = ["Contact", "Shipping", "Payment", "Confirmation"];

export default function CheckoutPage({ onNavigate }) {
  const cartItems = getCart();
  const ORDER_ITEMS =
    cartItems.length > 0
      ? cartItems
      : [
          {
            name: "Minimal Desk Lamp",
            variant: "Matte Black",
            price: 89,
            qty: 1,
            emoji: "🪔",
            color: "#fef3c7",
          },
          {
            name: "Ceramic Pour-Over Kit",
            variant: "Cream",
            price: 64,
            qty: 2,
            emoji: "☕",
            color: "#e0f7fa",
          },
        ];

  const [step, setStep] = useState(0);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [payment, setPayment] = useState({
    card: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const toast = useToast();

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost =
    shippingMethod === "express" ? 15 : shippingMethod === "overnight" ? 28 : 0;
  const total = subtotal + shippingCost;

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!contact.email.includes("@")) e.email = "Valid email required";
    }
    if (step === 1) {
      if (!shipping.firstName) e.firstName = "Required";
      if (!shipping.lastName) e.lastName = "Required";
      if (!shipping.address) e.address = "Required";
      if (!shipping.city) e.city = "Required";
      if (!shipping.zip) e.zip = "Required";
    }
    if (step === 2) {
      if (payment.card.replace(/\s/g, "").length < 16)
        e.card = "Enter a valid card number";
      if (!payment.name) e.name = "Required";
      if (!payment.expiry) e.expiry = "Required";
      if (payment.cvv.length < 3) e.cvv = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => s + 1);
  };
  const back = () => {
    setStep((s) => s - 1);
    setErrors({});
  };

  const submitOrder = async (paymentIntentId = null) => {
    setSaving(true);
    try {
      const newOrderId = `SP-${Math.floor(Math.random() * 90000) + 10000}`;
      const order = {
        order_number: newOrderId,
        email: contact.email,
        phone: contact.phone,
        shipping_address: shipping,
        shipping_method: shippingMethod,
        items: ORDER_ITEMS,
        subtotal,
        shipping_cost: shippingCost,
        total,
        status: "processing",
        payment_intent_id: paymentIntentId,
      };
      try {
        const { createOrder } = await import("../supabaseService.js");
        await createOrder(order);
      } catch {
        /* continue */
      }
      try {
        const { sendOrderConfirmation } =
          await import("../emailNotifications.js");
        await sendOrderConfirmation({
          order,
          customer: { name: shipping.firstName, email: contact.email },
        });
      } catch {
        /* email optional */
      }
      setOrderId(newOrderId);
      clearCart();
      setStep(3);
      toast.success(
        "Order confirmed! 🎉",
        `Order ${newOrderId} placed successfully`,
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const setC = (k) => (e) => setContact((p) => ({ ...p, [k]: e.target.value }));
  const setS = (k) => (e) =>
    setShipping((p) => ({ ...p, [k]: e.target.value }));
  const setP = (k) => (e) => {
    let val = e.target.value;
    if (k === "card")
      val = val
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    if (k === "expiry")
      val = val
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(.{2})/, "$1/");
    if (k === "cvv") val = val.replace(/\D/g, "").slice(0, 4);
    setPayment((p) => ({ ...p, [k]: val }));
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

      {/* CHECKOUT NAV */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 40px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Logo />
        </button>
        <div style={{ display: "flex", gap: 0 }}>
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  opacity: i > step ? 0.4 : 1,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background:
                      i < step ? "#00b67a" : i === step ? "#111" : "#ddd",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: i === step ? 600 : 400,
                    color: i === step ? "#111" : "#888",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span style={{ margin: "0 10px", color: "#ddd", fontSize: 14 }}>
                  ›
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigate("cart")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#888",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back to cart
        </button>
      </nav>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 0,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) 80px",
          alignItems: "start",
        }}
      >
        {/* LEFT FORM */}
        <div style={{ paddingRight: 40 }}>
          {/* STEP 0 — CONTACT */}
          {step === 0 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: "-0.3px",
                }}
              >
                Contact information
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Field
                  label="Email address"
                  value={contact.email}
                  onChange={setC("email")}
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <Field
                  label="Phone number (optional)"
                  value={contact.phone}
                  onChange={setC("phone")}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13,
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: 16, height: 16, accentColor: "#00b67a" }}
                  />
                  Email me with news and offers
                </label>
              </div>
            </div>
          )}

          {/* STEP 1 — SHIPPING */}
          {step === 1 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: "-0.3px",
                }}
              >
                Shipping address
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <Field
                    label="First name"
                    value={shipping.firstName}
                    onChange={setS("firstName")}
                    placeholder="Alex"
                    error={errors.firstName}
                  />
                  <Field
                    label="Last name"
                    value={shipping.lastName}
                    onChange={setS("lastName")}
                    placeholder="Johnson"
                    error={errors.lastName}
                  />
                </div>
                <Field
                  label="Address"
                  value={shipping.address}
                  onChange={setS("address")}
                  placeholder="123 Main Street"
                  error={errors.address}
                />
                <Field
                  label="Apartment, suite, etc. (optional)"
                  value={shipping.apt}
                  onChange={setS("apt")}
                  placeholder="Apt 4B"
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                  }}
                >
                  <Field
                    label="City"
                    value={shipping.city}
                    onChange={setS("city")}
                    placeholder="Portland"
                    error={errors.city}
                  />
                  <Field
                    label="State"
                    value={shipping.state}
                    onChange={setS("state")}
                    placeholder="OR"
                  />
                  <Field
                    label="ZIP code"
                    value={shipping.zip}
                    onChange={setS("zip")}
                    placeholder="97201"
                    error={errors.zip}
                  />
                </div>

                {/* Shipping method */}
                <div style={{ marginTop: 8 }}>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#444",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    Shipping method
                  </label>
                  {[
                    ["standard", "Standard (5–7 days)", "Free"],
                    ["express", "Express (2–3 days)", "$15"],
                    ["overnight", "Overnight", "$28"],
                  ].map(([val, label, price]) => (
                    <label
                      key={val}
                      onClick={() => setShippingMethod(val)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        border: `1.5px solid ${shippingMethod === val ? "#00b67a" : "#ddd"}`,
                        borderRadius: 10,
                        marginBottom: 8,
                        cursor: "pointer",
                        background: shippingMethod === val ? "#f4fdf9" : "#fff",
                        transition: "all 0.15s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: `2px solid ${shippingMethod === val ? "#00b67a" : "#ddd"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {shippingMethod === val && (
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#00b67a",
                              }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: 14 }}>{label}</span>
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: price === "Free" ? "#00b67a" : "#111",
                        }}
                      >
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: "-0.3px",
                }}
              >
                Payment
              </h2>
              <StripeCheckout
                amount={total}
                customerEmail={contact.email}
                onSuccess={async (result) => {
                  await submitOrder(result.paymentIntentId);
                }}
                onError={() => {
                  toast.error(
                    "Payment failed. Please check your card details and try again.",
                  );
                }}
              />
              <div style={{ marginTop: 16 }}>
                <button style={btnStyle("outline")} onClick={back}>
                  ← Back to shipping
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — CONFIRMATION */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  marginBottom: 12,
                  letterSpacing: "-0.5px",
                }}
              >
                Order confirmed!
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: 1.7,
                  marginBottom: 8,
                }}
              >
                Thanks for your order. A confirmation has been sent to{" "}
                <strong>{contact.email}</strong>.
              </p>
              <p style={{ fontSize: 13, color: "#aaa", marginBottom: 32 }}>
                Order #{orderId}
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
                  onClick={() => onNavigate("orders")}
                >
                  Track your order
                </button>
                <button
                  style={btnStyle("outline", "lg")}
                  onClick={() => onNavigate("store")}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          )}

          {/* NAV BUTTONS — hidden on step 2 (StripeCheckout has its own submit) */}
          {step < 3 && step !== 2 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 28,
              }}
            >
              {step > 0 ? (
                <button style={btnStyle("outline")} onClick={back}>
                  ← Back
                </button>
              ) : (
                <div />
              )}
              <button
                style={{
                  ...btnStyle("green", "lg"),
                  minWidth: 160,
                  justifyContent: "center",
                  opacity: saving ? 0.8 : 1,
                }}
                onClick={next}
                disabled={saving}
              >
                Continue →
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
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
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
            Order summary
          </h3>
          {ORDER_ITEMS.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                {item.emoji}
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#555",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {item.qty}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                  {item.variant}
                </p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                ${item.price * item.qty}
              </span>
            </div>
          ))}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f0f0f0",
              margin: "16px 0",
            }}
          />
          {[
            ["Subtotal", `$${subtotal}`],
            ["Shipping", shippingCost === 0 ? "Free" : `$${shippingCost}`],
            ["Total", `$${total}`],
          ].map(([l, v], i) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: i === 2 ? 15 : 13,
                  fontWeight: i === 2 ? 600 : 400,
                  color: i === 2 ? "#111" : "#666",
                }}
              >
                {l}
              </span>
              <span
                style={{
                  fontSize: i === 2 ? 16 : 13,
                  fontWeight: i === 2 ? 700 : 500,
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", error }) {
  return (
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
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: 14,
          border: `1px solid ${error ? "#fca5a5" : "#ddd"}`,
          borderRadius: 10,
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: "border-box",
          background: error ? "#fff5f5" : "#fff",
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
}
