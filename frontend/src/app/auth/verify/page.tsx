import TopbarGeneral from '@/components/containers/topbar-general';
import ClientVerify from './ClientVerify'; // Ajusta la ruta según sea necesario
import { Suspense } from 'react';
import { EmailVerificationSkeleton } from '@/components/skeletons/EmailVerificationSkeleton'; // Ajusta la ruta según sea necesario

export default function Verify() {
    return (
        <>
            <TopbarGeneral />
            <section className="flex items-center justify-center min-h-screen bg-[url('/img/bg_lr.png')] bg-cover bg-center">
                <Suspense fallback={<EmailVerificationSkeleton />}>
                    <ClientVerify />
                </Suspense>
            </section>
        </>
    );
}

