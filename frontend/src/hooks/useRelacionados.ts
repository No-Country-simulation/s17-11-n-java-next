'use client';

import { useQuery } from '@tanstack/react-query';
import { ServicesFetch } from '@/services/ServicesFetch';
import type { ServiciosResponse, ContentServiciosResponse } from '@/lib/response';

type FilterParams = {
    categoryId?: number;
};

export default function useFilteredServices(filters: FilterParams) {
    return useQuery<ContentServiciosResponse[], Error>({
        queryKey: ['service-relacional', filters],
        queryFn: async () => {
            const response = await ServicesFetch();
            // Verificamos si la respuesta es null
            if (!response) {
                throw new Error('No se pudieron obtener los servicios.');
            }
            return response.data.content; // Devolvemos solo el array de `content`
        },
        select: (services) => {
            return services.filter((service: ContentServiciosResponse) => {


                const matchesCategory = filters.categoryId
                    ? service.category?.id !== filters.categoryId
                    : true;

                // Devuelve true si todos los filtros coinciden
                return matchesCategory;
            });
        },
    });
}
