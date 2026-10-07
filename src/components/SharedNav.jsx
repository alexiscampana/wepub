import { useState, useEffect } from "react";
import { btnStyle, Logo } from "../../App.jsx";
import { getCart } from "../cartStore.js";

const GUEST_LINKS = [
  { label: "Features", page: "features" },
  { label: "Commerce", page: "commerce" },
  { label: "Content", page: "content" },
];

const AUTH_LINKS = [
  { label: "Dashboard", page: "dashboard" },
  { label: "Store", page: "store" },
  { label: "Blog", page: "blog" },
  { label: "Orders", page: "orders" },
];

export default function SharedNav({
  onNavigate,
  activePage = "",
  user,
  onLogout,
  onBack,
  canGoBack = false,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() =>
    getCart().reduce((s, i) => s + i.qty, 0),
  );
  const [avatarVersion, setAvatarVersion] = useState(0);

  const [localUser, setLocalUser] = useState(() => {
    if (user) return user;
    try {
      const stored = localStorage.getItem("sp_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const currentUser = user || localUser;
  const initials = currentUser?.name
    ? currentUser.name.slice(0, 2).toUpperCase()
    : "?";
  const NAV_LINKS = currentUser ? AUTH_LINKS : GUEST_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const refresh = () =>
      setCartCount(getCart().reduce((s, i) => s + i.qty, 0));
    window.addEventListener("sp_cart_updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sp_cart_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    const refresh = () => setAvatarVersion((v) => v + 1);
    window.addEventListener("sp_avatar_updated", refresh);
    return () => window.removeEventListener("sp_avatar_updated", refresh);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [userMenuOpen]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("sp_user");
    } catch {}
    try {
      localStorage.removeItem("sp_avatar_url");
    } catch {}
    setLocalUser(null);
    setUserMenuOpen(false);
    if (onLogout) onLogout();
    else onNavigate("home");
  };

  const getAvatar = () => {
    try {
      return localStorage.getItem("sp_avatar_url");
    } catch {
      return null;
    }
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 64,
          background: scrolled ? "rgba(255,255,255,0.96)" : "#fff",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid #f0f0f0",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {canGoBack && (
            <button
              onClick={onBack}
              title="Go back"
              style={{
                background: "none",
                border: "1px solid #e5e5e5",
                borderRadius: 8,
                cursor: "pointer",
                padding: "5px 10px",
                fontSize: 13,
                color: "#555",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "all 0.15s",
                fontWeight: 500,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00b67a";
                e.currentTarget.style.color = "#00b67a";
                e.currentTarget.style.background = "#f4fdf9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
                e.currentTarget.style.color = "#555";
                e.currentTarget.style.background = "none";
              }}
            >
              ← Back
            </button>
          )}
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

        {/* Desktop links — switches between guest and auth */}
        <div style={{ display: "flex", gap: 28 }} className="nav-desktop">
          {NAV_LINKS.map(({ label, page }) => {
            const isActive = activePage === page;
            return (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                data-tour={`nav-${page}`}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#00b67a" : "#555",
                  padding: "4px 0",
                  borderBottom: isActive
                    ? "2px solid #00b67a"
                    : "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#111";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#555";
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div
          style={{ display: "flex", gap: 8, alignItems: "center" }}
          className="nav-desktop"
        >
          <button
            onClick={() => onNavigate("search")}
            title="Search"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              padding: "6px 8px",
              color: "#777",
              borderRadius: 8,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            🔍
          </button>

          {currentUser ? (
            <>
              <button
                onClick={() => onNavigate("cart")}
                title="Cart"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  padding: "6px 8px",
                  color: "#777",
                  borderRadius: 8,
                  transition: "background 0.15s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                🛒
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "#00b67a",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      fontSize: 10,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  data-tour="user-menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen((o) => !o);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "1px solid #e5e5e5",
                    borderRadius: 99,
                    padding: "5px 12px 5px 6px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#00b67a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e5e5")
                  }
                >
                  {(() => {
                    const avatarSrc = getAvatar() || currentUser?.avatar_url;
                    return avatarSrc ? (
                      <img
                        key={avatarVersion}
                        src={avatarSrc}
                        alt="avatar"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#e6f9f2",
                          color: "#00b67a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {initials}
                      </div>
                    );
                  })()}
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: "#333" }}
                  >
                    {currentUser.name?.split(" ")[0] || "Account"}
                  </span>
                  <span style={{ fontSize: 10, color: "#aaa" }}>▾</span>
                </button>

                {userMenuOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ebebeb",
                      borderRadius: 14,
                      padding: "8px",
                      minWidth: 210,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      zIndex: 200,
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 12px 12px",
                        borderBottom: "1px solid #f5f5f5",
                        marginBottom: 4,
                      }}
                    >
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>
                        {currentUser.name}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#aaa",
                          margin: "2px 0 0",
                        }}
                      >
                        {currentUser.email}
                      </p>
                    </div>
                    {[
                      ["🏠", "My homepage", "home"],
                      ["📊", "Dashboard", "dashboard"],
                      ["👤", "Profile", "profile"],
                      ["🛍️", "My store", "store"],
                      ["📦", "Orders", "orders"],
                      ["🔔", "Notifications", "notifications"],
                      ["🛠️", "Admin panel", "admin"],
                      ["⚙️", "Settings", "settings"],
                    ].map(([icon, label, page]) => (
                      <button
                        key={page}
                        onClick={() => {
                          onNavigate(page);
                          setUserMenuOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          width: "100%",
                          padding: "9px 12px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#333",
                          borderRadius: 8,
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f5f5f5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "none")
                        }
                      >
                        <span>{icon}</span> {label}
                      </button>
                    ))}
                    <div
                      style={{
                        borderTop: "1px solid #f5f5f5",
                        marginTop: 4,
                        paddingTop: 4,
                      }}
                    >
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          width: "100%",
                          padding: "9px 12px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#ef4444",
                          borderRadius: 8,
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fff5f5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "none")
                        }
                      >
                        ⏻ Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate("cart")}
                title="Cart"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  padding: "6px 8px",
                  color: "#777",
                  borderRadius: 8,
                  transition: "background 0.15s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                🛒
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "#00b67a",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      fontSize: 10,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                style={btnStyle("outline")}
                onClick={() => onNavigate("login")}
              >
                Log in
              </button>
              <button
                style={btnStyle("green")}
                onClick={() => onNavigate("signup")}
              >
                Start free trial
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            padding: 4,
          }}
          className="nav-mobile"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {currentUser && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 0 16px",
                borderBottom: "1px solid #f5f5f5",
                marginBottom: 4,
              }}
            >
              {(() => {
                const avatarSrc = getAvatar() || currentUser?.avatar_url;
                return avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#e6f9f2",
                      color: "#00b67a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {initials}
                  </div>
                );
              })()}
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
                  {currentUser.name}
                </p>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                  {currentUser.email}
                </p>
              </div>
            </div>
          )}

          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                onNavigate(page);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                color: activePage === page ? "#00b67a" : "#333",
                padding: "10px 0",
                textAlign: "left",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              {label}
            </button>
          ))}

          {currentUser ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: 8,
              }}
            >
              {[
                ["Admin panel", "admin"],
                ["Profile", "profile"],
                ["Settings", "settings"],
              ].map(([label, page]) => (
                <button
                  key={page}
                  onClick={() => {
                    onNavigate(page);
                    setMenuOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#555",
                    padding: "8px 0",
                    textAlign: "left",
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                style={{
                  ...btnStyle("outline"),
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                  color: "#ef4444",
                  borderColor: "#fca5a5",
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                style={{
                  ...btnStyle("outline"),
                  flex: 1,
                  justifyContent: "center",
                }}
                onClick={() => {
                  onNavigate("login");
                  setMenuOpen(false);
                }}
              >
                Log in
              </button>
              <button
                style={{
                  ...btnStyle("green"),
                  flex: 1,
                  justifyContent: "center",
                }}
                onClick={() => {
                  onNavigate("signup");
                  setMenuOpen(false);
                }}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
