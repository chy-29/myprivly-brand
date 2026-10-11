export const THEME_COOKIE: string;
export const FONT_COOKIE: string;
export function readPref(cookieString: string, name: string): string | null;
export function prefCookie(name: string, value: string | null, hostname?: string): string;
export function themeInitScript(fonts?: string[]): string;