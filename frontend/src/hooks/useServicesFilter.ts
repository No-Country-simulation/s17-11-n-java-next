'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ServicesFetch } from '@/services/ServicesFetch';
import type { DataServicesFilters, ServicesFiltersResponse } from '@/lib/response';
import type { ServicesFiltersRequest } from '@/lib/request';

export default function useServicesFilter(filters: ServicesFiltersRequest = {}) {
    return useQuery<DataServicesFilters, Error>({
        queryKey: ['services', filters],
        queryFn: async () => {
            const response = await ServicesFetch(filters);

            // Verifica si la respuesta es null
            if (!response) {
                throw new Error('No se pudieron obtener los servicios.');
            }
            

            return response.data; // Devuelve solo la propiedad `data` que es de tipo `DataServicesFilters`
        },
        keepPreviousData: true, // Mantener los datos anteriores mientras carga la nueva data
    } as UseQueryOptions<DataServicesFilters, Error>); // Añadimos el tipo explícito a las opciones
}
