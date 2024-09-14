import TopbarGeneral from '@/components/containers/topbar-general';
import ClientVerify from './ClientVerify'; // Ajusta la ruta según sea necesario
import { Suspense } from 'react';

export default function Verify() {
    return (
        <>
            <TopbarGeneral />
            <section className="flex items-center justify-center min-h-screen bg-[url('/img/bg_lr.png')] bg-cover bg-center">
                <Suspense fallback={<div>Loading filters...</div>}>
                <ClientVerify />
                </Suspense>
            </section>
        </>
    );
}
