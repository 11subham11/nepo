"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

type Post = {
  id: string;
  content: string | null;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name?: string | null;
    image?: string | null;
  };
  media: { id: string; url: string; type: "IMAGE" | "VIDEO" }[];
  likes: { id: string; userId: string }[];
};

export default function HomePage() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<{
    postsCount: number;
    likesReceived: number;
    commentsReceived: number;
    followersCount: number;
    followingCount: number;
    engagements: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.items);
  }

  async function loadMetrics() {
    const res = await fetch("/api/metrics");
    if (res.ok) setMetrics(await res.json());
  }

  useEffect(() => {
    loadPosts();
    loadMetrics();
  }, []);

  async function handleUpload(): Promise<string | null> {
    if (!file) return null;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  }

  async function handlePost() {
    setLoading(true);
    try {
      const url = await handleUpload();
      const media = url
        ? [{ url, type: file?.type.startsWith("video") ? "VIDEO" : "IMAGE" }]
        : [];
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content || null, media }),
      });
      if (res.ok) {
        setContent("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        await loadPosts();
      }
    } finally {
      setLoading(false);
    }
  }

  async function toggleLike(postId: string, hasLiked: boolean) {
    await fetch(`/api/posts/${postId}/like`, {
      method: hasLiked ? "DELETE" : "POST",
    });
    await loadPosts();
  }

  return (
    <div className="space-y-6 md:space-y-0 md:flex md:gap-6">
      <aside className="hidden md:block w-72 shrink-0 space-y-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="font-semibold mb-2">Your metrics</div>
          {metrics ? (
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Money spents</span>
                <span className="font-medium">{metrics.postsCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Moneny flaunt</span>
                <span className="font-medium">{metrics.likesReceived}</span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-zinc-500">Loading…</div>
          )}
        </div>
      </aside>

      <section className="flex-1 min-w-0 space-y-6">
        <div className="bg-white border rounded-lg p-4">
          <textarea
            className="w-full resize-none outline-none"
            rows={3}
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Add media"
                className="inline-flex items-center gap-2 rounded-full p-2 hover:bg-zinc-100 border"
              >
                <ImageIcon className="h-5 w-5" />
                <span className="sr-only">Add image or video</span>
              </button>
            </div>
            <button
              onClick={handlePost}
              disabled={loading}
              className="px-4 py-2 bg-zinc-900 text-white rounded disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((p) => {
            const hasLiked = false; // simplified; requires session
            return (
              <div key={p.id} className="bg-white border rounded-lg p-4">
                <div className="text-sm text-zinc-500">
                  @{p.author.username}
                </div>
                {p.content && (
                  <div className="mt-2 whitespace-pre-wrap">{p.content}</div>
                )}
                {p.media?.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {p.media.map((m) => (
                      <img
                        key={m.id}
                        src={m.url}
                        alt="media"
                        className="rounded"
                      />
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600">
                  <button
                    onClick={() => toggleLike(p.id, hasLiked)}
                    className="hover:text-zinc-900"
                  >
                    Like ({p.likes.length})
                  </button>
                  <a href={`/post/${p.id}`} className="hover:text-zinc-900">
                    Comments
                  </a>
                  <button className="hover:text-zinc-900">Share</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
