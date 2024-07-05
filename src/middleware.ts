import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";

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
  // private routes here
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
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  const reqUrl = req.nextUrl.pathname.split("/");
  reqUrl.shift();

  if (reqUrl.length === 3 && reqUrl[1] === "product") {
    return intlMiddleware(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
