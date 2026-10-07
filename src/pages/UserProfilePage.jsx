import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import SharedNav from "../components/SharedNav.jsx";
import SharedFooter from "../components/SharedFooter.jsx";
import { useToast } from "../components/Toast.jsx";
import AvatarUpload from "../components/AvatarUpload.jsx";

export default function UserProfilePage({ onNavigate, onLogout, user }) {
  if (!user) return null;
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex@example.com",
    bio: "",
    website: "",
    location: "",
    joined: "2026",
    twitter: "",
  });
  const [saved, setSaved] = useState(false);
  const toast = useToast();
  const set = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));
  const initials = profile.name.slice(0, 2).toUpperCase();

  // Load real profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      try {
        const { getUserProfile } = await import("../supabaseService.js");
        const { data, error } = await getUserProfile(user.id);
        if (!error && data) {
          setProfile((p) => ({
            ...p,
            name: data.name || p.name,
            bio: data.bio || p.bio,
            website: data.website || p.website,
            location: data.location || p.location,
            twitter: data.twitter || p.twitter,
          }));
        }
      } catch {
        /* use defaults */
      }
    };
    loadProfile();
  }, [user?.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (user?.id) {
        const { updateUserProfile } = await import("../supabaseService.js");
        const { error } = await updateUserProfile(user.id, {
          name: profile.name,
          bio: profile.bio,
          website: profile.website,
          location: profile.location,
          twitter: profile.twitter,
        });
        if (error) {
          toast.error("Failed to save. Please try again.");
          return;
        }
      }
      setSaved(true);
      toast.success("Profile updated successfully!");
      setEditing(false);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const ACTIVITY = [
    {
      icon: "🛍️",
      text: "Added Minimal Desk Lamp to your store",
      time: "2 days ago",
    },
    { icon: "✏️", text: "Published: 'My first blog post'", time: "5 days ago" },
    { icon: "⚙️", text: "Updated store settings", time: "1 week ago" },
    { icon: "🎉", text: "Joined WePub", time: profile.joined },
  ];

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

      {/* TOP NAV */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
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
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={btnStyle("outline")}
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>
          {onLogout && (
            <button style={btnStyle("outline")} onClick={onLogout}>
              Log out
            </button>
          )}
        </div>
      </nav>

      {/* PROFILE HEADER */}
      <section
        style={{
          background: "linear-gradient(135deg, #f4fdf9 0%, #eff6ff 100%)",
          borderBottom: "1px solid #f0f0f0",
          padding: "48px 40px 0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <AvatarUpload
              user={user}
              size={88}
              onUpdate={(url) => {
                toast.success("Profile photo updated!");
                window.dispatchEvent(new Event("sp_avatar_updated"));
              }}
            />
            <div style={{ flex: 1, paddingBottom: 20 }}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 4,
                  letterSpacing: "-0.5px",
                }}
              >
                {profile.name}
              </h1>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 0 }}>
                {profile.bio}
              </p>
            </div>
            <div style={{ paddingBottom: 20 }}>
              {!editing ? (
                <button
                  style={btnStyle("outline")}
                  onClick={() => setEditing(true)}
                >
                  ✏️ Edit profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={btnStyle("outline")}
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ ...btnStyle("green"), opacity: saving ? 0.7 : 1 }}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              gap: 24,
              padding: "24px 0 0 112px",
              flexWrap: "wrap",
            }}
          >
            {[
              ["📍", profile.location],
              ["🌐", profile.website],
              ["🐦", profile.twitter],
              ["🗓️", `Joined ${profile.joined}`],
            ].map(
              ([icon, val]) =>
                val && (
                  <span
                    key={val}
                    style={{
                      fontSize: 13,
                      color: "#777",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {icon} {val}
                  </span>
                ),
            )}
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginTop: 20,
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {["Overview", "Store", "Posts"].map((tab, i) => (
              <button
                key={tab}
                style={{
                  padding: "12px 20px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? "#00b67a" : "#777",
                  borderBottom:
                    i === 0 ? "2px solid #00b67a" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section
        style={{
          maxWidth: 900,
          margin: "32px auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 20,
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Edit form */}
          {editing && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 16,
                padding: "24px",
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                Edit your profile
              </h2>
              {saved && (
                <div
                  style={{
                    background: "#e6f9f2",
                    border: "1px solid #c8f0e0",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "#00895a",
                    marginBottom: 16,
                  }}
                >
                  ✓ Profile saved!
                </div>
              )}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <Field
                  label="Display name"
                  value={profile.name}
                  onChange={set("name")}
                />
                <Field
                  label="Bio"
                  value={profile.bio}
                  onChange={set("bio")}
                  textarea
                />
                <Field
                  label="Location"
                  value={profile.location}
                  onChange={set("location")}
                  placeholder="City, Country"
                />
                <Field
                  label="Website"
                  value={profile.website}
                  onChange={set("website")}
                  placeholder="https://yoursite.com"
                />
                <Field
                  label="Twitter"
                  value={profile.twitter}
                  onChange={set("twitter")}
                  placeholder="@handle"
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
              Store overview
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {[
                ["💰", "$0", "Revenue"],
                ["📦", "0", "Orders"],
                ["🛍️", "0", "Products"],
              ].map(([icon, val, label]) => (
                <div
                  key={label}
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    background: "#fafafa",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {val}
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
              Recent activity
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom:
                      i < ACTIVITY.length - 1 ? "1px solid #f5f5f5" : "none",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: "#444", margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#aaa",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Quick links */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
              Quick links
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["⚙️", "Account settings", "settings"],
                ["🛍️", "My store", "store"],
                ["📊", "Analytics", "dashboard"],
                ["💬", "Get support", "contact"],
              ].map(([icon, label, page]) => (
                <button
                  key={label}
                  onClick={() => onNavigate(page)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: "#fafafa",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#444",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fafafa")
                  }
                >
                  <span>{icon}</span> {label}{" "}
                  <span style={{ marginLeft: "auto", color: "#ccc" }}>→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Free account badge */}
          <div
            style={{
              background: "linear-gradient(135deg, #f4fdf9, #e6f9f2)",
              border: "1px solid #c8f0e0",
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#00895a",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Account status
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              ✅ Free forever
            </div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>
              No fees · No limits · Always free
            </div>
            <button
              style={{
                ...btnStyle("green"),
                width: "100%",
                justifyContent: "center",
                fontSize: 13,
              }}
              onClick={() => onNavigate("store")}
            >
              View my store →
            </button>
          </div>
        </div>
      </section>

      <div style={{ height: 40 }} />
      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea }) {
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
    minHeight: textarea ? 72 : undefined,
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
          onChange={onChange}
          placeholder={placeholder}
          style={style}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
        />
      )}
    </div>
  );
}
