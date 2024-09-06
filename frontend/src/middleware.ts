import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Leer el token de autenticación desde las cookies
    const token = req.cookies.get('auth-token')?.value;

    // Si no hay token y la URL no es la página de login, redirigir al usuario a login
    if (!token && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Si hay token, permitir el acceso
    return NextResponse.next();
}

// Definir las rutas donde aplicar el middleware
export const config = {
    matcher: ['/dashboard', '/profile', '/settings'],
};