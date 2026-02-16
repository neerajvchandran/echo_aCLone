import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Feed() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    const res = await api.get("/feed");
    setPosts(res.data.posts);
  };

  const createPost = async () => {
    if (!content.trim()) return;
    await api.post("/feed/create", { content });
    setContent("");
    fetchFeed();
  };

  const toggleLike = async (postId) => {
    await api.post(`/feed/${postId}/like`);
    fetchFeed();
  };

  const deletePost = async (postId) => {
    await api.delete(`/feed/posts/${postId}`);
    fetchFeed();
  };

  const saveEdit = async (postId) => {
    await api.put(`/feed/posts/${postId}`, { content: editContent });
    setEditingId(null);
    fetchFeed();
  };

  return (
    <div className="page">
      <h2>Feed</h2>

      {/* Create post */}
      {user && (
        <>
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={createPost}>Post</button>
        </>
      )}

      {/* Posts */}
      {posts.map((post) => {
        const isOwner = user && post.author.id === user.id;
        const hasLiked = user && post.likes.includes(user.id);

        return (
          <div key={post.id} className="card">
            <b>@{post.author.username}</b>

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
              </>
            )}

            {/* Like Button */}
            {user && (
              <button onClick={() => toggleLike(post.id)}>
                {hasLiked ? "Unlike" : "Like"} ({post.likes.length})
              </button>
            )}

            {/* Owner Controls */}
            {isOwner && editingId !== post.id && (
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
          </div>
        );
      })}
    </div>
  );
}
