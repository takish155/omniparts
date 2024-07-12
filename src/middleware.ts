import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/app/api/auth/auth";
import { checkIsProductPage } from "./utils/middleware/checkIsProductPage";
import { checkIsVerificationPage } from "./utils/middleware/checkIsVerificationPage";

const defaultLocale = "ja";
const localePrefix = "always";
const locales = ["en", "ja"];

const publicPages = [
  "/",
  "/product/:path*",
  "/discover",
  "/account/signin",
  "/account/signup",
  "/account/forgot-password",
  "/account/forgot-password/*",
];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

const authMiddleware = auth((req) => {
  const session = req.auth;
  if (!session) {
    return NextResponse.redirect(new URL("/account/signin", req.url));
  }
  if (session) {
    return intlMiddleware(req);
  }
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const pathname = req.nextUrl.pathname;
  const isPublicPage = publicPathnameRegex.test(pathname);

  if (
    isPublicPage ||
    checkIsProductPage(pathname) ||
    checkIsVerificationPage(pathname)
  ) {
    return intlMiddleware(req);
  }

  return (authMiddleware as any)(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
