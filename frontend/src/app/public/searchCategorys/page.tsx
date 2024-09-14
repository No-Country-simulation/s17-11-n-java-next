import TopbarGeneral from '@/components/containers/topbar-general';
import { ClientFilters } from './Clientfilters'; // Ajusta la ruta según sea necesario
import { Suspense } from 'react';

export default function SearchPage() {
    return (
        <>
            <TopbarGeneral />
            <main className='w-full max-w-[1232px] mx-auto mt-10'>
                <Suspense fallback={<div>Loading filters...</div>}>
                    <ClientFilters />
                </Suspense>
            </main>
        </>
    );
}
