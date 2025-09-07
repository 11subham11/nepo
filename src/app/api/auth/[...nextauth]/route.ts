import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) return null;
				const user = await prisma.user.findUnique({ where: { username: credentials.username } });
				if (!user || !user.hashedPassword) return null;
				const ok = await bcrypt.compare(credentials.password, user.hashedPassword);
				if (!ok) return null;
				return { id: user.id, name: user.name ?? user.username, email: user.email ?? undefined, image: user.image ?? undefined } as any;
			},
		}),
	],
	session: { strategy: "database" as const },
	pages: {},
	callbacks: {
		async session({ session, user, token }: any) {
			if (user?.id) (session as any).user.id = user.id;
			if ((token as any)?.sub) (session as any).user.id = (token as any).sub;
			return session;
		},
	},
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };


