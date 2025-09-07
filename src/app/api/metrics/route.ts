import { NextResponse } from "next/server";
import { DEMO_USER_ID, getMetrics } from "@/lib/store";

export async function GET() {
	const data = getMetrics(DEMO_USER_ID);
	return NextResponse.json(data);
}


