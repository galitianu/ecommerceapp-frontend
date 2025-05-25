import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER;
    const tokenEndpoint = `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const formData = new URLSearchParams();
    formData.append("grant_type", "refresh_token");
    formData.append("client_id", process.env.KEYCLOAK_CLIENT_ID as string);
    formData.append("refresh_token", token.refreshToken as string);

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: `${process.env.KEYCLOAK_ISSUER}/authorize?response_type=code&prompt=login`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account) {
        const initialToken = {
          accessToken: account.access_token as string,
          refreshToken: account.refresh_token as string,
          accessTokenExpires: new Date(account!.expires_at! * 1000) as Date,
        };
        return initialToken;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      try {
        return refreshAccessToken(token);
      } catch (error) {
        console.error(error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.error === "RefreshAccessTokenError") {
        refreshAccessToken(token);
      }
      if (token) {
        session.user = token.user as any;
        session.accessToken = token.accessToken;
        session.expires = token.accessTokenExpires;
        session.error = token.error;
      }
      return session;
    },
  },
};
