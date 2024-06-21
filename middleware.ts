import { createClient } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

//TODO find better solution ot handle unprotected pages, https://github.com/vercel/next.js/discussions/44635
export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !user &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    request.nextUrl.pathname !== '/' &&
    request.nextUrl.pathname !== '/about' &&
    request.nextUrl.pathname !== '/pricing' &&
    request.nextUrl.pathname !== '/contact'
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
