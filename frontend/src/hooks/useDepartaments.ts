'use client'
import {useQuery} from '@tanstack/react-query'
import {DepartamentFetch} from '@/services/DepartamentFetch'

export default function useDepartaments(idProvincia:number) {    
    return useQuery({
        queryKey: ['departaments', idProvincia],
        queryFn:()=> DepartamentFetch(idProvincia),
        select: (data) => data,
        enabled: idProvincia > 0,
        //refetchInterval: 60000,
    })
}