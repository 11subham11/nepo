import { NextResponse } from "next/server";
import { listFollowRequests, createFollowRequest, DEMO_USER_ID } from "@/lib/store";

export async function GET() {
	const userId = DEMO_USER_ID;
	return NextResponse.json(listFollowRequests(userId));
}

export async function POST(request: Request) {
	const userId = DEMO_USER_ID;
	const { targetUserId } = await request.json();
	if (!targetUserId) return NextResponse.json({ error: "targetUserId required" }, { status: 400 });
	if (targetUserId === userId)
		return NextResponse.json({ error: "cannot follow yourself" }, { status: 400 });
	const req = createFollowRequest(userId, targetUserId);
	return NextResponse.json(req, { status: 201 });
}
