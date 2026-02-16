import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");

    if (confirmText !== "DELETE") {
      setError('You must type "DELETE" to confirm.');
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/delete-account", {
        password,
        confirmText,
      });

      // Clear auth + redirect
      logout();
      navigate("/signup");
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 style={{ color: "red" }}>Delete Account</h2>

      <p className="muted">
        This action is <b>permanent</b>. Your account will be deleted.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleDelete}>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder='Type "DELETE" to confirm'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          required
        />

        <button disabled={loading} style={{ background: "red" }}>
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </form>
    </div>
  );
}
