import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/api/settings",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/webhook/bcon",
    "/api/uploadthing",
    "/",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/webhook/bcon",
    "/api/uploadthing",
  ],
  afterAuth(auth, req, evt) {
    // Redirect non-admin users trying to access restricted routes
    const restrictedForNonAdmins = [
      "/robots",
      "/accounts",
      "/connections",
      "/trade",
      // "/settings",
      "/credits",
    ];
    if (
      restrictedForNonAdmins.includes(req.nextUrl.pathname) &&
      auth?.sessionClaims?.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    if (
      auth.userId &&
      (req.nextUrl.pathname === "/sign-in" ||
        req.nextUrl.pathname === "/sign-up" ||
        req.nextUrl.pathname === "/")
    ) {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard);
    }
    return NextResponse.next();
  },
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
