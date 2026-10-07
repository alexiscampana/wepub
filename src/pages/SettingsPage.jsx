import { useState } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";
import AvatarUpload from "../components/AvatarUpload.jsx";

const SIDEBAR_ITEMS = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "🛍️", label: "Products" },
  { icon: "📦", label: "Orders" },
  { icon: "✏️", label: "Content" },
  { icon: "📊", label: "Analytics" },
  { icon: "🔌", label: "Plugins" },
  { icon: "🎨", label: "Themes" },
  { icon: "⚙️", label: "Settings", active: true },
];

const TABS = ["Profile", "Store", "Notifications", "Security"];

export default function SettingsPage({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    website: "",
  });
  const [store, setStore] = useState({
    storeName: "My ShopPress Store",
    currency: "USD",
    timezone: "UTC-5",
    language: "English",
  });
  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    weeklyReport: false,
    marketing: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const displayName = user?.name || "there";
  const initials = displayName.slice(0, 2).toUpperCase();
  const toast = useToast();

  const handleSave = async () => {
    try {
      const { supabase } = await import("../supabase.js");
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        toast.error("Not logged in.");
        return;
      }

      // Try update first
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: profile.name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", authUser.id);

      if (updateError) {
        console.error("Update error:", updateError);
        toast.error("Failed: " + updateError.message);
        return;
      }

      // Also update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: profile.name, name: profile.name },
      });

      setSaved(true);
      toast.success("Changes saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save changes.");
    }
  };

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
              onClick={() =>
                item.label === "Dashboard"
                  ? onNavigate("dashboard")
                  : item.label !== "Settings"
                    ? null
                    : null
              }
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
            <div style={{ fontSize: 11, color: "#aaa" }}>
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
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
              letterSpacing: "-0.5px",
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: 15, color: "#888" }}>
            Manage your account, store, and preferences.
          </p>
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #f0f0f0",
            marginBottom: 32,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
                transition: "all 0.15s",
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === "Profile" && (
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "28px",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Profile information
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <AvatarUpload
                  user={user}
                  size={64}
                  onUpdate={(url) => {
                    toast.success("Profile photo updated!");
                    window.dispatchEvent(new Event("sp_avatar_updated"));
                  }}
                />
                <div>
                  <p style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>
                    Click the photo to upload. JPG, PNG up to 2MB
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Field
                  label="Full name"
                  value={profile.name}
                  onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
                  placeholder="Your name"
                />
                <Field
                  label="Email address"
                  value={profile.email}
                  onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                  placeholder="you@example.com"
                  type="email"
                />
                <Field
                  label="Bio"
                  value={profile.bio}
                  onChange={(v) => setProfile((p) => ({ ...p, bio: v }))}
                  placeholder="A short bio..."
                  textarea
                />
                <Field
                  label="Website"
                  value={profile.website}
                  onChange={(v) => setProfile((p) => ({ ...p, website: v }))}
                  placeholder="https://yoursite.com"
                />
              </div>
            </div>
            <SaveBar onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* STORE TAB */}
        {activeTab === "Store" && (
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "28px",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Store settings
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Field
                  label="Store name"
                  value={store.storeName}
                  onChange={(v) => setStore((s) => ({ ...s, storeName: v }))}
                  placeholder="My Store"
                />
                <SelectField
                  label="Currency"
                  value={store.currency}
                  onChange={(v) => setStore((s) => ({ ...s, currency: v }))}
                  options={["USD", "EUR", "GBP", "CAD", "AUD", "PHP", "JPY"]}
                />
                <SelectField
                  label="Timezone"
                  value={store.timezone}
                  onChange={(v) => setStore((s) => ({ ...s, timezone: v }))}
                  options={[
                    "UTC-8",
                    "UTC-7",
                    "UTC-6",
                    "UTC-5",
                    "UTC+0",
                    "UTC+8",
                  ]}
                />
                <SelectField
                  label="Language"
                  value={store.language}
                  onChange={(v) => setStore((s) => ({ ...s, language: v }))}
                  options={[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Japanese",
                    "Filipino",
                  ]}
                />
              </div>
            </div>
            <SaveBar onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "Notifications" && (
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "28px",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Email notifications
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  {
                    key: "newOrder",
                    label: "New orders",
                    desc: "Get notified when a customer places an order.",
                  },
                  {
                    key: "lowStock",
                    label: "Low stock alerts",
                    desc: "Alert when a product drops below 5 units.",
                  },
                  {
                    key: "weeklyReport",
                    label: "Weekly report",
                    desc: "A summary of your sales and traffic every Monday.",
                  },
                  {
                    key: "marketing",
                    label: "Tips & updates",
                    desc: "Product news, tips, and ShopPress announcements.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderBottom: i < 3 ? "1px solid #f5f5f5" : "none",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        {item.label}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#888", marginTop: 2 }}
                      >
                        {item.desc}
                      </div>
                    </div>
                    <Toggle
                      value={notifications[item.key]}
                      onChange={(v) =>
                        setNotifications((n) => ({ ...n, [item.key]: v }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <SaveBar onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "Security" && (
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "28px",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Change password
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <Field
                  label="Current password"
                  value={security.currentPassword}
                  onChange={(v) =>
                    setSecurity((s) => ({ ...s, currentPassword: v }))
                  }
                  type="password"
                  placeholder="••••••••"
                />
                <Field
                  label="New password"
                  value={security.newPassword}
                  onChange={(v) =>
                    setSecurity((s) => ({ ...s, newPassword: v }))
                  }
                  type="password"
                  placeholder="Min. 8 characters"
                />
                <Field
                  label="Confirm new password"
                  value={security.confirmPassword}
                  onChange={(v) =>
                    setSecurity((s) => ({ ...s, confirmPassword: v }))
                  }
                  type="password"
                  placeholder="Repeat new password"
                />
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "28px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}
                  >
                    Two-factor authentication
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    Add an extra layer of security to your account.
                  </div>
                </div>
                <Toggle
                  value={security.twoFactor}
                  onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))}
                />
              </div>
            </div>
            <SaveBar onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* ACCOUNT TAB - replaces billing since WePub is free */}
        {activeTab === "Billing" && null}
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}) {
  const style = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    border: "1px solid #ddd",
    borderRadius: 10,
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    color: "#111",
    boxSizing: "border-box",
    resize: textarea ? "vertical" : undefined,
    minHeight: textarea ? 80 : undefined,
  };
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
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={style}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={style}
        />
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: 14,
          border: "1px solid #ddd",
          borderRadius: 10,
          outline: "none",
          fontFamily: "'DM Sans', sans-serif",
          color: "#111",
          boxSizing: "border-box",
          background: "#fff",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 99,
        border: "none",
        cursor: "pointer",
        background: value ? "#00b67a" : "#ddd",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: value ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}

function SaveBar({ onSave, saved }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
      }}
    >
      {saved && (
        <span style={{ fontSize: 13, color: "#00b67a", fontWeight: 500 }}>
          ✓ Changes saved!
        </span>
      )}
      <button style={btnStyle("green")} onClick={onSave}>
        Save changes
      </button>
    </div>
  );
}
