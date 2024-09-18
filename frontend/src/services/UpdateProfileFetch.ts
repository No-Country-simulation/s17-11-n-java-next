import { useAuthStore } from '@/store/auth';
import { DataUpdateProfile } from '@/lib/request';
import { UpdateProfileResponse } from '@/lib/response';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const UpdateProfileFetch = async (formData: FormData): Promise<UpdateProfileResponse> => {
    const { token } = useAuthStore.getState();

    try {
        const response = await fetch(`${API}/api/v1/user-profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                // No es necesario establecer Content-Type cuando usas FormData, fetch lo hará automáticamente
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const result = await response.json();
        return result as UpdateProfileResponse;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
    }
};