export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface OAuthProfile {
  provider: string; // 'google', 'twitter', ...
  providerAccountId: string; // id từ provider
  email: string;
  name?: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  scope?: string;
  expiresAt: Date | number | null;
}
