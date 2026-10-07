import { useState, useRef } from "react";
import { useToast } from "./Toast.jsx";

const AVATAR_KEY = "sp_avatar_url";

function getSavedAvatar() {
  try {
    return localStorage.getItem(AVATAR_KEY) || null;
  } catch {
    return null;
  }
}

function saveAvatar(url) {
  try {
    localStorage.setItem(AVATAR_KEY, url);
    const stored = localStorage.getItem("sp_user");
    if (stored) {
      const user = JSON.parse(stored);
      user.avatar_url = url;
      localStorage.setItem("sp_user", JSON.stringify(user));
    }
  } catch {}
}

export default function AvatarUpload({ user, size = 64, onUpdate }) {
  const [avatarUrl, setAvatarUrl] = useState(
    () =>
      getSavedAvatar() ||
      user?.avatar_url ||
      user?.user_metadata?.avatar_url ||
      null,
  );
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();

  const initials = (user?.name || "?").slice(0, 2).toUpperCase();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setAvatarUrl(dataUrl);
      saveAvatar(dataUrl);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const { supabase } = await import("../supabase.js");
      const ext = file.name.split(".").pop();
      const path = `avatars/${user?.id || "guest"}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });

      console.log("Upload error:", uploadError);

      if (!uploadError) {
        const { data } = supabase.storage.from("avatars").getPublicUrl(path);
        const publicUrl = data?.publicUrl;
        if (publicUrl) {
          setAvatarUrl(publicUrl);
          saveAvatar(publicUrl);

          // Update auth metadata
          await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });

          // Save to profiles table so it persists after logout
          await supabase
            .from("profiles")
            .update({ avatar_url: publicUrl })
            .eq("id", user?.id);

          if (onUpdate) onUpdate(publicUrl);
          toast.success("Profile photo updated!");
          return;
        }
      }
      if (onUpdate) onUpdate(avatarUrl);
      toast.success("Profile photo saved!");
    } catch {
      if (onUpdate) onUpdate(avatarUrl);
      toast.success("Profile photo saved!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: avatarUrl ? "transparent" : "#e6f9f2",
          color: "#00b67a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.3,
          fontWeight: 700,
          cursor: uploading ? "not-allowed" : "pointer",
          border: "3px solid #fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          overflow: "hidden",
          transition: "opacity 0.2s",
          opacity: uploading ? 0.7 : 1,
          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!uploading) {
            const o = e.currentTarget.querySelector(".av-overlay");
            if (o) o.style.opacity = "1";
          }
        }}
        onMouseLeave={(e) => {
          const o = e.currentTarget.querySelector(".av-overlay");
          if (o) o.style.opacity = "0";
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setAvatarUrl(null)}
          />
        ) : (
          initials
        )}
        <div
          className="av-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s",
            borderRadius: "50%",
          }}
        >
          <span style={{ fontSize: size * 0.22, color: "#fff" }}>📷</span>
        </div>
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                width: size * 0.3,
                height: size * 0.3,
                border: "3px solid #f0f0f0",
                borderTop: "3px solid #00b67a",
                borderRadius: "50%",
                animation: "sp-spin 0.7s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      {!uploading && (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: size * 0.32,
            height: size * 0.32,
            borderRadius: "50%",
            background: "#00b67a",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: size * 0.16,
          }}
        >
          ✏️
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <style>{`@keyframes sp-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
