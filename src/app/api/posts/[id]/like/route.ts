import { NextResponse, type NextRequest } from "next/server";
import { likePost, unlikePost, DEMO_USER_ID } from "@/lib/store";

export async function POST(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
	const userId = DEMO_USER_ID;
	const { id: postId } = await context.params;
	likePost(postId, userId);
	return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
	const userId = DEMO_USER_ID;
	const { id: postId } = await context.params;
	unlikePost(postId, userId);
	return NextResponse.json({ ok: true });
}
