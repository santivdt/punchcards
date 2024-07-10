import { createClient } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const publicRoutes = [
    '/',
    '/about',
    '/pricing',
    '/contact',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ]

  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(route)
  )

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
