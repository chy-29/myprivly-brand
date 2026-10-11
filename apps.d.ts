export type Locale = "en" | "es";

export interface App {
  /** Short stable id, also the subdomain: `<id>.myprivly.com`. */
  id: string;
  /** The name shown in the app switcher and on the hub. */
  name: string;
  url: string;
  tagline: Record<Locale, string>;
}

export const ROOT_DOMAIN: string;
export const COOKIE_DOMAIN: string;
export const HUB_URL: string;
export const APPS: App[];
export function appById(id: string): App | undefined;