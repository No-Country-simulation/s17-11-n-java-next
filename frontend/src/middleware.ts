import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth-token')?.value;

    // Define las rutas públicas permitidas
    const publicRoutes = [
        '/', 
        '/auth/login', 
        '/auth/register', 
        '/verify/*', 
        '/public/soporte', 
        '/public/perfil',
        '/public/nosotros',
        '/public/contacto',
        '/public/servicio',
        '/public/servicio/nuevo',
        '/public/servicio/:id',
        '/public/search',
        '/notfound',
        '/public/soporte/*',
    ];

    // Si hay un token o la ruta es pública, permite el acceso
    if (token || publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Si el token no está presente y la ruta no es pública, redirigir al login
    return NextResponse.redirect(new URL('/auth/login', req.url));
}

// Definir las rutas donde aplicar el middleware
export const config = {
    matcher: ['/dashboard/:path*'],
};
