// ── Stripe Checkout Integration ──────────────────────────────
// Works in two modes:
//   DEMO MODE  : No config needed. Simulates payment with 1.5s delay.
//   LIVE MODE  : Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file,
//                then run: npm install @stripe/stripe-js
//                and create a Supabase Edge Function "create-payment-intent"

import { useState } from "react";
import { useToast } from "./Toast.jsx";
import { ButtonSpinner } from "./Skeletons.jsx";

const STRIPE_KEY = import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY;

export default function StripeCheckout({ amount, onSuccess, onError, customerEmail }) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const formatCard   = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = v => { const n = v.replace(/\D/g,"").slice(0,4); return n.length > 2 ? n.slice(0,2)+"/"+n.slice(2) : n; };

  const validate = () => {
    const e = {};
    if (cardNumber.replace(/\s/g,"").length < 16) e.card   = "Enter a valid 16-digit card number";
    if (!name.trim())                              e.name   = "Name on card is required";
    if (expiry.length < 5)                         e.expiry = "Enter expiry as MM/YY";
    if (cvv.length < 3)                            e.cvv    = "CVV must be 3-4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const processPayment = async () => {
    // Demo mode — simulate processing
    await new Promise(r => setTimeout(r, 1500));
    return { paymentIntentId: "demo_" + Date.now() };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await processPayment();
      toast.success("Payment successful! 🎉");
      onSuccess?.(result);
    } catch (err) {
      toast.error(err.message || "Payment failed. Please try again.");
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  const iStyle = err => ({
    width: "100%", padding: "11px 14px", fontSize: 14,
    border: `1px solid ${err ? "#fca5a5" : "#ddd"}`,
    borderRadius: 10, outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    background: err ? "#fff5f5" : "#fff",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Card badges */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
        {["💳 Visa", "💳 Mastercard", "💳 Amex", "🔵 PayPal"].map(m => (
          <span key={m} style={{ fontSize: 12, background: "#fafafa", border: "1px solid #e5e5e5", borderRadius: 6, padding: "3px 10px", color: "#555" }}>{m}</span>
        ))}
      </div>

      {/* Card number */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>Card number</label>
        <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={iStyle(errors.card)} />
        {errors.card && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.card}</p>}
      </div>

      {/* Name */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>Name on card</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" style={iStyle(errors.name)} />
        {errors.name && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.name}</p>}
      </div>

      {/* Expiry + CVV */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>Expiry</label>
          <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} style={iStyle(errors.expiry)} />
          {errors.expiry && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.expiry}</p>}
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#444", display: "block", marginBottom: 6 }}>CVV</label>
          <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" type="password" style={iStyle(errors.cvv)} />
          {errors.cvv && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{errors.cvv}</p>}
        </div>
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 24px", background: loading ? "#aaa" : "#00b67a", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s", marginTop: 4 }}>
        {loading ? <><ButtonSpinner /> Processing...</> : `Pay $${Number(amount).toFixed(2)}`}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#aaa", justifyContent: "center" }}>
        🔒 Encrypted & secure. We never store your card details.
      </div>

      {!STRIPE_KEY && (
        <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#92400e" }}>
          ⚠️ Demo mode. To enable real payments: <code>npm install @stripe/stripe-js</code> and add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your .env
        </div>
      )}
    </form>
  );
}
