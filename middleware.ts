import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import {sql } from '@vercel/postgres'
import { User } from './types/user';
 
export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const userId = cookieStore.get("userId");

// Redirect to home if user is already logged in
  if (userId && request.nextUrl.pathname === '/welcome') {
        return NextResponse.redirect(new URL('/', request.url));
  } 

  // Redirect to welcome if user is not logged in
  else if (!userId && request.nextUrl.pathname === '/profile') {
        return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to home if user is not admin
  if(request.nextUrl.pathname === "/admin"){
    const result = await sql`
    SELECT * FROM users 
    WHERE id = ${userId?.value}`
    const user = result.rows[0] as User
    const isAdmin = user.is_admin
    if(isAdmin === false){
      return NextResponse.redirect(new URL("/", request.url));
    }
  }


}