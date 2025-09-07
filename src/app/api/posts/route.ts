import { NextResponse } from "next/server";
import { createPost, listPosts, DEMO_USER_ID } from "@/lib/store";


export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const take = Number(searchParams.get("take") ?? 20);
	const cursor = searchParams.get("cursor") || undefined;
	const mode = (searchParams.get("mode") as "chrono" | "algo") || "chrono";
	const { items, nextCursor } = listPosts({ take, cursor, mode });
	return NextResponse.json({ items, nextCursor });
}

export async function POST(request: Request) {
	const userId = DEMO_USER_ID;
	const body = await request.json();
	const { content, media } = body ?? {};
	if (!content && (!media || media.length === 0)) {
		return NextResponse.json({ error: "content or media required" }, { status: 400 });
	}
	const created = createPost({
		authorId: userId,
		content: content ?? null,
		media: Array.isArray(media)
			? media.map((m: any) => ({ url: m.url, type: m.type, width: m.width ?? null, height: m.height ?? null, duration: m.duration ?? null }))
			: [],
	});
	return NextResponse.json(created, { status: 201 });
}
