'use client'
import type {ServicieByUserResponse} from "@/lib/response";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ServicesByUser = async (idUser:number): Promise<ServicieByUserResponse | null> => {

    try {
        const response = await fetch(`${API}/api/v1/service/user/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow'
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data: ServicieByUserResponse = await response.json();
        return data;
    } catch (error) {
        console.log("Error en la petición", error);
        return null;
    }
}