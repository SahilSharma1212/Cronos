import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isMainRoute = path.startsWith("/main/profile");
  const isSignInPage = path === "/sign-in";


  // 🔒 Block access to /main/* if not signed in
  if (isMainRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 🚫 Block access to /sign-in if already signed in
  if (isSignInPage && token) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to both protected routes and sign-in page
export const config = {
  matcher: ["/main/:path*"],
};
