import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, Locale, localeCookieName, locales } from "@/i18n/config";
import { baseURL } from "@/resources";
import { normalizePath, stripLocaleFromPath, withLocale } from "@/i18n/utils";

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-locale");

  if (headerLocale && isLocale(headerLocale)) {
    return headerLocale;
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return withLocale(normalizePath(path), locale);
}

export function buildAlternates(path: string) {
  const normalized = stripLocaleFromPath(normalizePath(path));
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${baseURL}${getLocalizedPath(normalized, locale)}`]),
  );

  return {
    canonical: `${baseURL}${getLocalizedPath(normalized, defaultLocale)}`,
    languages: {
      ...languages,
      "x-default": `${baseURL}${getLocalizedPath(normalized, defaultLocale)}`,
    },
  };
}

