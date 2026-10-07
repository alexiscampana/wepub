import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    icon: "📦",
    title: "Your order has been delivered",
    body: "Order SP-48291 was delivered to your address. How did we do?",
    time: "2 hours ago",
    read: false,
    action: "orders",
  },
  {
    id: 2,
    type: "promo",
    icon: "🎟️",
    title: "You have a new discount code",
    body: "Use SUMMER20 for 20% off your next order. Expires June 30.",
    time: "5 hours ago",
    read: false,
    action: "store",
  },
  {
    id: 3,
    type: "system",
    icon: "🔒",
    title: "New login detected",
    body: "A new login was detected from Chrome on Windows. If this wasn't you, please secure your account.",
    time: "Yesterday",
    read: false,
    action: "settings",
  },
  {
    id: 4,
    type: "order",
    icon: "🚚",
    title: "Your order has shipped",
    body: "Order SP-41073 has been picked up by FedEx. Tracking: 1Z999AA101.",
    time: "2 days ago",
    read: true,
    action: "orders",
  },
  {
    id: 5,
    type: "blog",
    icon: "✏️",
    title: "New article: SEO guide for 2026",
    body: "We just published the complete SEO guide for e-commerce stores. Check it out.",
    time: "3 days ago",
    read: true,
    action: "blog",
  },
  {
    id: 6,
    type: "promo",
    icon: "🎉",
    title: "Congrats! You've reached 100 visitors",
    body: "Your store hit 100 unique visitors this month. Keep it up!",
    time: "4 days ago",
    read: true,
    action: "dashboard",
  },
  {
    id: 7,
    type: "system",
    icon: "⚙️",
    title: "Settings updated",
    body: "Your store currency has been changed to USD.",
    time: "1 week ago",
    read: true,
    action: "settings",
  },
  {
    id: 8,
    type: "order",
    icon: "⭐",
    title: "Leave a review",
    body: "You received your Wireless Charging Pad. Would you like to leave a review?",
    time: "1 week ago",
    read: true,
    action: "store",
  },
];

const TABS = ["All", "Orders", "Promos", "System"];

const TYPE_COLORS = {
  order: { bg: "#e3f2fd", color: "#1565c0" },
  promo: { bg: "#fef3c7", color: "#92400e" },
  system: { bg: "#ede9fe", color: "#5b21b6" },
  blog: { bg: "#e6f9f2", color: "#065f46" },
};

export default function NotificationsPage({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("All");
  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const deleteNotif = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  const filtered = notifications.filter((n) => {
    if (activeTab === "All") return true;
    if (activeTab === "Orders") return n.type === "order";
    if (activeTab === "Promos") return n.type === "promo";
    if (activeTab === "System") return n.type === "system";
    return true;
  });

  const SIDEBAR = [
    { icon: "🏠", label: "Dashboard", page: "dashboard" },
    { icon: "🛍️", label: "Products", page: "store" },
    { icon: "📦", label: "Orders", page: "orders" },
    { icon: "🔔", label: "Notifications", page: "notifications", active: true },
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
                position: "relative",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {item.label === "Notifications" && unreadCount > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#ef4444",
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
                  {unreadCount}
                </span>
              )}
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
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
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
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 4,
                  letterSpacing: "-0.5px",
                }}
              >
                Notifications
                {unreadCount > 0 && (
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#aaa",
                      marginLeft: 10,
                    }}
                  >
                    {unreadCount} unread
                  </span>
                )}
              </h1>
              <p style={{ fontSize: 14, color: "#888" }}>
                Stay up to date with your store and account.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {unreadCount > 0 && (
                <button style={btnStyle("outline")} onClick={markAllRead}>
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button style={btnStyle("outline")} onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {TABS.map((tab) => {
              const count =
                tab === "All"
                  ? notifications.filter((n) => !n.read).length
                  : notifications.filter(
                      (n) =>
                        !n.read &&
                        (tab === "Orders"
                          ? n.type === "order"
                          : tab === "Promos"
                            ? n.type === "promo"
                            : n.type === "system"),
                    ).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 99,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid",
                    background: activeTab === tab ? "#111" : "#fff",
                    color: activeTab === tab ? "#fff" : "#555",
                    borderColor: activeTab === tab ? "#111" : "#ddd",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {tab}
                  {count > 0 && (
                    <span
                      style={{
                        background:
                          activeTab === tab
                            ? "rgba(255,255,255,0.2)"
                            : "#ef4444",
                        color: "#fff",
                        borderRadius: 99,
                        padding: "0 6px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* NOTIFICATIONS */}
          {filtered.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}
            >
              <div style={{ fontSize: 48, marginBottom: 14 }}>🔔</div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#777",
                  marginBottom: 6,
                }}
              >
                All caught up!
              </p>
              <p style={{ fontSize: 14 }}>No notifications here.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((n) => (
                <div
                  key={n.id}
                  style={{
                    background: n.read ? "#fff" : "#fafffe",
                    border: `1px solid ${n.read ? "#ebebeb" : "#c8f0e0"}`,
                    borderRadius: 14,
                    padding: "16px 18px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    transition: "box-shadow 0.15s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  {/* Unread dot */}
                  {!n.read && (
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        left: -4,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#00b67a",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: TYPE_COLORS[n.type].bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {n.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: n.read ? 400 : 600,
                          margin: "0 0 4px",
                          color: "#111",
                        }}
                      >
                        {n.title}
                      </p>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#aaa",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {n.time}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#666",
                        margin: "0 0 10px",
                        lineHeight: 1.5,
                      }}
                    >
                      {n.body}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {n.action && (
                        <button
                          onClick={() => {
                            markRead(n.id);
                            onNavigate(n.action);
                          }}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#00b67a",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            padding: 0,
                          }}
                        >
                          View →
                        </button>
                      )}
                      {!n.read && (
                        <button
                          onClick={() => markRead(n.id)}
                          style={{
                            fontSize: 12,
                            color: "#aaa",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            padding: 0,
                          }}
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotif(n.id)}
                        style={{
                          fontSize: 12,
                          color: "#ccc",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                          padding: 0,
                          marginLeft: "auto",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#ccc")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NOTIFICATION SETTINGS SHORTCUT */}
          {notifications.length > 0 && (
            <div
              style={{
                marginTop: 28,
                padding: "16px 20px",
                background: "#fafafa",
                border: "1px solid #ebebeb",
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 2px" }}>
                  Notification preferences
                </p>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                  Choose what you want to be notified about.
                </p>
              </div>
              <button
                style={btnStyle("outline")}
                onClick={() => onNavigate("settings")}
              >
                Manage →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
