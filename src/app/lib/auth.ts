import { IronSession, getIronSession } from 'iron-session'; // Removed IronSessionData
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const sessionOptions = {
  password: process.env.SESSION_SECRET!, // MUST come from environment variables
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
  },
};

// Define the shape of your session data
export interface AdminSessionData {
  isLoggedIn?: boolean;
}

// Helper to get the session in API Routes and Server Components
export async function getAdminSession(): Promise<IronSession<AdminSessionData>> {
  const cookieStore = await cookies(); // Await the promise
  const session = await getIronSession<AdminSessionData>(cookieStore, sessionOptions); // Pass the resolved store
  return session;
}

// Helper to get the session in Middleware
export async function getAdminSessionFromRequest(req: NextRequest, _res: NextResponse): Promise<IronSession<AdminSessionData>> { // Prefixed res with _
    // iron-session v8 requires response object even for getting session in middleware
    // See: https://github.com/vvo/iron-session/discussions/677
    // Pass req and res directly to getIronSession
    return getIronSession<AdminSessionData>(req, _res, sessionOptions);
}

// Function to verify password (simple comparison for now)
export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}