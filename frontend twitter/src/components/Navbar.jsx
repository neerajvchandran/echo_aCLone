import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log("Logout backend failed");
    }

    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">People</Link>
      {" | "}

      {user && (
        <>
          <Link to="/feed">Feed</Link>
          {" | "}
          <Link to={`/profile/${user.id}`}>My Profile</Link>
          {" | "}
        </>
      )}

      {user ? (
        <>
          <Link to="/forgot">Reset Password</Link>
          {" | "}
          <span>@{user.username}</span>{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/signup">Signup</Link>
          {" | "}
          <Link to="/forgot">Forgot Password</Link>
        </>
      )}
    </nav>
  );
}
