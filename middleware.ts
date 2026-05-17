// bloco delle pagine. reindirizzo a "/" se qualcuno prova
// ad accedere a "/about/:path*", "/tours/:path*"

import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about/:path*", "/tours/:path*"],
};
