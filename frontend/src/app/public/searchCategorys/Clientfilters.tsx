'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Filters from '@/components/filters/filters';

export function ClientFilters() {
    const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Obtener los valores de los parámetros de búsqueda
    const provincia = searchParams.get('provincia') || '';
    const departamento = searchParams.get('departamento') || '';
    const category = searchParams.get('category') || '';

    return (
        <Filters
            provincia={provincia}
            departamento={departamento}
            category={category}
            className='m-auto'
        />
    );
}
