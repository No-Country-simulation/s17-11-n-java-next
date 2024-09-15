'use client';

import { useQuery } from "@tanstack/react-query";
import { ServiceForIdResponse } from "@/lib/response";
import { ServiceForIdFetch } from "@/services/ServiceForIdFetch";

export default function useServiceForId(id: number) {
    return useQuery({
        queryKey: ['serviceForId', id],  // Incluir el ID en el queryKey
        queryFn: () => ServiceForIdFetch(id),  // Pasar el ID directamente
        select: (data: ServiceForIdResponse | null) => data?? null,
        // Puedes agregar opciones adicionales aquí si lo necesitas
    });
}
