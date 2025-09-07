import { NextResponse, type NextRequest } from "next/server";
import { listComments, addComment, DEMO_USER_ID } from "@/lib/store";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params;
	const comments = listComments(id);
	return NextResponse.json(comments);
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
	const userId = DEMO_USER_ID;
	const body = await request.json();
	const { content, parentId } = body ?? {};
	if (!content) return NextResponse.json({ error: "content required" }, { status: 400 });
	const { id } = await context.params;
	const created = addComment({ postId: id, authorId: userId, content, parentId: parentId ?? null });
	return NextResponse.json(created, { status: 201 });
}
