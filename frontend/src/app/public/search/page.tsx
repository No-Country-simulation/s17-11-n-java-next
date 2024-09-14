'use client'
import Filters from '@/components/filters/filters';
import TopbarGeneral from '@/components/containers/topbar-general';
import {useState, useEffect, Suspense} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Search() {
    const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    //Obtener los valores
    const provincia = searchParams.get('provincia') || '';
    const departamento = searchParams.get('departamento') || '';
    const category = searchParams.get('category') || '';

    return (
        <><TopbarGeneral />
            <main className='w-full max-w-[1232px] mx-auto mt-10'>
            <Filters
                    provincia={provincia}
                    departamento={departamento}
                    category={category}
                    className='m-auto'
                />
            </main>
        </>
    );
}
