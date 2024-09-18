import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export async function CreateServices(
    title: string,
    description: string,
    rules: string,
    imgUrl: File,
    categoryId: string,
    days: string | string[],
    shiftTime: string | string[],
): Promise<any> {
    const { token } = useAuthStore.getState();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rules", rules);
    formData.append("imgUrl", imgUrl);
    formData.append("categoryId", categoryId);

    //Convierte `days` a una cadena separada por comas
    if (Array.isArray(days)) {
        formData.append("days", days.join(','));
    } else {
        formData.append("days", days);
    }

    //Convierte `shiftTime` a una cadena separada por comas
    if (Array.isArray(shiftTime)) {
        formData.append("shiftTime", shiftTime.join(','));
    } else {
        formData.append("shiftTime", shiftTime);
    }

    console.log(formData)

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        }),
        body: formData
    };

    try {
        const response = await fetch(`${API}/api/v1/service`, requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
