import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/drive",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log("ACCESS TOKEN:", account.access_token);
        console.log("REFRESH TOKEN:", account.refresh_token);

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
