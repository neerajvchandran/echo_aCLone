import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    const res = await api.get(`/people/${id}`);
    setPosts(res.data.posts || []);
    setProfileUser(res.data.user);
    setIsFollowing(res.data.isFollowing);
  };

  const createPost = async () => {
    if (!content.trim()) return;
    await api.post("/feed/create", { content });
    setContent("");
    fetchProfile();
  };

  const toggleFollow = async () => {
    await api.post(`/people/${id}/follow`);
    fetchProfile();
  };

  const deletePost = async (postId) => {
    await api.delete(`/feed/posts/${postId}`);
    fetchProfile();
  };

  const saveEdit = async (postId) => {
    await api.put(`/feed/posts/${postId}`, { content: editContent });
    setEditingId(null);
    fetchProfile();
  };

  const isOwnProfile = user && user.id === id;

  return (
    <div className="page">
      {profileUser && (
        <>
          <h2>@{profileUser.username}</h2>

          <p>
            Followers: {profileUser.followersCount} | Following:{" "}
            {profileUser.followingCount}
          </p>

          {!isOwnProfile && user && (
            <button onClick={toggleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </>
      )}

      {/* Create Post Only On Own Profile */}
      {isOwnProfile && (
        <>
          <textarea
            placeholder="Post something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={createPost}>Post</button>
        </>
      )}

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="card">
          {editingId === post.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => saveEdit(post.id)}>Save</button>
            </>
          ) : (
            <>
              <p>{post.content}</p>

              {isOwnProfile && (
                <>
                  <button
                    onClick={() => {
                      setEditingId(post.id);
                      setEditContent(post.content);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
