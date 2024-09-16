'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ServicesFetch } from '@/services/ServicesFetch';
import type { ServiciosResponse } from '@/lib/response';
import type { ServicesFiltersRequest } from '@/lib/request';

export default function useServices(){
    return useQuery({
        queryKey:['services'],
        queryFn:()=> ServicesFetch(),
        select: (data) => data?.data
    })
}