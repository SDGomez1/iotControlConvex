import { authMiddleware } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import { query } from "../convex/_generated/server";
import { internal } from "../convex/_generated/api";
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (auth.userId && req.nextUrl.pathname !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
