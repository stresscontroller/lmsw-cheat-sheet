import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

import { checkUserPurchaseStatus } from '@/lib/checkPurchaseStatus'

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.firstName + " " + user.lastName,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          username: profile.name,
        };
      },
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID ?? "",
      clientSecret: process.env.APPLE_CLIENT_SECRET ?? "",
      async profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          username: profile.name,
        };
      },
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          throw new Error("No user found with this email");
        }
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/login`) {
        return `${baseUrl}/my-learning`;
      }
      return url;
    },

    async jwt({ token, user, trigger }: { token: JWT; user: any; trigger?: "signIn" | "update" | "signUp"; }) {
      if (trigger === "signIn") {
        token.id = user.id;
        token.name = user.username;
        const hasPurchased = await checkUserPurchaseStatus(user.email);
        token.hasPurchased = hasPurchased;
      } else if (trigger === "update") {
        token.id = token.id;
        token.name = token.name;
        const hasPurchased = await checkUserPurchaseStatus(token.email ?? "");
        token.hasPurchased = hasPurchased;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.hasPurchased = token.hasPurchased ?? false;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
