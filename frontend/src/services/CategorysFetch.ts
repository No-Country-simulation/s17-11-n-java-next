// /api/v1/category
'use client'
import type { CategorysResponse } from "@/lib/response";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const CategorysFetch = async (): Promise<CategorysResponse | null> => {
    try {

        const response = await fetch(`${API}/api/v1/category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: CategorysResponse = await response.json();
        console.log(data)
        return data;

    } catch (error) {
        console.log("Error en la petición", error);
        return null;
    }
}