import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/services") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  // If no redirect is needed, you can return a 404 or pass through
  return new NextResponse("Not Found", { status: 404 });
}
