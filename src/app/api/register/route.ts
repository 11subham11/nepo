import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { username, name, email, password } = body ?? {};
		if (!username || !password) {
			return NextResponse.json({ error: "username and password required" }, { status: 400 });
		}
		const existing = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
		if (existing) {
			return NextResponse.json({ error: "user already exists" }, { status: 409 });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { username, name, email, hashedPassword },
			select: { id: true, username: true, name: true, email: true },
		});
		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "internal error" }, { status: 500 });
	}
}


