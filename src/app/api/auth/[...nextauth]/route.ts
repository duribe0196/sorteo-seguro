import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, findUser } from "@/lib/actions/users";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      role: string;
      referrals: Array<any>;
      image: string;
      freeTickets: number;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && session.user.email) {
        const userFromDB: any = await findUser(session.user.email);
        session.user = { ...session.user, ...userFromDB };
      } else {
        session.user.role = "user";
      }
      return session;
    },
    async signIn({ user, profile }) {
      if (user) {
        const userFound = await findUser(user.email || "");
        if (!userFound) {
          await createUser(user);
        }
      }
      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
