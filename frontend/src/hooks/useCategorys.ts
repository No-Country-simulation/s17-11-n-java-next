'use client'
import { useQuery } from '@tanstack/react-query';
import { CategorysFetch } from '@/services/CategorysFetch';
import type { CategorysResponse } from '@/lib/response';


export default function useCategorys() {
    return useQuery({
        queryKey: ['categorys'],
        queryFn:()=> CategorysFetch(),
        select: (data) => data?.data
    })
}