'use client'

import React, { useState } from 'react';
import VerifyToken from '@/components/cards/VerifyToken';
import TopbarGeneral from '@/components/containers/topbar-general';
import LoginForm from '@/components/froms/LoginForm';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { token: string } }) {
    const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
    const router = useRouter();

    // Función que actualiza el estado según el resultado de la verificación
    const handleVerifyResult = (status: string) => {
        setVerifyStatus(status);
    };

    return (
        <>
            <TopbarGeneral />
            <section className="flex items-center justify-center min-h-screen bg-[url('/img/bg_lr.png')] bg-cover bg-center">
                {/* Caja de verificación de token */}
                <VerifyToken params={params} onVerifyResult={handleVerifyResult} />

                {verifyStatus === 'success' && (
                    <LoginForm
                        title="¡CORREO ELECTRÓNICO CONFIRMADO!"
                        extraDiv={
                            <div className="h-8 px-4 mb-4 bg-[#608fb9] rounded-lg justify-center items-center gap-2.5 inline-flex">
                                <div className="text-[#fcfcfc] text-2xl font-bold leading-loose">Por favor inicia sesión</div>
                            </div>
                        }
                    />
                )}

                {verifyStatus === 'error' && (
                    <div className="max-w-md mx-auto mt-8 px-6 py-4 bg-white shadow-md rounded-lg border border-gray-200 sm:max-w-lg md:max-w-xl">
                        <div className="bg-[#608fb9] text-white font-bold p-4 rounded-t-lg text-center">
                            Verificación Fallida
                        </div>
                        <div className="p-4 bg-white rounded-b-lg">
                            <p className="text-red-500 text-lg font-medium mb-2 text-center">
                                La verificación del token ha fallado.
                            </p>
                            <p className="text-gray-700 text-center">
                                Por favor, inténtelo de nuevo. Si el problema persiste, contacte al soporte técnico para obtener ayuda.
                            </p>
                            <div className="flex justify-center mt-4">
                                <button
                                    className="px-4 py-2 bg-[#608fb9] text-white font-semibold rounded hover:bg-[#507fa1] transition-colors"
                                    onClick={() => router.push('/auth/register')} // Botón para intentar de nuevo
                                >
                                    Volver al registro
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}