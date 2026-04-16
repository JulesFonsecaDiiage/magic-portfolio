import { defaultLocale, isLocale, Locale } from "@/i18n/config";

const trailingSlashRegex = /\/$/;

export function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  if (path === "/") {
    return "/";
  }

  return path.replace(trailingSlashRegex, "");
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocaleFromPath(pathname: string): string {
  const normalized = normalizePath(pathname);
  const locale = getLocaleFromPath(normalized);

  if (!locale) {
    return normalized;
  }

  const withoutLocale = normalized.slice(locale.length + 1);
  return withoutLocale ? withoutLocale : "/";
}

export function withLocale(pathname: string, locale: Locale): string {
  const basePath = stripLocaleFromPath(pathname);
  if (basePath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${basePath}`;
}

export function toLocalePath(pathname: string, locale: Locale): string {
  return withLocale(pathname, locale);
}

export function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  const lowered = acceptLanguageHeader.toLowerCase();
  if (lowered.includes("fr")) {
    return "fr";
  }

  if (lowered.includes("en")) {
    return "en";
  }

  return defaultLocale;
}

