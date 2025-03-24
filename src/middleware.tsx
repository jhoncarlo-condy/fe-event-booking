import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    const url = req.nextUrl.clone();

    if (token) {
        if (role === "admin" && pathname !== "/admin/dashboard") {
            url.pathname = "/admin/dashboard";
            return NextResponse.redirect(url);
        }
        if (role === "user" && pathname !== "/user/dashboard") {
            url.pathname = "/user/dashboard";
            return NextResponse.redirect(url);
        }
    }

    if (pathname === "/") {
        return NextResponse.next();
    }

    if (pathname === "/login" && !token) {
        return NextResponse.next();
    }

    if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/admin/:path*", "/user/:path*"],
};
