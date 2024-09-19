import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export interface MensajeEnviadoResponse {
    message: string;
    data:    DatumMensajeEnviadoResponse[];
    success: boolean;
}

export interface DatumMensajeEnviadoResponse {
    id:          number;
    description: string;
    date:        Date;
    status:      null;
    user:        UserMensajeEnviadoResponse;
}

export interface UserMensajeEnviadoResponse {
    name:         string;
    last_name:    string;
    img_profile:  null;
    provincia:    null;
    departamento: null;
}

// Función para hacer la petición
export async function fetchMensajesEnviados(): Promise<MensajeEnviadoResponse | null> {
    // Configurar los headers
    const { token } = useAuthStore.getState();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    // Configuración de la petición
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        // Realizar la petición fetch
        const response = await fetch(`${API}/api/v1/requests/sent`, requestOptions);

        // Comprobar si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON y mapearla a la interfaz
        const result: MensajeEnviadoResponse = await response.json();
        
        // Comprobación básica de éxito
        if (result.success) {
            console.log("Datos recibidos:", result.data);
            return result;
        } else {
            console.error("Error en la respuesta:", result.message);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}
