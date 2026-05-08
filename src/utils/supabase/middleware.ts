import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Handle protected routes
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard") ||
                          request.nextUrl.pathname.startsWith("/editor") ||
                          request.nextUrl.pathname.startsWith("/billing") ||
                          request.nextUrl.pathname.startsWith("/history");

  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") ||
                     request.nextUrl.pathname.startsWith("/signup") ||
                     request.nextUrl.pathname.startsWith("/forgot-password");

  if (!user && isDashboardRoute) {
    // User is not logged in, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isAuthRoute) {
    // User is logged in, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow reset-password to be accessed even if user is logged in (since recovery link signs them in)
  if (request.nextUrl.pathname.startsWith("/reset-password")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  return response;
};
