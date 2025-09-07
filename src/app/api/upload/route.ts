import { NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
	const form = await request.formData();
	const file = form.get("file");
	if (!(file instanceof File)) return NextResponse.json({ error: "file missing" }, { status: 400 });
	const ext = path.extname(file.name) || "";
	const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
	const uploadDir = path.join(process.cwd(), "public", "uploads");
	try {
		await stat(uploadDir);
	} catch {
		await mkdir(uploadDir, { recursive: true });
	}
	const filepath = path.join(uploadDir, filename);
	const buffer = Buffer.from(await file.arrayBuffer());
	await new Promise<void>((resolve, reject) => {
		const stream = createWriteStream(filepath);
		stream.on("finish", () => resolve());
		stream.on("error", reject);
		stream.end(buffer);
	});
	const url = `/uploads/${filename}`;
	return NextResponse.json({ url });
}


