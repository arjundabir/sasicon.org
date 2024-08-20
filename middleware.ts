import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
export function middleware(request: NextRequest) {
    const userId = cookies().get("userId");
    if (userId && request.nextUrl.pathname === '/welcome') {
        return NextResponse.redirect(new URL('/', request.url));
    } else if (!userId && request.nextUrl.pathname === '/profile') {
        return NextResponse.redirect(new URL('/', request.url));
    }
}