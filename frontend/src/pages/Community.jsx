import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";
const areas = ["All", "Central", "North", "South", "East", "West"];
const cats = [
  "All",
  "General",
  "Water",
  "Food",
  "Medical",
  "Emergency",
  "Education",
  "Transport",
];
export default function Community() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All");
  const [category, setCategory] = useState("All");
  const load = () =>
    api
      .get("/posts", { params: { search, area, category } })
      .then((r) => setPosts(r.data.posts))
      .catch((e) => console.error(e));
  useEffect(() => {
    load();
  }, [area, category]);
  return (
    <main className="container page">
      <section className="community-hero">
        <div>
          <span className="eyebrow">YOUR LOCAL FEED</span>
          <h1>
            Neighbors helping <span>neighbors.</span>
          </h1>
          <p>
            See what people around you need, offer a hand, and turn small acts
            of support into a stronger community.
          </p>
        </div>
        <Link className="btn primary big" to="/create">
          <Plus /> Post a Need
        </Link>
      </section>
      <section className="feed-layout">
        <div>
          <div className="filters">
            <div className="search">
              <Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load()}
                placeholder="Search needs, places, people..."
              />
              <button onClick={load}>Search</button>
            </div>
            <div className="filter-row">
              <SlidersHorizontal size={18} />
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                {areas.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {cats.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>
          {posts.length ? (
            <div className="feed">
              {posts.map((p) => (
                <PostCard key={p._id} post={p} onChange={load} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No posts yet</h3>
              <p>Be the first neighbor to ask for help.</p>
              <Link className="btn primary" to="/create">
                Create a post
              </Link>
            </div>
          )}
        </div>
        <aside className="sidebar">
          <div className="side-card">
            <span className="side-icon">
              <MapPin />
            </span>
            <h3>Local first</h3>
            <p>
              Posts are organized by neighborhood so help can reach people
              nearby.
            </p>
          </div>
          <div className="side-card green">
            <h3>How it works</h3>
            <ol>
              <li>
                <b>Post</b>
                <span>Tell your neighborhood what you need.</span>
              </li>
              <li>
                <b>Connect</b>
                <span>Neighbors offer help or message you.</span>
              </li>
              <li>
                <b>Resolve</b>
                <span>Mark the request solved when help arrives.</span>
              </li>
            </ol>
          </div>
        </aside>
      </section>
    </main>
  );
}
