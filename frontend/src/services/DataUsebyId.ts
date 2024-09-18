'use client';
import { DataUserDataResponse } from '@/lib/response'

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const DataUserbyID = async (idUser: number): Promise<DataUserDataResponse | null> => {
    console.log(`Fetching data for ID: ${idUser}`); // Log para verificar el ID
    try {
        const response = await fetch(`${API}/api/v1/user/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(`Response Status: ${response.status}`); // Log para verificar el estado de la respuesta
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: DataUserDataResponse = await response.json();
        console.log("Data fetched:", data); // Log para verificar los datos obtenidos
        return data;
    } catch (error) {
        console.log("Error en la petición", error);
        return null;
    }
}