import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Email passed from Signup page
  const email = location.state?.email;

  if (!email) {
    return <p>Invalid access. Please sign up again.</p>;
  }

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      // Save token + user
      login(res.data.token, res.data.user);

      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Verify OTP</h2>
      <p className="muted">
        OTP sent to <b>{email}</b>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
