'use client'
import { useAuthStore } from "@/store/auth";
import type { ProvinciasResponse } from "@/lib/response";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;
console.log('esta es la api url',API)

export const ProvinciasFetch = async (): Promise<ProvinciasResponse | null> => {
    try{

        const response = await fetch(`${API}/api/v1/provincias`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
          }
      
          const data: ProvinciasResponse = await response.json();
          console.log(data)
          return data;
          
        } catch (error) {
          console.log("Error en la petición", error);
          return null;
        }
}