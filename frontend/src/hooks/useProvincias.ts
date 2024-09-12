'use client'
import { useQuery } from '@tanstack/react-query';
import { ProvinciasFetch } from '@/services/ProvinciasFetch';
import type { ProvinciasResponse } from '@/lib/response';

export default function useProvincias() {
  return useQuery({
    queryKey:['provincias'],
    queryFn: ()=> ProvinciasFetch(),
    select: (data) => data?.data
  }
  );
}