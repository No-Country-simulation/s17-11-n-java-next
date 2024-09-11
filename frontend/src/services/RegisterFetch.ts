import type { DataRegister } from '@/lib/request'; // Importa el tipo de datos para el registro
import type { RegisterResponse } from '@/lib/response'; // Importa el tipo de respuesta del registro

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string; // Obtén la URL del backend desde las variables de entorno

// Función para manejar el registro
export const Fetchregister = async (data: DataRegister): Promise<RegisterResponse> => {
  // Configurar los encabezados para la solicitud
  const headers = new Headers({
    "Content-Type": "application/json", // Tipo de contenido que se está enviando
    "Accept": "application/json",  // Tipo de respuesta que esperamos recibir
  });

  // Crear el cuerpo de la solicitud como un JSON string
  const raw = JSON.stringify({
    name: data.name,           // Añade el nombre del usuario
    last_name: data.last_name, // Añade el apellido del usuario
    email: data.email,         // Añade el email del usuario
    password: data.password,   // Añade la contraseña del usuario
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
    // Realiza la solicitud de registro al backend
    const response = await fetch(`${API}/api/v1/auth/register`, requestOptions);

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
        id: result.data.id,
        name: result.data.name,
        last_name: result.data.last_name,
        email: result.data.email,
        createdAt: result.data.createdAt,
        role: result.data.role,
      },
      success: result.success,
    };
  } catch (error) {
    // Maneja errores y retorna una respuesta con error
    console.error('Error en la petición:', error);
    return {
      message: 'Error en el registro',
      data: {
        id: undefined,
        name: '',
        last_name: '',
        email: '',
        createdAt: '',
        role: {
          id: 0,
          name: '',
        },
      },
      success: false,
    };
  }
};
