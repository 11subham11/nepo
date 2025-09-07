"use client";
import { useEffect, useState } from "react";

export default function PostDetails({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<any>(null);
	const [comments, setComments] = useState<any[]>([]);
	const [text, setText] = useState("");

	async function load() {
		const [postRes, commentsRes] = await Promise.all([
			fetch(`/api/posts?cursor=${encodeURIComponent(params.id)}&take=1`).then((r) => r.json()),
			fetch(`/api/posts/${params.id}/comments`).then((r) => r.json()),
		]);
		setPost(postRes.items?.[0] ?? null);
		setComments(commentsRes);
	}

	useEffect(() => { load(); }, [params.id]);

	async function submit() {
		if (!text.trim()) return;
		await fetch(`/api/posts/${params.id}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: text }) });
		setText("");
		await load();
	}

	if (!post) return <div className="text-sm text-zinc-500">Loading…</div>;

	return (
		<div className="space-y-6">
			<div className="bg-white border rounded-lg p-4">
				<div className="text-sm text-zinc-500">@{post.author.username}</div>
				{post.content && <div className="mt-2 whitespace-pre-wrap">{post.content}</div>}
			</div>
			<div className="bg-white border rounded-lg p-4">
				<div className="font-medium">Comments</div>
				<div className="mt-3 flex gap-2">
					<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment" className="flex-1 border rounded px-3 py-2" />
					<button onClick={submit} className="px-3 py-2 rounded bg-zinc-900 text-white">Reply</button>
				</div>
				<div className="mt-4 space-y-3">
					{comments.map((c) => (
						<div key={c.id} className="border rounded p-3">
							<div className="text-sm text-zinc-500">@{c.author.username}</div>
							<div className="mt-1">{c.content}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
