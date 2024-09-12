import { create } from 'zustand'; // Importa la función para crear el store
import { persist } from 'zustand/middleware'; // Importa el middleware de persistencia
import { setCookie, destroyCookie } from 'nookies'; // Importa funciones para manejar cookies

// Define el tipo del estado para autentificación
type AuthState = {
  token: string; // Almacena el token de autenticación
  role: string; // Almacena el rol del usuario
  id: number; // Almacena el ID del usuario como número
  setToken: (token: string, role: string, id: number) => void; // Función para establecer el token, rol e ID
  clearAuth: () => void; // Función para limpiar el token, rol e ID
};

// Crea el store utilizando zustand con persistencia
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: "", // Estado inicial del token
      role: "", // Estado inicial del rol
      id: 0, // Estado inicial del ID
      setToken: (token: string, role: string, id: number) => {
        // Actualiza el estado con el token, rol e ID
        set({ token, role, id });

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

        // Guarda el ID de usuario en una cookie
        setCookie(null, 'auth-userId', id.toString(), {
          maxAge: 30 * 24 * 60 * 60, // 30 días de duración
          path: '/',
        });
      },
      clearAuth: () => {
        // Limpia el estado del token, rol e ID
        set({ token: "", role: "", id: 0 });

        // Elimina la cookie del token
        destroyCookie(null, 'auth-token');

        // Elimina la cookie del rol
        destroyCookie(null, 'auth-role');

        // Elimina la cookie del ID de usuario
        destroyCookie(null, 'auth-userId');
      },
    }),
    {
      name: 'auth', // Nombre del almacenamiento persistente
    }
  )
);
