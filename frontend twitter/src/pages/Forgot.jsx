import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ If logged in → auto-fill email & skip step 1
  useEffect(() => {
    const autoSendOtp = async () => {
      if (user?.email && step === 1) {
        try {
          setEmail(user.email);
          setLoading(true);

          await api.post("/auth/forgot", {
            emailOrUsername: user.email,
          });

          setMessage("OTP sent to your email.");
          setStep(2);
        } catch (err) {
          setMessage(err.response?.data?.error || "Failed to send OTP");
        } finally {
          setLoading(false);
        }
      }
    };

    autoSendOtp();
  }, [user]);

  // Step 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/forgot", { emailOrUsername: email });
      setMessage("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/forgot/verify-otp", { email, otp });
      setMessage("OTP verified. You can now reset password.");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setMessage("Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{user ? "Reset Password" : "Forgot Password"}</h2>

      {message && <p>{message}</p>}

      {/* Step 1: Email (only if logged out) */}
      {step === 1 && !user && (
        <form onSubmit={sendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={resetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
