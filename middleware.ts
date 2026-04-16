import { NextRequest, NextResponse } from "next/server";
import { isLocale, localeCookieName } from "@/i18n/config";
import { getLocaleFromPath, getPreferredLocale, withLocale } from "@/i18n/utils";

const publicFile = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/trademarks") ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPath(pathname);

  if (!pathnameLocale) {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : getPreferredLocale(request.headers.get("accept-language"));

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = withLocale(pathname, preferredLocale);
    redirectUrl.search = search;

    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set(localeCookieName, preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", pathnameLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.cookies.get(localeCookieName)?.value !== pathnameLocale) {
    response.cookies.set(localeCookieName, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};





