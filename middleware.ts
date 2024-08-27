import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { User } from './types/user';
import { createClient } from '@supabase/supabase-js';
 
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
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
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
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
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
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
    const { data, error } = await supabase
      .from("panel")
      .select("*")
      .eq("user_id", userId?.value);
    if (data && data.length > 0) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}