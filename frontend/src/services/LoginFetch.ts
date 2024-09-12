import type { DataLogin } from '@/lib/request'; // Importa el tipo de datos para el login
import type { LoginResponse } from '@/lib/response'; // Importa el tipo de respuesta del login
import { useAuthStore } from '@/store/auth'; // Importa el store para autentificación
import { number } from 'zod';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string; // Obtén la URL del backend desde las variables de entorno

// Función para manejar el login
export const Fetchlogin = async (data: DataLogin): Promise<LoginResponse> => {
  // Obtener el token del estado (en caso de que sea necesario)
  const { token } = useAuthStore.getState();

  // Configurar los encabezados para la solicitud
  const headers = new Headers({
    "Content-Type": "application/json", // Tipo de contenido que se está enviando
    "Accept": "application/json",  // Tipo de respuesta que esperamos recibir
  });

  // Si tienes un token, lo añades a los encabezados (opcional)
  // if (token) {
  //   headers.append('Authorization', `Bearer ${token}`);
  // }

  // Crear el cuerpo de la solicitud como un JSON string
  const raw = JSON.stringify({
    email: data.email, // Añade el email del login
    password: data.password, // Añade la contraseña del login
  });

  // Configuración de la solicitud
  const requestOptions: RequestInit = {
    method: 'POST', // Método de la solicitud
    headers: headers, // Encabezados configurados
    body: raw, // Cuerpo de la solicitud
    redirect: 'follow', // Seguir redirecciones automáticamente
    credentials: 'include', // Incluir cookies en la solicitud
  };

  try {
    // Realiza la solicitud de login al backend
    const response = await fetch(`${API}/api/v1/auth/login`, requestOptions);

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`); // Lanza un error si la respuesta no es OK
    }

    // Parsea la respuesta JSON
    const result = await response.json();

    // Retorna los datos de la respuesta en el formato esperado
    return {
      message: result.message,
      data: {
        token: result.data.token,  // Asegúrate de que el backend devuelva 'token'
        role: result.data.role,    // Asegúrate de que el backend devuelva 'role'
        id: result.data.userId, // Asegúrate de que el backend devuelva 'userId'
      },
      success: result.success,
    };
  } catch (error) {
    // Maneja errores y retorna una respuesta con error
    console.error('Error en la petición:', error);
    return {
      message: 'Error en la autenticación',
      data: {
        token: '',
        role: '',
        id: 0
      },
      success: false,
    };
  }
};
