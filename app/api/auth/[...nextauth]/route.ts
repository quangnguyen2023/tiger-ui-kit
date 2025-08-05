import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiHanldeOAuth, apiSignIn } from '@/api/auth';

const authOptions: NextAuthOptions = {
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
      if (url === baseUrl) return baseUrl;

      // otherwise redirect to /widget-customizer
      return `${baseUrl}/widget-customizer/my-widgets`;
    },

    async jwt({ token, user, account }) {
      if (user && account && account.type === 'oauth') {
        await apiHanldeOAuth({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          email: user.email ?? '',
          name: user.name ?? '',
          avatar: user.image ?? '',
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          tokenType: account.token_type,
          scope: account.scope,
          expiresAt: account.expires_at ?? null,
        });
      }

      if (user) token.user = user;
      if (account?.type === 'oauth') {
        token.accessToken = account?.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user =
        'user' in (token.user as any) ? (token.user as any)?.user : token.user;
      session.accessToken =
        'accessToken' in (token.user as any)
          ? (token.user as any)?.accessToken
          : (token.accessToken as string);
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
