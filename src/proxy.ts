import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID = ["UZ", "RU", "EN"];

export default function proxy(request: NextRequest) {
  const cookie = request.cookies.get("uychi-lang")?.value || "";
  const lang = VALID.includes(cookie) ? cookie : "UZ";
  const response = NextResponse.next();
  response.headers.set("x-lang", lang);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
