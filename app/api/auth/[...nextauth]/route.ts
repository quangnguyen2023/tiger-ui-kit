import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // if user tries to access /admin, keep callback url
      if (url.startsWith(baseUrl)) return url;

      // otherwise redirect to /widget-customizer
      return `${baseUrl}/widget-customizer/my-widgets`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
