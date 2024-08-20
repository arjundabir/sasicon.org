import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const userId = cookies().get("userId");
    if(userId ) { 
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
export const config = {
  matcher: '/welcome',
}