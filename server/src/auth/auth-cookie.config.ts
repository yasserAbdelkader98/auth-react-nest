import { CookieOptions } from 'express';

export const AUTH_COOKIE_NAME = 'access_token';
export const AUTH_COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function createAuthCookieOptions(isProduction: boolean): CookieOptions {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  };
}
