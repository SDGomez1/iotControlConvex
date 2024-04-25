import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {
  getUserActiveTeam,
  getUserActiveTeamInfo,
} from "./services/userDbService";

export default authMiddleware({
  publicRoutes: ["/", "/logIn", "/signUp"],
  afterAuth(auth, req, evt) {
    const currentUrl = req.url;
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (auth.userId && auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
    if (auth.userId && !auth.isPublicRoute)
      return getUserActiveTeam(auth.userId).then((teamId) => {
        if (!teamId) {
          return NextResponse.redirect(new URL("/selectTeam", req.url));
        }

        if (currentUrl.includes("/selectTeam") && teamId) {
          return NextResponse.redirect(new URL("/user", req.url));
        }

        return getUserActiveTeamInfo(auth.userId).then((teamInfo) => {
          if (!teamInfo) {
            throw new Error("No existe el equipo solicitado");
          }
          const userIsPartOfTheTeam = teamInfo.userRegistered.includes(
            auth.userId,
          );

          if (!userIsPartOfTheTeam) {
            throw new Error("No hace parte del equipo solicitado");
          }
          if (
            currentUrl.includes("/admin") &&
            teamInfo.adminId !== auth.userId
          ) {
            return NextResponse.redirect(new URL("/user", req.url));
          }

          return NextResponse.next();
        });
      });
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
