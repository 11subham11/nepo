export type MediaType = "IMAGE" | "VIDEO";

export type User = {
	id: string;
	username: string;
	name?: string | null;
	image?: string | null;
};

export type PostMedia = {
	id: string;
	postId: string;
	type: MediaType;
	url: string;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
};

export type Post = {
	id: string;
	authorId: string;
	content: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Like = { postId: string; userId: string; id: string; createdAt: Date };

export type Comment = {
	id: string;
	postId: string;
	authorId: string;
	content: string;
	parentId?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Follow = {
	id: string;
	followerId: string;
	followingId: string;
	status: "PENDING" | "ACCEPTED" | "DECLINED";
	createdAt: Date;
	updatedAt: Date;
};

export const DEMO_USER: User = {
	id: "u1",
	username: "demo",
	name: "Demo User",
	image: null,
};

function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return Math.random().toString(36).slice(2);
}

const users: User[] = [DEMO_USER];
// Additional demo users
users.push(
	{ id: "u2", username: "richkid", name: "Ava Carter", image: null },
	{ id: "u3", username: "baller", name: "Liam Brooks", image: null },
	{ id: "u4", username: "ceo_vibes", name: "Noah Patel", image: null },
	{ id: "u5", username: "luxelife", name: "Maya Chen", image: null },
);
const posts: Post[] = [];
const media: PostMedia[] = [];
const likes: Like[] = [];
const comments: Comment[] = [];
const follows: Follow[] = [];

export function createPost(args: { authorId: string; content: string | null; media?: Omit<PostMedia, "id" | "postId">[] }) {
	const post: Post = { id: uid(), authorId: args.authorId, content: args.content ?? null, createdAt: new Date(), updatedAt: new Date() };
	posts.unshift(post);
	for (const m of args.media ?? []) {
		media.push({ id: uid(), postId: post.id, type: m.type, url: m.url, width: m.width ?? null, height: m.height ?? null, duration: m.duration ?? null });
	}
	return getPostById(post.id)!;
}

// Seed initial money-flex text posts
(() => {
	const seed: Array<{ authorId: string; content: string }> = [];
	for (const s of seed) {
		const p: Post = { id: uid(), authorId: s.authorId, content: s.content, createdAt: new Date(Date.now() - Math.random() * 86400000), updatedAt: new Date() };
		posts.push(p);
	}
	// Sort newest first as our listPosts expects reverse-chron by default
	posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
})();

export function getPostById(id: string): (Post & { author: User; media: PostMedia[]; likes: Like[] }) | null {
	const p = posts.find((x) => x.id === id);
	if (!p) return null;
	const author = users.find((u) => u.id === p.authorId)!;
	const postMedia = media.filter((m) => m.postId === p.id);
	const postLikes = likes.filter((l) => l.postId === p.id);
	return { ...p, author, media: postMedia, likes: postLikes };
}

export function listPosts(args: { take: number; cursor?: string; mode: "chrono" | "algo" }) {
	let all = posts.slice();
	if (args.mode === "algo") {
		all.sort((a, b) => {
			const la = likes.filter((l) => l.postId === a.id).length;
			const lb = likes.filter((l) => l.postId === b.id).length;
			if (lb !== la) return lb - la;
			return b.createdAt.getTime() - a.createdAt.getTime();
		});
	} else {
		all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}
	if (args.cursor) {
		const idx = all.findIndex((p) => p.id === args.cursor);
		if (idx >= 0) all = all.slice(idx + 1);
	}
	const items = all.slice(0, args.take).map((p) => getPostById(p.id)!);
	const nextCursor = all.length > args.take ? all[args.take].id : undefined;
	return { items, nextCursor };
}

export function likePost(postId: string, userId: string) {
	const exists = likes.find((l) => l.postId === postId && l.userId === userId);
	if (!exists) likes.push({ id: uid(), postId, userId, createdAt: new Date() });
}

export function unlikePost(postId: string, userId: string) {
	const idx = likes.findIndex((l) => l.postId === postId && l.userId === userId);
	if (idx >= 0) likes.splice(idx, 1);
}

export function listComments(postId: string) {
	const roots = comments.filter((c) => c.postId === postId && !c.parentId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
	return roots.map((c) => ({
		...c,
		author: users.find((u) => u.id === c.authorId)!,
		children: comments.filter((cc) => cc.parentId === c.id).map((cc) => ({ ...cc, author: users.find((u) => u.id === cc.authorId)! })),
	}));
}

export function addComment(args: { postId: string; authorId: string; content: string; parentId?: string | null }) {
	const c: Comment = { id: uid(), postId: args.postId, authorId: args.authorId, content: args.content, parentId: args.parentId ?? null, createdAt: new Date(), updatedAt: new Date() };
	comments.push(c);
	const author = users.find((u) => u.id === c.authorId)!;
	return { ...c, author, children: [] };
}

export function createFollowRequest(followerId: string, followingId: string) {
	let f = follows.find((x) => x.followerId === followerId && x.followingId === followingId);
	if (f) {
		f.status = "PENDING";
		f.updatedAt = new Date();
		return f;
	}
	f = { id: uid(), followerId, followingId, status: "PENDING", createdAt: new Date(), updatedAt: new Date() };
	follows.push(f);
	return f;
}

export function listFollowRequests(forUserId: string) {
	return follows.filter((f) => f.followingId === forUserId && f.status === "PENDING").map((f) => ({ ...f, follower: users.find((u) => u.id === f.followerId)! }));
}

export function handleFollowAction(id: string, userId: string, action: "ACCEPT" | "DECLINE" | "CANCEL") {
	const f = follows.find((x) => x.id === id);
	if (!f) return null;
	if (action === "CANCEL") {
		if (f.followerId !== userId) return "FORBIDDEN" as const;
		const idx = follows.findIndex((x) => x.id === id);
		follows.splice(idx, 1);
		return { ok: true };
	}
	if (f.followingId !== userId) return "FORBIDDEN" as const;
	f.status = action === "ACCEPT" ? "ACCEPTED" : "DECLINED";
	f.updatedAt = new Date();
	return f;
}

export const DEMO_USER_ID = DEMO_USER.id;


export type Metrics = {
	postsCount: number;
	likesReceived: number;
	commentsReceived: number;
	followersCount: number;
	followingCount: number;
	engagements: number;
};

export function getMetrics(userId: string): Metrics {
	const userPosts = posts.filter((p) => p.authorId === userId);
	const postsCount = userPosts.length;
	const likesReceived = likes.filter((l) => userPosts.some((p) => p.id === l.postId)).length;
	const commentsReceived = comments.filter((c) => userPosts.some((p) => p.id === c.postId)).length;
	const followersCount = follows.filter((f) => f.followingId === userId && f.status === "ACCEPTED").length;
	const followingCount = follows.filter((f) => f.followerId === userId && f.status === "ACCEPTED").length;
	const engagements = likesReceived + commentsReceived;
	return { postsCount, likesReceived, commentsReceived, followersCount, followingCount, engagements };
}

// Registration helpers (in-memory)
export function isUsernameTaken(username: string) {
    return users.some((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function registerUser(args: { username: string; name?: string | null; email?: string | null }) {
    if (isUsernameTaken(args.username)) {
        throw new Error("USERNAME_TAKEN");
    }
    const newUser: User = {
        id: uid(),
        username: args.username,
        name: args.name ?? null,
        image: null,
    };
    users.push(newUser);
    return newUser;
}

