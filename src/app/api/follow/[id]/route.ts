import { NextResponse, type NextRequest } from "next/server";
import { handleFollowAction, DEMO_USER_ID } from "@/lib/store";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
	const userId = DEMO_USER_ID;
	const { action } = await request.json();
	if (!action) return NextResponse.json({ error: "action required" }, { status: 400 });
	if (!["ACCEPT", "DECLINE", "CANCEL"].includes(action))
		return NextResponse.json({ error: "invalid action" }, { status: 400 });

	const { id } = await context.params;
	const result = handleFollowAction(id, userId, action as any);
	if (result === null) return NextResponse.json({ error: "not found" }, { status: 404 });
	if (result === "FORBIDDEN") return NextResponse.json({ error: "forbidden" }, { status: 403 });
	return NextResponse.json(result);
}
