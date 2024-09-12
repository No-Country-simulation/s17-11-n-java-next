'use client'

import type { DepartamentsResponse } from "@/lib/response";
import type {DepartamentsRequest} from '@/lib/request'

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const DepartamentFetch = async (idProvincia: number): Promise<DepartamentsResponse | null> => {
    //
    const idProvinciaString = idProvincia.toString();
    //
    try{
        const response = await fetch(`${API}/api/v1/departamentos/provincia/${idProvincia}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok){
            throw new Error(response.statusText);
        }
            return await response.json();
    } catch (error){
        console.log(error)
        return null
    }
}