import type {DataVerifyToken} from '@/lib/request'; // Importa el tipo de datos para el login
import type {VerifyTokenResponse} from '@/lib/response'; // Importa el tipo de respuesta del login
const API = process.env.NEXT_PUBLIC_BACKEND_URL as string; // Obtén la URL del backend desde las variables de entorno


export const FetchVerifyToken = async (data: DataVerifyToken) => {
    const token = data.token as string;
try{
    const resp = await fetch(`${API}/api/v1/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        })
    })
    const result = await resp.json()
    return result
}catch(error){
    console.log(error)
}
}

