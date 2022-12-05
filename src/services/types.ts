export type ErrorResponseType = {message: string; errno: number};

export type AuthTokenType = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type LoginResponseType = AuthTokenType & {
  errno: number;
};
