import { useState, useEffect } from "react";
import { btnStyle } from "../../App.jsx";
import { useToast } from "../components/Toast.jsx";

// Drop this component into SettingsPage.jsx (e.g. as a "Security" tab/section).
// Uses Supabase's built-in TOTP MFA — works with Google Authenticator, Authy, etc.
export default function MFASetup() {
  const [factors, setFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [factorId, setFactorId] = useState(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const toast = useToast();

  const loadFactors = async () => {
    setLoading(true);
    try {
      const { supabase } = await import("../supabase.js");
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (!error) setFactors(data?.totp || []);
    } catch {
      /* supabase not available */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFactors(); }, []);

  const startEnroll = async () => {
    setEnrolling(true);
    try {
      const { supabase } = await import("../supabase.js");
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
      if (error) {
        toast.error(error.message || "Could not start MFA setup.");
        setEnrolling(false);
        return;
      }
      setQrCode(data.totp.qr_code);
      setFactorId(data.id);
    } catch {
      toast.error("Something went wrong starting MFA setup.");
      setEnrolling(false);
    }
  };

  const confirmEnroll = async (e) => {
    e.preventDefault();
    if (verifyCode.length < 6) return;
    setVerifying(true);
    try {
      const { supabase } = await import("../supabase.js");
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: verifyCode,
      });
      if (verifyError) throw verifyError;

      toast.success("Two-factor authentication enabled ✓");
      setQrCode(null);
      setFactorId(null);
      setVerifyCode("");
      setEnrolling(false);
      loadFactors();
    } catch (err) {
      toast.error(err.message || "Invalid code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const removeFactor = async (id) => {
    try {
      const { supabase } = await import("../supabase.js");
      const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
      if (error) throw error;
      toast.success("Two-factor authentication removed");
      loadFactors();
    } catch (err) {
      toast.error(err.message || "Could not remove this method.");
    }
  };

  if (loading) return <p style={{ fontSize: 14, color: "#888" }}>Loading security settings…</p>;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Two-factor authentication</h3>
      <p style={{ fontSize: 13, color: "#777", marginBottom: 20, lineHeight: 1.6 }}>
        Add an extra layer of security to your account using an authenticator app like Google Authenticator or Authy.
      </p>

      {factors.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          {factors.map((f) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: "1px solid #ebebeb", borderRadius: 12, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#00b67a", fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14 }}>Authenticator app {f.friendly_name ? `(${f.friendly_name})` : ""}</span>
              </div>
              <button onClick={() => removeFactor(f.id)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {!enrolling && factors.length === 0 && (
        <button style={btnStyle("green")} onClick={startEnroll}>
          Enable two-factor authentication
        </button>
      )}

      {enrolling && qrCode && (
        <div style={{ border: "1px solid #ebebeb", borderRadius: 16, padding: 20, marginTop: 12 }}>
          <p style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>
            Scan this QR code with your authenticator app, then enter the 6-digit code it generates.
          </p>
          <img src={qrCode} alt="MFA QR code" style={{ width: 180, height: 180, marginBottom: 16 }} />
          <form onSubmit={confirmEnroll} style={{ display: "flex", gap: 8 }}>
            <input
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              style={{ flex: 1, padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, fontSize: 16, letterSpacing: "4px", textAlign: "center", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
            />
            <button type="submit" disabled={verifying} style={{ ...btnStyle("green"), opacity: verifying ? 0.7 : 1 }}>
              {verifying ? "Verifying…" : "Confirm"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
