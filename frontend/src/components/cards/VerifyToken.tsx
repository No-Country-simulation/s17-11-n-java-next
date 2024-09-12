'use client'

import React, { useEffect, useState } from 'react';
import { FetchVerifyToken } from '@/services/VerifyToken';

export default function VerifyToken({
    params,
    onVerifyResult,
}: {
    params: { token: string };
    onVerifyResult: (status: string) => void; // función para pasar el resultado
}) {
    const [status, setStatus] = useState('Verificando');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = params?.token || new URLSearchParams(window.location.search).get('token');

            if (token) {
                try {
                    const response = await FetchVerifyToken({ token });

                    if (response?.success) {
                        setStatus('');
                        onVerifyResult('success'); // notificamos al componente padre que el token es válido
                    } else {
                        setStatus('');
                        setError('');
                        onVerifyResult('error'); // notificamos el error al padre
                    }
                } catch (error) {
                    setStatus('');
                    setError('');
                    onVerifyResult('error');
                }
            } else {
                setStatus('');
                setError('');
                onVerifyResult('error');
            }
        };

        verifyToken();
    }, [params, onVerifyResult]);

    return (
        <div>
            <h2>{status}</h2>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
