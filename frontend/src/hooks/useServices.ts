'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ServicesFetch, ServicesFetchHomeSize12 } from '@/services/ServicesFetch';
import type { ServiciosResponse } from '@/lib/response';
import type { ServicesFiltersRequest } from '@/lib/request';

export default function useServices(){
    return useQuery({
        queryKey:['services'],
        queryFn:()=> ServicesFetch(),
        select: (data) => data?.data
    })
}

export function useServicesHomeSize12(){
    return useQuery({
        queryKey:['services'],
        queryFn:()=> ServicesFetchHomeSize12(),
        select: (data) => data?.data
    })
}