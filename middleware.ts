import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { User } from './types/user';
import supabase from './lib/supabase';
import getUserId from './lib/get-userid';
 
export async function middleware(request: NextRequest) {
  const userId = getUserId();

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
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId?.value);
    if (data && data.length > 0) {
      const user = data[0] as User;
      const isAdmin = user.is_admin;
    if(isAdmin === false){
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Redirect to certificate if user is not enrolled
  if(request.nextUrl.pathname === "/certificate"){
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId?.value);
    if (data && data.length > 0) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect to ask question if user has not asked a question
  if (request.nextUrl.pathname === "/panel"){
    const { data, error } = await supabase
      .from("panel")
      .select("*")
      .eq("user_id", userId?.value);
    if (data && data.length < 1) {
      return NextResponse.redirect(new URL("/panel/ask", request.url));
    }
  }

  // Redirect to food if user has food tickets
  if(request.nextUrl.pathname === "/food"){
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId?.value);
    if (!(data && data.length > 0 && data[0].food_tickets > 0)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}