import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from './app/lib/auth'; // Corrected relative path

export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Need response object for iron-session v8
  const session = await getAdminSessionFromRequest(req, res);
  const { pathname } = req.nextUrl;

  // Allow requests to the login page regardless of session state
  // This check might be redundant if the matcher excludes /admin/login, 
  // but kept for clarity and safety.
  if (pathname.startsWith('/admin/login')) {
    return res;
  }

  // If not logged in and trying to access any other admin page, redirect to login
  if (!session.isLoggedIn) {
    const loginUrl = new URL('/admin/login', req.url);
    // Optional: Add a redirect query param
    // loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in, allow access
  return res;
}

// Define which paths the middleware should run on
export const config = {
  /*
   * Match all request paths starting with /admin/.
   * The middleware function itself will handle excluding /admin/login.
   */
  matcher: '/admin/:path*', // Match all admin routes
};
