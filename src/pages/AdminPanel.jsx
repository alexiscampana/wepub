import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";
import { SkeletonStats } from "../components/Skeletons.jsx";

const TABS = ["Overview", "Products", "Orders", "Posts"];

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: 89,
    category: "Home",
    emoji: "🪔",
    stock: 24,
    status: "active",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Kit",
    price: 64,
    category: "Kitchen",
    emoji: "☕",
    stock: 12,
    status: "active",
  },
  {
    id: 3,
    name: "Linen Notebook A5",
    price: 28,
    category: "Stationery",
    emoji: "📓",
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 49,
    category: "Tech",
    emoji: "⚡",
    stock: 8,
    status: "active",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 149,
    category: "Tech",
    emoji: "⌨️",
    stock: 3,
    status: "low_stock",
  },
];

const SAMPLE_ORDERS = [
  {
    id: "SP-48291",
    customer: "Leila K.",
    email: "leila@example.com",
    total: 217,
    items: 3,
    status: "delivered",
    date: "May 30, 2026",
  },
  {
    id: "SP-41073",
    customer: "Marcus J.",
    email: "marcus@example.com",
    total: 28,
    items: 1,
    status: "shipped",
    date: "May 10, 2026",
  },
  {
    id: "SP-38842",
    customer: "Sofia R.",
    email: "sofia@example.com",
    total: 49,
    items: 1,
    status: "delivered",
    date: "Apr 22, 2026",
  },
  {
    id: "SP-35910",
    customer: "Daniel F.",
    email: "daniel@example.com",
    total: 153,
    items: 2,
    status: "processing",
    date: "Apr 15, 2026",
  },
  {
    id: "SP-33204",
    customer: "Priya M.",
    email: "priya@example.com",
    total: 89,
    items: 1,
    status: "processing",
    date: "Apr 8, 2026",
  },
];

const SAMPLE_POSTS = [
  {
    id: 1,
    title: "How content marketing drives 3x more sales",
    category: "Commerce",
    status: "published",
    date: "May 28, 2026",
    emoji: "📈",
  },
  {
    id: 2,
    title: "The complete SEO guide for e-commerce 2026",
    category: "SEO",
    status: "published",
    date: "May 22, 2026",
    emoji: "🔍",
  },
  {
    id: 3,
    title: "10 block editor tricks for publishers",
    category: "Content",
    status: "draft",
    date: "May 15, 2026",
    emoji: "✏️",
  },
];

const STATUS_COLORS = {
  active: { bg: "#e6f9f2", color: "#00895a", label: "Active" },
  out_of_stock: { bg: "#fee2e2", color: "#991b1b", label: "Out of stock" },
  low_stock: { bg: "#fef3c7", color: "#92400e", label: "Low stock" },
  delivered: { bg: "#e6f9f2", color: "#00895a", label: "Delivered" },
  shipped: { bg: "#e3f2fd", color: "#1565c0", label: "Shipped" },
  processing: { bg: "#fef3c7", color: "#92400e", label: "Processing" },
  published: { bg: "#e6f9f2", color: "#00895a", label: "Published" },
  draft: { bg: "#f5f5f5", color: "#555", label: "Draft" },
};

