'use client'

import { useQuery } from '@tanstack/react-query'
import { ServicesByUser } from '@/services/SevicesByUser'
import type { ServicieByUserResponse } from '@/lib/response'


export default function useServicesbyid(id: number) {
    return useQuery({
        queryKey: ['servicesById', id],  // Incluir el ID en el queryKey
        queryFn: () => ServicesByUser(id),  // Pasar el ID directamente
        select: (dataServices: ServicieByUserResponse | null) => dataServices?? null,
        // Puedes agregar opciones adicionales aquí si lo necesitas
    });
}