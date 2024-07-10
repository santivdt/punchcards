import { createClient } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './i18nConfig'

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

export async function middleware(request: NextRequest) {
  const { supabase } = createClient(request)

  if (request.nextUrl.pathname.startsWith('/auth')) {
    return i18nRouter(request, i18nConfig)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(route)
  )

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return i18nRouter(request, i18nConfig)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
