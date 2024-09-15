// endpoint para Filter
'use client'
import type {ServicesFiltersResponse} from "@/lib/response";
import type {ServicesFiltersRequest} from "@/lib/request";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ServicesFetch = async (filters: ServicesFiltersRequest = {}): Promise<ServicesFiltersResponse | null> => {
    try{
        const queryParams = new URLSearchParams();

        if (filters.id) queryParams.append("id", filters.id.toString());
        if (filters.name) queryParams.append("name", filters.name);
        if (filters.page) queryParams.append("page", filters.page.toString());
        if (filters.pageSize) queryParams.append("pageSize", filters.pageSize.toString());
        //
        const response = await fetch(`${API}/api/v1/services?${queryParams.toString()}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        });
        if (!response.ok){
            throw new Error(`Error en la petición: ${response.statusText}`);

        }
        const data: ServicesFiltersResponse = await response.json();
        console.log(data)
        return data;
        //
    }catch(error){
        console.log("Error en la petición", error);
        return null;
    }
}