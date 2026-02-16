import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function People() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const res = await api.get("/people");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
      setError("Failed to load people");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading people...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>People</h2>

      {users.length === 0 && <p>No users found</p>}

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{user.username}</h3>

          {/* remove email later if you want */}
          <p style={{ color: "#666" }}>{user.email}</p>

          <p>
            Followers: {user.followersCount} | Following: {user.followingCount}
          </p>

          <Link to={`/profile/${user.id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  );
}