export default function AdminPanel({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const [activeTab, setActiveTab] = useState("Overview");
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const toast = useToast();

  const displayName = user?.name || "Admin";
  const initials = displayName.slice(0, 2).toUpperCase();

  // Load real data from Supabase
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { getProducts, getPosts, getOrders } =
          await import("../supabaseService.js");
        const [prodRes, postRes] = await Promise.all([
          getProducts({ limit: 100 }),
          getPosts({ limit: 100 }),
        ]);
        if (prodRes.data?.length) setProducts(prodRes.data);
        if (postRes.data?.length) setPosts(postRes.data);
        if (user?.id) {
          const ordRes = await getOrders(user.id);
          if (ordRes.data?.length) setOrders(ordRes.data);
        }
      } catch {
        /* use sample data */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleDeleteProduct = async (id) => {
    try {
      const { deleteProduct } = await import("../supabaseService.js");
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
      toast.success("Product deleted");
    } catch {
      setProducts((p) => p.filter((x) => x.id !== id));
      toast.info("Product removed");
    }
    setConfirmDelete(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { updateOrderStatus } = await import("../supabaseService.js");
      await updateOrderStatus(orderId, newStatus);
    } catch {
      /* continue */
    }
    setOrders((o) =>
      o.map((x) => (x.id === orderId ? { ...x, status: newStatus } : x)),
    );
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  const SIDEBAR = [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "🛠️", label: "Admin", page: "admin", active: true },
    { icon: "🛍️", label: "Add product", page: "add-product" },
    { icon: "✏️", label: "Write post", page: "write-post" },
    { icon: "📦", label: "Orders", page: "orders" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredOrders = orders.filter(
    (o) =>
      (o.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.customer || "").toLowerCase().includes(search.toLowerCase()),
  );

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Admin Panel
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={btnStyle("outline")}
              onClick={() => onNavigate("add-product")}
            >
              + Product
            </button>
            <button
              style={btnStyle("green")}
              onClick={() => onNavigate("write-post")}
            >
              + Post
            </button>
          </div>
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #f0f0f0",
            marginBottom: 24,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearch("");
              }}
              style={{
                padding: "10px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#00b67a" : "#777",
                borderBottom: `2px solid ${activeTab === tab ? "#00b67a" : "transparent"}`,
                marginBottom: -1,
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {loading ? (
              <SkeletonStats />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                  gap: 14,
                }}
              >
                {[
                  {
                    icon: "💰",
                    label: "Total revenue",
                    value: `$${totalRevenue.toLocaleString()}`,
                    bg: "#e6f9f2",
                    color: "#00b67a",
                  },
                  {
                    icon: "📦",
                    label: "Total orders",
                    value: orders.length,
                    bg: "#e3f2fd",
                    color: "#2196f3",
                  },
                  {
                    icon: "🛍️",
                    label: "Products",
                    value: products.length,
                    bg: "#ede9fe",
                    color: "#7c3aed",
                  },
                  {
                    icon: "✏️",
                    label: "Posts",
                    value: posts.length,
                    bg: "#fef3c7",
                    color: "#d97706",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "#fff",
                      border: "1px solid #ebebeb",
                      borderRadius: 16,
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{ fontSize: 12, color: "#888", fontWeight: 500 }}
                      >
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
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-0.5px",
                        color: s.color,
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recent orders summary */}
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
                  marginBottom: 16,
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>Recent orders</h3>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "#00b67a",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onClick={() => setActiveTab("Orders")}
                >
                  View all →
                </button>
              </div>
              {orders.slice(0, 4).map((o, i) => (
                <div
                  key={o.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid #f5f5f5" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#555",
                      minWidth: 90,
                    }}
                  >
                    {o.id}
                  </span>
                  <span style={{ fontSize: 13, flex: 1 }}>{o.customer}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    ${o.total}
                  </span>
                  <span
                    style={{
                      background: STATUS_COLORS[o.status]?.bg,
                      color: STATUS_COLORS[o.status]?.color,
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 99,
                      padding: "2px 10px",
                    }}
                  >
                    {STATUS_COLORS[o.status]?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "Products" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "9px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button
                style={btnStyle("green")}
                onClick={() => onNavigate("add-product")}
              >
                + Add product
              </button>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    {[
                      "Product",
                      "Category",
                      "Price",
                      "Stock",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#aaa",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, i) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom:
                          i < filteredProducts.length - 1
                            ? "1px solid #f5f5f5"
                            : "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#fafafa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#fff")
                      }
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ fontSize: 22 }}>
                            {p.emoji || "🛍️"}
                          </span>
                          <span style={{ fontWeight: 500 }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#666" }}>
                        {p.category}
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                        ${p.price}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color:
                            p.stock === 0
                              ? "#ef4444"
                              : p.stock <= 5
                                ? "#f59e0b"
                                : "#555",
                        }}
                      >
                        {p.stock ?? "—"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: STATUS_COLORS[p.status || "active"]?.bg,
                            color: STATUS_COLORS[p.status || "active"]?.color,
                            fontSize: 11,
                            fontWeight: 600,
                            borderRadius: 99,
                            padding: "3px 10px",
                          }}
                        >
                          {STATUS_COLORS[p.status || "active"]?.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            style={{
                              ...btnStyle("outline"),
                              padding: "4px 10px",
                              fontSize: 12,
                            }}
                            onClick={() => onNavigate("product-" + p.id)}
                          >
                            View
                          </button>
                          <button
                            style={{
                              padding: "4px 10px",
                              fontSize: 12,
                              border: "1px solid #fecaca",
                              background: "#fff5f5",
                              color: "#ef4444",
                              borderRadius: 8,
                              cursor: "pointer",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                            onClick={() => setConfirmDelete(p.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "Orders" && (
          <div>
            <input
              type="text"
              placeholder="🔍 Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                border: "1px solid #ddd",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 16,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    {[
                      "Order",
                      "Customer",
                      "Total",
                      "Date",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#aaa",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o, i) => (
                    <tr
                      key={o.id}
                      style={{
                        borderBottom:
                          i < filteredOrders.length - 1
                            ? "1px solid #f5f5f5"
                            : "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#fafafa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#fff")
                      }
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          color: "#555",
                        }}
                      >
                        {o.id}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>
                          {o.customer}
                        </div>
                        <div style={{ fontSize: 11, color: "#aaa" }}>
                          {o.email}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 700 }}>
                        ${o.total}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "#888",
                          fontSize: 13,
                        }}
                      >
                        {o.date}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: STATUS_COLORS[o.status]?.bg,
                            color: STATUS_COLORS[o.status]?.color,
                            fontSize: 11,
                            fontWeight: 600,
                            borderRadius: 99,
                            padding: "3px 10px",
                          }}
                        >
                          {STATUS_COLORS[o.status]?.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusChange(o.id, e.target.value)
                          }
                          style={{
                            padding: "4px 8px",
                            border: "1px solid #ddd",
                            borderRadius: 8,
                            fontSize: 12,
                            fontFamily: "'DM Sans', sans-serif",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          {[
                            "processing",
                            "shipped",
                            "delivered",
                            "cancelled",
                          ].map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* POSTS TAB */}
        {activeTab === "Posts" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <button
                style={btnStyle("green")}
                onClick={() => onNavigate("write-post")}
              >
                + Write post
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 14,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{post.emoji || "📝"}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        margin: "0 0 3px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.title}
                    </p>
                    <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                      {post.category} · {post.date}
                    </p>
                  </div>
                  <span
                    style={{
                      background: STATUS_COLORS[post.status || "draft"]?.bg,
                      color: STATUS_COLORS[post.status || "draft"]?.color,
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 99,
                      padding: "3px 10px",
                    }}
                  >
                    {STATUS_COLORS[post.status || "draft"]?.label}
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={{
                        ...btnStyle("outline"),
                        padding: "4px 10px",
                        fontSize: 12,
                      }}
                      onClick={() => onNavigate("blog")}
                    >
                      View
                    </button>
                    <button
                      style={{
                        ...btnStyle("outline"),
                        padding: "4px 10px",
                        fontSize: 12,
                      }}
                      onClick={() => onNavigate("write-post")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
        {confirmDelete && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "28px",
                maxWidth: 380,
                width: "100%",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 14 }}>🗑️</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                Delete this product?
              </h3>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
                This action cannot be undone.
              </p>
              <div
                style={{ display: "flex", gap: 10, justifyContent: "center" }}
              >
                <button
                  style={btnStyle("outline")}
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    ...btnStyle("outline"),
                    color: "#ef4444",
                    borderColor: "#fca5a5",
                  }}
                  onClick={() => handleDeleteProduct(confirmDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
