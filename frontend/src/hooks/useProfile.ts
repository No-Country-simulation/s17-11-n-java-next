'use client'

import {useQuery} from '@tanstack/react-query'
import {ProfileFetch} from '@/services/ProfileFetch'

export default function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn:()=> ProfileFetch(),
        select: (data) => data?.data
    })
}