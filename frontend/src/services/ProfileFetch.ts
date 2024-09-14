'use client'

import type {ProfileResponse} from "@/lib/response";
import {useAuthStore} from "@/store/auth";

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const ProfileFetch = async (): Promise<ProfileResponse | null> => {
    const { token } = useAuthStore.getState(); // asi recuperamos el token 
    try {
        const response = await fetch(`${API}/api/v1/user-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
            },
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data: ProfileResponse = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("Error en la petición", error);
        return null;
    }
}