import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'
import { TOKEN_KEY } from "./utils/constants";

export function middleware(request) {
    const authToken = request.cookies.get(TOKEN_KEY)?.value;
    const publicPaths = ['/home','/login', '/register', '/reset-password', '/forgot-password', '/otp-verify', "/password-change"];

    if (request.nextUrl.pathname === '/') {
        return authToken ? NextResponse.redirect(new URL('/product', request.url)) : NextResponse.redirect(new URL('/home', request.url))


    //     // }else if(publicPaths.includes(request.nextUrl.pathname)){
    //     //     return authToken ? NextResponse.redirect(new URL('/login', request.url)) : NextResponse.next()
    //     // }
    //     console.log("authToken", authToken)
    // } else if (publicPaths.includes(request.nextUrl.pathname)) {
    //     return !authToken && publicPaths.includes(request.nextUrl.pathname) ? NextResponse.redirect(new URL('/login', request.url)) : authToken ? NextResponse.redirect(new URL('/product', request.url)) : NextResponse.next();
    } else {
        return NextResponse.next()
    }

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};