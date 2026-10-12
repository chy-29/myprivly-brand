export function isSuiteHost(hostname?: string): boolean;
export function sharedCookieOptions(hostname?: string): {
  domain?: string;
  path?: string;
  sameSite?: "lax";
  secure?: boolean;
};
