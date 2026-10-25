import { useEffect, useState } from "react";
import { ShieldCheck, Trash2 } from "lucide-react";
import api from "../services/api";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const load = () =>
    api
      .get("/admin/posts")
      .then((r) => setPosts(r.data.posts))
      .catch((e) =>
        setError(
          e.response?.data?.message || "Could not load moderation queue",
        ),
      );
  useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/admin/posts/${id}`);
    load();
  };
  return (
    <main className="container page">
      <section className="section-title">
        <div>
          <span className="eyebrow">MODERATION</span>
          <h1>Admin control</h1>
          <p>Review and remove posts that violate community rules.</p>
        </div>
        <ShieldCheck size={36} />
      </section>
      {error && <div className="alert">{error}</div>}
      <section className="list-card">
        {posts.length ? (
          posts.map((post) => (
            <article className="conversation" key={post._id}>
              <div className="grow">
                <b>{post.title}</b>
                <small>
                  {post.user?.name} · {post.user?.email} · {post.area}
                </small>
                <span>{post.description}</span>
              </div>
              <button
                className="comment"
                onClick={() => remove(post._id)}
                title="Delete post"
              >
                <Trash2 /> Delete
              </button>
            </article>
          ))
        ) : (
          <p className="muted">No posts to review.</p>
        )}
      </section>
    </main>
  );
}
