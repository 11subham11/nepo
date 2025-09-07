import { NextResponse } from "next/server";
import { registerUser } from "@/lib/store";

// Very simple mock: require a paymentToken equal to "PAID-1000"
export async function POST(request: Request) {
	const body = await request.json();
	const { username, name, email, paymentToken } = body ?? {};
	if (!username || !paymentToken) return NextResponse.json({ error: "missing fields" }, { status: 400 });
	if (paymentToken !== "PAID-1000") return NextResponse.json({ error: "payment required: 1000Rs" }, { status: 402 });
	try {
		const user = registerUser({ username, name, email });
		return NextResponse.json({ user }, { status: 201 });
	} catch (e: any) {
		if (e?.message === "USERNAME_TAKEN") return NextResponse.json({ error: "username taken" }, { status: 409 });
		return NextResponse.json({ error: "internal error" }, { status: 500 });
	}
}


