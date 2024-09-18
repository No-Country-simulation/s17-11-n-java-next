import type { DeleteServiceResponse } from '@/lib/response'; // Asegúrate de que este tipo está bien definido en tu proyecto
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export async function deleteService(serviceId: number): Promise<DeleteServiceResponse | null> {
    const url = `${API}/api/v1/service/${serviceId}`;
    const { token } = useAuthStore.getState();
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorText = await response.text(); // Obtener texto de error
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result: DeleteServiceResponse = await response.json(); // Suponiendo que la respuesta es JSON
      console.log(result);
      return result;

    } catch (error) {
      console.error('Error deleting service:', error);
      return null;
    }
}
