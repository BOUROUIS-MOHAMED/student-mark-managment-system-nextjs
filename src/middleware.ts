// src/middleware.ts (or root/middleware.ts if not in src)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes require auth
const protectedRoutes = ['/dashboard'];

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

// Configure matcher for middleware to run on
export const config = {
    matcher: ['/dashboard/:path*'],
};
