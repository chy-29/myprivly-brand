// The apps that live under myprivly.com. The hub's cards, each app's app switcher and the
// cookie settings all read from here, so adding an app means adding one entry.

export const ROOT_DOMAIN = "myprivly.com";
/** Cookies set on this domain are shared by every subdomain (sign-in session, theme, font). */
export const COOKIE_DOMAIN = ".myprivly.com";
export const HUB_URL = "https://myprivly.com";

/** @type {import("./apps").App[]} */
export const APPS = [
  {
    id: "family",
    name: "Family",
    url: "https://family.myprivly.com",
    tagline: {
      en: "One shared calendar for the whole family.",
      es: "Un calendario compartido para toda la familia.",
    },
  },
  {
    id: "money",
    name: "Money",
    url: "https://money.myprivly.com",
    tagline: {
      en: "Budgets, accounts and bills, encrypted on your device.",
      es: "Presupuestos, cuentas y facturas, cifrados en tu dispositivo.",
    },
  },
];

/** @param {string} id */
export function appById(id) {
  return APPS.find((a) => a.id === id);
}