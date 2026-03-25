import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  response.headers.set("x-pathname", request.nextUrl.pathname);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return request.nextUrl.pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/login?error=config", request.url))
      : response;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options as never);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, membership_status")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin" || profile.membership_status !== "active") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (request.nextUrl.pathname === "/login" && user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, membership_status")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin" && profile.membership_status === "active") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return response;
  } catch {
    return request.nextUrl.pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/login?error=middleware", request.url))
      : response;
  }
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
