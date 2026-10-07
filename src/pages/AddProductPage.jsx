import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";
import { ButtonSpinner } from "../components/Skeletons.jsx";

const CATEGORIES = [
  "Home",
  "Kitchen",
  "Stationery",
  "Tech",
  "Fashion",
  "Beauty",
  "Food",
  "Sports",
  "Other",
];
const EMOJIS = [
  "🛍️",
  "📦",
  "💡",
  "🖥️",
  "📱",
  "👕",
  "👟",
  "🎨",
  "🍎",
  "☕",
  "🪔",
  "📓",
  "⚡",
  "🎮",
  "🏠",
  "🌿",
  "💄",
  "⌨️",
  "🕯️",
  "🗂️",
];

export default function AddProductPage({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    compare_price: "",
    category: "Home",
    description: "",
    emoji: "🛍️",
    color: "#e6f9f2",
    badge: "",
    stock: "",
    sku: "",
    published: true,
  });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setVal = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Valid price is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (publish = true) => {
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }
    setSaving(true);
    try {
      const product = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        compare_price: form.compare_price
          ? parseFloat(form.compare_price)
          : null,
        category: form.category,
        description: form.description.trim(),
        emoji: form.emoji,
        color: form.color,
        badge: form.badge || null,
        stock: form.stock ? parseInt(form.stock) : null,
        sku: form.sku || null,
        published: publish,
        rating: 0,
        reviews: 0,
      };
      const { createProduct } = await import("../supabaseService.js");
      const { data, error } = await createProduct(product);
      if (error) throw error;
      setSaved(true);
      toast.success(
        `${form.emoji} "${form.name}" ${publish ? "published" : "saved as draft"}!`,
      );
      setTimeout(() => onNavigate("store"), 1500);
    } catch (err) {
      toast.error("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();

  const SIDEBAR = [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "🛍️", label: "Products", page: "store", active: true },
    { icon: "📦", label: "Orders", page: "orders" },
    { icon: "✏️", label: "Content", page: "blog" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        minHeight: "100vh",
        background: "#f7f8fa",
        color: "#111",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* SIDEBAR */}
      <aside
        style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          padding: "0 0 24px",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid #f0f0f0",
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
        </div>
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {SIDEBAR.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                background: item.active ? "#f4fdf9" : "transparent",
                color: item.active ? "#00b67a" : "#555",
                fontWeight: item.active ? 600 : 400,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#e6f9f2",
              color: "#00b67a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              fontSize: 16,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
          >
            ⏻
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "36px", overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <button
              onClick={() => onNavigate("store")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#888",
                fontFamily: "'DM Sans', sans-serif",
                padding: 0,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              ← Back to products
            </button>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Add new product
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              Save as draft
            </button>
            <button
              style={{
                ...btnStyle("green"),
                minWidth: 130,
                justifyContent: "center",
              }}
              onClick={() => handleSave(true)}
              disabled={saving}
            >
              {saving ? (
                <>
                  <ButtonSpinner /> Saving...
                </>
              ) : (
                "Publish product"
              )}
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* LEFT — Main form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Basic info */}
            <Card title="Product details">
              <Field label="Product name *" error={errors.name}>
                <input
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Minimal Desk Lamp"
                  style={inputStyle(errors.name)}
                />
              </Field>
              <Field label="Description *" error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Describe your product..."
                  rows={4}
                  style={{
                    ...inputStyle(errors.description),
                    resize: "vertical",
                  }}
                />
              </Field>
            </Card>

            {/* Pricing */}
            <Card title="Pricing">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="Price *" error={errors.price}>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#aaa",
                        fontSize: 14,
                      }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={set("price")}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      style={{ ...inputStyle(errors.price), paddingLeft: 26 }}
                    />
                  </div>
                </Field>
                <Field label="Compare at price">
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#aaa",
                        fontSize: 14,
                      }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={form.compare_price}
                      onChange={set("compare_price")}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      style={{ ...inputStyle(), paddingLeft: 26 }}
                    />
                  </div>
                </Field>
              </div>
              {form.compare_price &&
                Number(form.compare_price) > Number(form.price) && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      color: "#ef4444",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    Sale:{" "}
                    {Math.round(
                      ((form.compare_price - form.price) / form.compare_price) *
                        100,
                    )}
                    % off
                  </div>
                )}
            </Card>

            {/* Inventory */}
            <Card title="Inventory">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="SKU">
                  <input
                    value={form.sku}
                    onChange={set("sku")}
                    placeholder="e.g. LAMP-001"
                    style={inputStyle()}
                  />
                </Field>
                <Field label="Stock quantity">
                  <input
                    type="number"
                    value={form.stock}
                    onChange={set("stock")}
                    placeholder="e.g. 50"
                    min="0"
                    style={inputStyle()}
                  />
                </Field>
              </div>
            </Card>
          </div>

          {/* RIGHT — Product card preview + options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Preview */}
            <Card title="Preview">
              <div
                style={{
                  background: form.color,
                  borderRadius: 12,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                  marginBottom: 12,
                }}
              >
                {form.emoji}
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                {form.name || "Product name"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>
                  {form.price ? `$${form.price}` : "$0.00"}
                </span>
                {form.compare_price && (
                  <span
                    style={{
                      fontSize: 13,
                      color: "#aaa",
                      textDecoration: "line-through",
                    }}
                  >
                    ${form.compare_price}
                  </span>
                )}
              </div>
            </Card>

            {/* Emoji & Color */}
            <Card title="Display">
              <Field label="Product emoji">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setVal("emoji", e)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border:
                          form.emoji === e
                            ? "2px solid #00b67a"
                            : "1px solid #eee",
                        background: form.emoji === e ? "#f4fdf9" : "#fff",
                        fontSize: 20,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Card color">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    "#e6f9f2",
                    "#e3f2fd",
                    "#ede9fe",
                    "#fef3c7",
                    "#fce8e8",
                    "#e0f7fa",
                    "#fff8e1",
                    "#f3e8ff",
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setVal("color", c)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: c,
                        border:
                          form.color === c
                            ? "3px solid #111"
                            : "2px solid #ddd",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </Field>
            </Card>

            {/* Organisation */}
            <Card title="Organisation">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={set("category")}
                  style={{ ...inputStyle(), background: "#fff" }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Badge label">
                <input
                  value={form.badge}
                  onChange={set("badge")}
                  placeholder="e.g. New, Sale, Bestseller"
                  style={inputStyle()}
                />
              </Field>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ebebeb",
        borderRadius: 16,
        padding: "20px 22px",
      }}
    >
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 16,
          color: "#111",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
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
      {children}
      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
}

const inputStyle = (error) => ({
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: `1px solid ${error ? "#fca5a5" : "#ddd"}`,
  borderRadius: 10,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  color: "#111",
  background: error ? "#fff5f5" : "#fff",
  boxSizing: "border-box",
});
