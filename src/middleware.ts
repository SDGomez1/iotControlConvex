import { authMiddleware } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (auth.userId && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/adminDashboard", req.url));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
