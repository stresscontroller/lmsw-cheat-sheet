import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const isAuth = !!token

    const pathname = req.nextUrl.pathname
    const isLoginPage = req.nextUrl.pathname === '/login'
    const isProfilePage = pathname === '/profile'
    const isLearningPage = pathname === '/my-learning'
    const isEnrollNowPage = pathname === '/enroll-now';
    const isCheatSheetPages = pathname.startsWith('/cheatsheet')

    const hasPurchased = token?.hasPurchased === true

    if (isLoginPage && isAuth) {
        return NextResponse.redirect(new URL('/profile', req.url))
    }

    if (!isAuth && (isProfilePage || isLearningPage || isCheatSheetPages)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!hasPurchased && (isLearningPage || isCheatSheetPages)) {
        return NextResponse.redirect(new URL('/enroll-now', req.url))
    }

    if (hasPurchased && isEnrollNowPage) {
        return NextResponse.redirect(new URL('/my-learning', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/profile', '/my-learning', '/enroll-now', '/cheatsheet/:path*',],
}
