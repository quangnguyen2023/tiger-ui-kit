import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiSignIn } from '@/api/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await apiSignIn(credentials);

        if (res.success) {
          return res.data;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      // if user tries to access a url, keep callback url
      if (url.startsWith(baseUrl)) return url;

      // otherwise redirect to /widget-customizer
      return `${baseUrl}/widget-customizer/my-widgets`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
