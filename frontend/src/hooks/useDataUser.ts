'use client'

import { useQuery } from '@tanstack/react-query';
import { DataUserbyID } from '@/services/DataUsebyId';
import type { UserDataResponse } from '@/lib/response';

// Suponiendo que DataUserDataResponse debería ser UserDataResponse
export default function useDataUser(id: number) {
    return useQuery<UserDataResponse | null, Error>({
        queryKey: ['dataUserBYId', id],
        queryFn: async () => {
            const data = await DataUserbyID(id);
            // Asegúrate de que data es del tipo UserDataResponse o ajusta según corresponda
            return data as UserDataResponse | null;
        },
        select: (data: UserDataResponse | null) => data ?? null,
    });
}
