import type { DataVerifyToken } from '@/lib/request'; // Importa el tipo de datos para el login
import type { VerifyTokenResponse } from '@/lib/response'; // Importa el tipo de respuesta del login

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string; // Obtén la URL del backend desde las variables de entorno

// Función para verificar el token
export const FetchVerifyToken = async (data: DataVerifyToken): Promise<VerifyTokenResponse | null> => {
    const token = data.token as string;
    try {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": token
            }),
        };

        const resp = await fetch(`${API}/api/v1/auth/verify`, requestOptions);
        
        // Verifica si la respuesta es válida (status 2xx)
        if (!resp.ok) {
            console.error('Error en la verificación del token:', resp.statusText);
            return null;
        }

        // Parsear el resultado
        const result: VerifyTokenResponse = await resp.json();

        // Verifica el campo 'success' en la respuesta
        if (result.success) {
            console.log('Token verificado con éxito:', result);
            return result;
        } else {
            console.error('Error en la verificación del token:', result);
            return null;
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
};
