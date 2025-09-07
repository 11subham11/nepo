"use client";
import { useEffect, useState } from "react";

type Request = { id: string; follower: { id: string; username: string; name?: string | null } };

export default function ProfilePage() {
	const [requests, setRequests] = useState<Request[]>([]);

	async function loadRequests() {
		const res = await fetch("/api/follow");
		if (res.ok) setRequests(await res.json());
	}

	useEffect(() => { loadRequests(); }, []);

	async function act(id: string, action: "ACCEPT" | "DECLINE") {
		await fetch(`/api/follow/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
		await loadRequests();
	}

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Follow Requests</h1>
			<div className="space-y-3">
				{requests.length === 0 && <div className="text-sm text-zinc-500">No pending requests</div>}
				{requests.map((r) => (
					<div key={r.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
						<div>
							<div className="font-medium">@{r.follower.username}</div>
							<div className="text-sm text-zinc-500">{r.follower.name}</div>
						</div>
						<div className="flex items-center gap-2">
							<button onClick={() => act(r.id, "ACCEPT")} className="px-3 py-1 rounded bg-zinc-900 text-white">Accept</button>
							<button onClick={() => act(r.id, "DECLINE")} className="px-3 py-1 rounded border">Decline</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
