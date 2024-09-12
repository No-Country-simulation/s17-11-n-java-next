import { create } from 'zustand'; // Importa la función para crear el store
import { persist } from 'zustand/middleware'; // Importa el middleware de persistencia
import { setCookie, destroyCookie } from 'nookies'; // Importa funciones para manejar cookies

// Define el tipo del estado para autentificación
type AuthState = {
    token: string; // Almacena el token de autenticación
    role: string; // Almacena el rol del usuario
    userId: string;
    setToken: (token: string, role: string, userId: string) => void; // Función para establecer el token y el rol
    clearAuth: () => void; // Función para limpiar el token y el rol
};

// Crea el store utilizando zustand con persistencia
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            token: "", // Estado inicial del token
            role: "", // Estado inicial del rol
            userId:"",
            setToken: (token: string, role: string, userId:string) => {
                // Actualiza el estado con el token y el rol
                set({ token, role, userId });
                // Guarda el token en una cookie
                setCookie(null, 'auth-token', token, {
                    maxAge: 30 * 24 * 60 * 60, // 30 días de duración
                    path: '/',
                });
                // Guarda el rol en una cookie
                setCookie(null, 'auth-role', role, {
                    maxAge: 30 * 24 * 60 * 60, // 30 días de duración
                    path: '/',
                });
                setCookie(null, 'auth-userId', userId, {
                    maxAge: 30 * 24 * 60 * 60, // 30 día de duración)
                    path:'/',
            })
            },
            clearAuth: () => {
                // Limpia el estado del token y el rol
                set({ token: "", role: "" });
                // Elimina la cookie del token
                destroyCookie(null, 'auth-token');
                // Elimina la cookie del rol
                destroyCookie(null, 'auth-role');
                destroyCookie(null, 'auth-userId')
            },
        }),
        {
            name: 'auth', // Nombre del almacenamiento persistente
        }
    )
);
