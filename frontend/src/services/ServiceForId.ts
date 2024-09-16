'use client';

import { ServiceForIdResponse } from "@/lib/response";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ServiceForId = async (id: number): Promise<ServiceForIdResponse | null> => {
    console.log(`Fetching data for ID: ${id}`); // Log para verificar el ID
    try {
        const response = await fetch(`${API}/api/v1/service/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(`Response Status: ${response.status}`); // Log para verificar el estado de la respuesta
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: ServiceForIdResponse = await response.json();
        console.log("Data fetched:", data); // Log para verificar los datos obtenidos
        return data;
    } catch (error) {
        console.log("Error en la petición", error);
        return null;
    }
};