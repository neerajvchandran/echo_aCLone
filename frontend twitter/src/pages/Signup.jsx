import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await api.post("/auth/signup", {
        email,
        password,
        username,
      });

      // Move to OTP verification page
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError(
        err.response?.data?.error || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      {error && <p className="error-text">{error}</p>}

      <form className="signup-form" onSubmit={submit}>
        <input
          type="email"
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          className="signup-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button className="signup-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
