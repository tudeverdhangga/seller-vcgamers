import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env.mjs";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("AuthVcgToken")?.value || "";
  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const res = await fetch(url + "/get-profile", {
    headers: { Authorization: token },
  });

  if (res.status === 401 && process.env.NODE_ENV !== "development") {
    return NextResponse.redirect(env.NEXT_PUBLIC_AUTH_URL);
  }
}
