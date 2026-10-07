import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";

const SIDEBAR_ITEMS = [
  { icon: "🏠", label: "Dashboard", page: "dashboard" },
  { icon: "🛍️", label: "Products", page: "add-product" },
  { icon: "📦", label: "Orders", page: "orders" },
  { icon: "✏️", label: "Content", page: "write-post" },
  { icon: "🛠️", label: "Admin", page: "admin" },
  { icon: "📊", label: "Analytics", page: null },
  { icon: "🔔", label: "Notifications", page: "notifications" },
  { icon: "⚙️", label: "Settings", page: "settings" },
];

const CHECKLIST = [
  { label: "Add your first product", icon: "🛍️", page: "add-product" },
  { label: "Customize your storefront theme", icon: "🎨", page: null },
  { label: "Connect a payment method", icon: "💳", page: "settings" },
  { label: "Write your first blog post", icon: "✏️", page: "blog" },
  { label: "Set up your custom domain", icon: "🌍", page: "settings" },
];

// Generate last 7 days of fake revenue data
function generateRevenueData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    day,
    revenue: Math.floor(Math.random() * 800 + 100),
    orders: Math.floor(Math.random() * 12 + 1),
  }));
}

// Mini bar chart component
function BarChart({ data, valueKey, color, height = 80 }) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 4,
        height,
        paddingTop: 8,
      }}
    >
      {data.map((d, i) => {
        const pct = max > 0 ? (d[valueKey] / max) * 100 : 0;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              height: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <div
                title={`${d.day}: ${valueKey === "revenue" ? "$" : ""}${d[valueKey]}`}
                style={{
                  width: "100%",
                  height: `${Math.max(pct, 4)}%`,
                  background: color,
                  borderRadius: "4px 4px 0 0",
                  opacity: 0.85,
                  transition: "opacity 0.15s, height 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
              />
            </div>
            <span style={{ fontSize: 10, color: "#bbb" }}>{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

// Mini sparkline
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80,
    h = 28;
  const points = data
    .map(
      (v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`,
    )
    .join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={((data.length - 1) / (data.length - 1)) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="3"
        fill={color}
      />
    </svg>
  );
}

export default function Dashboard({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [checked, setChecked] = useState([]);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    posts: 0,
    visitors: 0,
  });
  const [revenueData] = useState(generateRevenueData);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();
  const progress = Math.round((checked.length / CHECKLIST.length) * 100);

  const toggleCheck = (label) => {
    setChecked((c) =>
      c.includes(label) ? c.filter((x) => x !== label) : [...c, label],
    );
  };

  // Load real stats from Supabase
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const { getOrders, getPosts, getProducts } =
          await import("../supabaseService.js");
        const [ordersRes, postsRes, productsRes] = await Promise.all([
          user?.id ? getOrders(user.id) : { data: [] },
          getPosts({ limit: 100 }),
          getProducts({ limit: 100 }),
        ]);
        const orders = ordersRes.data || [];
        const posts = postsRes.data || [];
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          posts: posts.length,
          visitors: 1842, // placeholder until analytics integration
        });
      } catch {
        // keep zeros
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [user]);

  const STAT_CARDS = [
    {
      label: "Total revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      sub: "All time",
      icon: "💰",
      color: "#00b67a",
      bg: "#e6f9f2",
      spark: [120, 180, 140, 220, 190, 260, 310],
    },
    {
      label: "Orders",
      value: stats.orders,
      sub: "All time",
      icon: "📦",
      color: "#2196f3",
      bg: "#e3f2fd",
      spark: [4, 7, 5, 9, 6, 11, 8],
    },
    {
      label: "Blog posts",
      value: stats.posts,
      sub: "Published",
      icon: "✏️",
      color: "#7c3aed",
      bg: "#ede9fe",
      spark: [1, 2, 2, 3, 4, 4, 5],
    },
    {
      label: "Site visitors",
      value: stats.visitors.toLocaleString(),
      sub: "Last 30 days",
      icon: "👥",
      color: "#f59e0b",
      bg: "#fef3c7",
      spark: [320, 410, 380, 520, 490, 610, 740],
    },
  ];

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);

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
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                if (item.page) onNavigate(item.page);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                background:
                  activeNav === item.label ? "#f4fdf9" : "transparent",
                color: activeNav === item.label ? "#00b67a" : "#555",
                fontWeight: activeNav === item.label ? 600 : 400,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.label)
                  e.currentTarget.style.background = "#fafafa";
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.label)
                  e.currentTarget.style.background = "transparent";
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
            <div
              style={{
                fontSize: 11,
                color: "#aaa",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.email || ""}
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Log out"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#bbb",
              fontSize: 16,
              padding: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
          >
            ⏻
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          padding: "36px 36px",
          overflowY: "auto",
          maxWidth: "calc(100vw - 220px)",
        }}
      >
        {/* Header */}
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
                marginBottom: 2,
                letterSpacing: "-0.5px",
              }}
            >
              Good{" "}
              {new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 17
                  ? "afternoon"
                  : "evening"}
              , {displayName} 👋
            </h1>
            <p style={{ fontSize: 14, color: "#888" }}>
              Here's what's happening with your store today.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("store")}
            >
              View store
            </button>
            <button
              style={btnStyle("green")}
              onClick={() => onNavigate("add-product")}
            >
              + Add product
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>
                  {s.label}
                </span>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  {s.icon}
                </div>
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  marginBottom: 6,
                }}
              >
                {loading ? (
                  <div
                    style={{
                      width: 80,
                      height: 24,
                      background: "#f0f0f0",
                      borderRadius: 6,
                      animation: "shimmer 1.4s infinite linear",
                      backgroundSize: "200% 100%",
                      backgroundImage:
                        "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                    }}
                  />
                ) : (
                  s.value
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, color: "#aaa" }}>{s.sub}</span>
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Revenue chart */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Revenue</h3>
              <div style={{ display: "flex", gap: 4 }}>
                {["7d", "30d", "90d"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 99,
                      fontSize: 11,
                      fontWeight: 500,
                      border: "1px solid",
                      background: period === p ? "#111" : "#fff",
                      color: period === p ? "#fff" : "#888",
                      borderColor: period === p ? "#111" : "#eee",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-1px",
                  color: "#00b67a",
                }}
              >
                ${totalRevenue.toLocaleString()}
              </span>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
                last 7 days
              </span>
            </div>
            <BarChart
              data={revenueData}
              valueKey="revenue"
              color="#00b67a"
              height={100}
            />
          </div>

          {/* Orders chart */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Orders</h3>
              <span
                style={{
                  fontSize: 12,
                  background: "#e3f2fd",
                  color: "#1565c0",
                  borderRadius: 99,
                  padding: "2px 10px",
                  fontWeight: 500,
                }}
              >
                This week
              </span>
            </div>
            <div style={{ marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-1px",
                  color: "#2196f3",
                }}
              >
                {totalOrders}
              </span>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
                last 7 days
              </span>
            </div>
            <BarChart
              data={revenueData}
              valueKey="orders"
              color="#2196f3"
              height={100}
            />
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {/* Quick actions */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "20px 22px",
            }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
              Quick actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  icon: "🛍️",
                  label: "Add product",
                  desc: "List a new item",
                  page: "add-product",
                  color: "#00b67a",
                  bg: "#e6f9f2",
                },
                {
                  icon: "📦",
                  label: "View orders",
                  desc: "Manage your orders",
                  page: "orders",
                  color: "#2196f3",
                  bg: "#e3f2fd",
                },
                {
                  icon: "✏️",
                  label: "Write a post",
                  desc: "Publish blog content",
                  page: "blog",
                  color: "#7c3aed",
                  bg: "#ede9fe",
                },
                {
                  icon: "⚙️",
                  label: "Settings",
                  desc: "Account & store settings",
                  page: "settings",
                  color: "#f59e0b",
                  bg: "#fef3c7",
                },
              ].map((a) => (
                <div
                  key={a.label}
                  onClick={() => onNavigate(a.page)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid #f5f5f5",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fafafa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: a.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {a.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{a.desc}</div>
                  </div>
                  <span style={{ color: "#ddd" }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist with progress */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <h2 style={{ fontSize: 14, fontWeight: 600 }}>Get started</h2>
              <span style={{ fontSize: 12, color: "#00b67a", fontWeight: 600 }}>
                {checked.length}/{CHECKLIST.length} done
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "#f0f0f0",
                borderRadius: 99,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#00b67a",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CHECKLIST.map((item, i) => {
                const done = checked.includes(item.label);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom:
                        i < CHECKLIST.length - 1 ? "1px solid #f5f5f5" : "none",
                    }}
                  >
                    <button
                      onClick={() => toggleCheck(item.label)}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: done ? "none" : "2px solid #ddd",
                        background: done ? "#00b67a" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {done ? "✓" : ""}
                    </button>
                    <span
                      style={{
                        fontSize: 13,
                        color: done ? "#aaa" : "#444",
                        textDecoration: done ? "line-through" : "none",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </span>
                    {item.page && !done && (
                      <button
                        onClick={() => onNavigate(item.page)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#00b67a",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        Start →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
