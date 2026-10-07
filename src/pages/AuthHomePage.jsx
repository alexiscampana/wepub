import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { getCart } from "../cartStore.js";
import OnboardingTour, { useTour } from "../components/OnboardingTour.jsx";

const QUICK_ACTIONS = [
  {
    icon: "➕",
    label: "Add product",
    desc: "List a new item in your store",
    page: "add-product",
    color: "#00b67a",
    bg: "#e6f9f2",
  },
  {
    icon: "✏️",
    label: "Write a post",
    desc: "Publish to your blog",
    page: "write-post",
    color: "#2196f3",
    bg: "#e3f2fd",
  },
  {
    icon: "📦",
    label: "View orders",
    desc: "Manage incoming orders",
    page: "orders",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    icon: "🛠️",
    label: "Admin panel",
    desc: "Manage everything",
    page: "admin",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  {
    icon: "🛍️",
    label: "Browse store",
    desc: "See your storefront",
    page: "store",
    color: "#0891b2",
    bg: "#e0f7fa",
  },
  {
    icon: "⚙️",
    label: "Settings",
    desc: "Account & store settings",
    page: "settings",
    color: "#ef4444",
    bg: "#fee2e2",
  },
];

const TIPS = [
  {
    icon: "💡",
    title: "Embed products in blog posts",
    desc: "Click the product block in the editor to link any item directly inside an article — converts 3x better than a sidebar.",
  },
  {
    icon: "🔍",
    title: "SEO is automatic",
    desc: "Every product and post gets structured data, a sitemap entry, and meta tags generated automatically. No plugin needed.",
  },
  {
    icon: "📊",
    title: "Check your content analytics",
    desc: "The dashboard shows which blog posts are driving the most revenue. Head to Analytics to see the full breakdown.",
  },
  {
    icon: "🎁",
    title: "Set up a referral program",
    desc: "Let your customers earn commission for sending new buyers. Go to the Referral page to configure your tiers.",
  },
];

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

export default function AuthHomePage({
  onNavigate,
  user,
  onLogout,
  onBack = () => {},
  canGoBack = false,
}) {
  if (!user) return null;
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    posts: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good morning");
  const [tip] = useState(
    () => TIPS[Math.floor(Date.now() / 86400000) % TIPS.length],
  );
  const cartCount = getCart().reduce((s, i) => s + i.qty, 0);
  const { shouldShow, reset } = useTour();
  const [showTour, setShowTour] = useState(false);

  // Delay tour slightly so the page renders first
  useEffect(() => {
    if (shouldShow) {
      const t = setTimeout(() => setShowTour(true), 600);
      return () => clearTimeout(t);
    }
  }, [shouldShow]);

  const displayName = user?.name || "there";
  const firstName = displayName.split(" ")[0];

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { getOrders, getPosts, getProducts } =
          await import("../supabaseService.js");
        const [ordersRes, postsRes, productsRes] = await Promise.all([
          user?.id ? getOrders(user.id) : { data: [] },
          getPosts({ limit: 3 }),
          getProducts({ limit: 100 }),
        ]);
        const orders = ordersRes.data || [];
        const posts = postsRes.data || [];
        const products = productsRes.data || [];
        const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          posts: posts.length,
          products: products.length,
        });
        setRecentOrders(orders.slice(0, 3));
        setRecentPosts(posts.slice(0, 3));
      } catch {
        setStats({ revenue: 0, orders: 0, posts: 0, products: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const STAT_CARDS = [
    {
      label: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: "💰",
      color: "#00b67a",
      bg: "#e6f9f2",
      spark: [80, 120, 95, 160, 140, 190, 220],
    },
    {
      label: "Orders",
      value: stats.orders,
      icon: "📦",
      color: "#2196f3",
      bg: "#e3f2fd",
      spark: [2, 5, 3, 7, 5, 9, 8],
    },
    {
      label: "Blog posts",
      value: stats.posts,
      icon: "✏️",
      color: "#7c3aed",
      bg: "#ede9fe",
      spark: [0, 1, 1, 2, 2, 3, 3],
    },
    {
      label: "Products",
      value: stats.products,
      icon: "🛍️",
      color: "#f59e0b",
      bg: "#fef3c7",
      spark: [1, 2, 3, 4, 4, 5, 6],
    },
  ];

  const STATUS_COLORS = {
    processing: { bg: "#fef3c7", color: "#92400e" },
    shipped: { bg: "#e3f2fd", color: "#1565c0" },
    delivered: { bg: "#e6f9f2", color: "#00895a" },
    cancelled: { bg: "#fee2e2", color: "#991b1b" },
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
      <SharedNav
        onNavigate={onNavigate}
        activePage="home"
        user={user}
        onLogout={onLogout}
        onBack={onBack}
        canGoBack={canGoBack}
      />

      {showTour && (
        <OnboardingTour
          onNavigate={onNavigate}
          onDone={() => setShowTour(false)}
        />
      )}

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) 80px",
        }}
      >
        {/* GREETING HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 700,
                marginBottom: 4,
                letterSpacing: "-0.5px",
              }}
            >
              {greeting}, {firstName} 👋
            </h1>
            <p style={{ fontSize: 15, color: "#888" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              — here's what's happening with your store.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{ ...btnStyle("outline"), fontSize: 13 }}
              onClick={() => {
                reset();
                setShowTour(true);
              }}
            >
              🗺️ Tour
            </button>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("store")}
            >
              View store
            </button>
            <button
              style={btnStyle("green")}
              onClick={() => onNavigate("dashboard")}
            >
              Full dashboard →
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
            gap: 14,
            marginBottom: 28,
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
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
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
              {loading ? (
                <div
                  style={{
                    height: 28,
                    width: 80,
                    background: "#f0f0f0",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    marginBottom: 8,
                  }}
                >
                  {s.value}
                </div>
              )}
              <Sparkline data={s.spark} color={s.color} />
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {/* QUICK ACTIONS */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "22px 24px",
            }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
              Quick actions
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: 10,
              }}
            >
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.page}
                  onClick={() => onNavigate(a.page)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    background: "#fafafa",
                    border: "1px solid #f0f0f0",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = a.bg;
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fafafa";
                    e.currentTarget.style.borderColor = "#f0f0f0";
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
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
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "#111" }}
                    >
                      {a.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>
                      {a.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600 }}>Recent orders</h2>
              <button
                onClick={() => onNavigate("orders")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12,
                  color: "#00b67a",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                View all →
              </button>
            </div>

            {loading ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 44,
                      background: "#f5f5f5",
                      borderRadius: 10,
                      animation: "shimmer 1.4s infinite linear",
                      backgroundImage:
                        "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                      backgroundSize: "400px 100%",
                    }}
                  />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📦</div>
                <p style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>
                  No orders yet. Share your store to get started!
                </p>
                <button
                  style={btnStyle("green")}
                  onClick={() => onNavigate("store")}
                >
                  View store
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recentOrders.map((order, i) => (
                  <div
                    key={order.id || i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderBottom:
                        i < recentOrders.length - 1
                          ? "1px solid #f5f5f5"
                          : "none",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.order_number || order.id}
                      </p>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                        {order.email || order.customer || "Customer"}
                      </p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>
                      ${order.total || 0}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 99,
                        padding: "2px 10px",
                        background:
                          STATUS_COLORS[order.status]?.bg || "#f5f5f5",
                        color: STATUS_COLORS[order.status]?.color || "#555",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.status || "processing"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 20,
          }}
        >
          {/* RECENT POSTS */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600 }}>Recent posts</h2>
              <button
                onClick={() => onNavigate("write-post")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12,
                  color: "#00b67a",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                + Write post
              </button>
            </div>

            {loading ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 40,
                      background: "#f5f5f5",
                      borderRadius: 10,
                    }}
                  />
                ))}
              </div>
            ) : recentPosts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>✏️</div>
                <p style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>
                  No posts yet. Start publishing content!
                </p>
                <button
                  style={btnStyle("green")}
                  onClick={() => onNavigate("write-post")}
                >
                  Write first post
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recentPosts.map((post, i) => (
                  <div
                    key={post.id || i}
                    onClick={() => onNavigate("blog-post-" + post.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderBottom:
                        i < recentPosts.length - 1
                          ? "1px solid #f5f5f5"
                          : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "#f4fdf9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      {post.emoji || "📝"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.title}
                      </p>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                        {post.category} ·{" "}
                        {post.read_time || post.readTime || "5 min read"}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 99,
                        padding: "2px 10px",
                        background: post.published ? "#e6f9f2" : "#f5f5f5",
                        color: post.published ? "#00895a" : "#888",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TIP OF THE DAY + CART */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Tip */}
            <div
              style={{
                background: "linear-gradient(135deg, #f4fdf9, #eff6ff)",
                border: "1px solid #e0f0e8",
                borderRadius: 16,
                padding: "22px 24px",
                flex: 1,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#00b67a",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                Tip of the day
              </p>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{tip.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                {tip.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {tip.desc}
              </p>
            </div>

            {/* Cart summary */}
            {cartCount > 0 && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 16,
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#e6f9f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  🛒
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
                    You have items in your cart
                  </p>
                  <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                    {cartCount} item{cartCount !== 1 ? "s" : ""} waiting
                  </p>
                </div>
                <button
                  style={btnStyle("green")}
                  onClick={() => onNavigate("cart")}
                >
                  View cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
      `}</style>
    </div>
  );
}
