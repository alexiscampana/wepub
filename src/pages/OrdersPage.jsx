import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";

const ORDERS = [
  {
    id: "SP-48291",
    date: "May 30, 2026",
    status: "Delivered",
    total: 217,
    items: 3,
    products: [
      { emoji: "🪔", name: "Minimal Desk Lamp", qty: 1, price: 89 },
      { emoji: "☕", name: "Ceramic Pour-Over Kit", qty: 2, price: 64 },
    ],
    tracking: "1Z999AA10123456784",
    carrier: "UPS",
    timeline: [
      { label: "Order placed", date: "May 30, 2026", done: true },
      { label: "Payment confirmed", date: "May 30, 2026", done: true },
      { label: "Shipped", date: "Jun 1, 2026", done: true },
      { label: "Out for delivery", date: "Jun 3, 2026", done: true },
      { label: "Delivered", date: "Jun 3, 2026", done: true },
    ],
  },
  {
    id: "SP-41073",
    date: "May 10, 2026",
    status: "Shipped",
    total: 28,
    items: 1,
    products: [{ emoji: "📓", name: "Linen Notebook A5", qty: 1, price: 28 }],
    tracking: "1Z999AA10123456785",
    carrier: "FedEx",
    timeline: [
      { label: "Order placed", date: "May 10, 2026", done: true },
      { label: "Payment confirmed", date: "May 10, 2026", done: true },
      { label: "Shipped", date: "May 12, 2026", done: true },
      { label: "Out for delivery", date: "May 13, 2026", done: false },
      { label: "Delivered", date: "—", done: false },
    ],
  },
  {
    id: "SP-38842",
    date: "Apr 22, 2026",
    status: "Delivered",
    total: 49,
    items: 1,
    products: [
      { emoji: "⚡", name: "Wireless Charging Pad", qty: 1, price: 49 },
    ],
    tracking: "1Z999AA10123456786",
    carrier: "USPS",
    timeline: [
      { label: "Order placed", date: "Apr 22, 2026", done: true },
      { label: "Payment confirmed", date: "Apr 22, 2026", done: true },
      { label: "Shipped", date: "Apr 23, 2026", done: true },
      { label: "Out for delivery", date: "Apr 25, 2026", done: true },
      { label: "Delivered", date: "Apr 25, 2026", done: true },
    ],
  },
];

const STATUS_COLORS = {
  Delivered: { bg: "#e6f9f2", color: "#00895a" },
  Shipped: { bg: "#e3f2fd", color: "#1565c0" },
  Processing: { bg: "#fef3c7", color: "#92400e" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

export default function OrdersPage({ onNavigate, onLogout, user }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState(ORDERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const { getOrders } = await import("../supabaseService.js");
        const { data, error } = await getOrders(user.id);
        if (!error && data && data.length > 0) {
          setOrders(data);
        } else {
          setOrders(ORDERS);
        }
      } catch {
        setOrders(ORDERS);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user?.id]);
  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();
  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const SIDEBAR = [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "🛍️", label: "Products", page: "store" },
    { icon: "📦", label: "Orders", page: "orders", active: true },
    { icon: "✏️", label: "Content", page: "content" },
    { icon: "📊", label: "Analytics", page: null },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  const order = selected ? orders.find((o) => o.id === selected) : null;

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
              onClick={() => item.page && onNavigate(item.page)}
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
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {order ? (
          // ORDER DETAIL VIEW
          <div style={{ maxWidth: 680 }}>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#888",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: 0,
              }}
            >
              ← Back to orders
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    marginBottom: 4,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Order {order.id}
                </h1>
                <p style={{ fontSize: 13, color: "#888" }}>
                  Placed on {order.date}
                </p>
              </div>
              <span
                style={{
                  background: STATUS_COLORS[order.status].bg,
                  color: STATUS_COLORS[order.status].color,
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 99,
                  padding: "5px 14px",
                }}
              >
                {order.status}
              </span>
            </div>

            {/* TRACKING TIMELINE */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>
                Tracking · {order.carrier} {order.tracking}
              </h3>
              <div style={{ position: "relative", paddingLeft: 28 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 8,
                    bottom: 8,
                    width: 2,
                    background: "#f0f0f0",
                  }}
                />
                {order.timeline.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      paddingBottom: i < order.timeline.length - 1 ? 20 : 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: -28,
                        top: 2,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: t.done ? "#00b67a" : "#fff",
                        border: `2px solid ${t.done ? "#00b67a" : "#ddd"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#fff",
                      }}
                    >
                      {t.done ? "✓" : ""}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: t.done ? 500 : 400,
                          color: t.done ? "#111" : "#bbb",
                        }}
                      >
                        {t.label}
                      </span>
                      <span style={{ fontSize: 12, color: "#aaa" }}>
                        {t.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
                Items
              </h3>
              {order.products.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      i < order.products.length - 1
                        ? "1px solid #f5f5f5"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                      {p.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                      Qty: {p.qty}
                    </p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    ${p.price * p.qty}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 16,
                  borderTop: "1px solid #f5f5f5",
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  Total: ${order.total}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button style={btnStyle("outline")}>Download invoice</button>
              <button style={btnStyle("outline")}>Request return</button>
            </div>
          </div>
        ) : (
          // ORDERS LIST
          <div>
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
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 4,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Orders
                </h1>
                <p style={{ fontSize: 15, color: "#888" }}>
                  Your full order history.
                </p>
              </div>
              <button
                style={btnStyle("green")}
                onClick={() => onNavigate("store")}
              >
                + Shop more
              </button>
            </div>

            {/* Filter tabs */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              {["All", "Delivered", "Shipped", "Processing"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid",
                    background: filter === f ? "#111" : "#fff",
                    color: filter === f ? "#fff" : "#555",
                    borderColor: filter === f ? "#111" : "#ddd",
                    transition: "all 0.15s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "#aaa",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                <p style={{ fontSize: 16 }}>No orders found.</p>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {filtered.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #ebebeb",
                      borderRadius: 16,
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "box-shadow 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                    onClick={() => setSelected(order.id)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.07)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    <div style={{ fontSize: 28, flexShrink: 0 }}>📦</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ fontSize: 15, fontWeight: 600 }}>
                          {order.id}
                        </span>
                        <span
                          style={{
                            background: STATUS_COLORS[order.status].bg,
                            color: STATUS_COLORS[order.status].color,
                            fontSize: 11,
                            fontWeight: 600,
                            borderRadius: 99,
                            padding: "2px 10px",
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                        {order.items} item{order.items !== 1 ? "s" : ""} ·{" "}
                        {order.date}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        ${order.total}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#00b67a",
                          fontWeight: 500,
                        }}
                      >
                        View details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
