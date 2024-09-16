// endpoint para Filter
'use client'
import type {ServiciosResponse} from "@/lib/response";
import type {ServicesFiltersRequest} from "@/lib/request";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ServicesFetch = async (): Promise<ServiciosResponse | null> => {
    try{
        //
        const response = await fetch(`${API}/api/v1/service`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        });
        if (!response.ok){
            throw new Error(`Error en la petición: ${response.statusText}`);

        }
        const data: ServiciosResponse = await response.json();
        console.log(data)
        return data;
        //
    }catch(error){
        console.log("Error en la petición", error);
        return null;
    }
}