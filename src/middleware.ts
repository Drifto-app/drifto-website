import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if ((pathname === "/event" || pathname.startsWith("/event/")) && !pathname.startsWith("/m/event")) {
        return NextResponse.redirect(new URL(`/m${pathname}`, request.url));
    }

    if ((pathname === "/user" || pathname.startsWith("/user/")) && !pathname.startsWith("/m/user")) {
        return NextResponse.redirect(new URL(`/m${pathname}`, request.url));
    }

    return NextResponse.next();
}