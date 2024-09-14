import React, { useEffect, useState } from 'react';
import { FetchVerifyToken,  } from '@/services/VerifyToken';
import type { DataVerifyToken } from '@/lib/request';


export default function VerifyToken({
    token,
    onVerifyResult,
}: {
    token: string;
    onVerifyResult: (status: string) => void; // Función para pasar el resultado
}) {
    const [status, setStatus] = useState('Verificando...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const data: DataVerifyToken = { token };
                    console.log('esto es el token',token)
                    const response = await FetchVerifyToken(data);

                    if (response?.success) {
                        setStatus('Token válido.');
                        onVerifyResult('success');
                    } else {
                        setStatus('');
                        //setError(response.message || 'Token inválido.');
                        onVerifyResult('error');
                    }
                } catch (error) {
                    setStatus('');
                    //setError('Error al verificar el token.');
                    onVerifyResult('error');
                }
            } else {
                setStatus('');
                //setError('Token no encontrado.');
                onVerifyResult('error');
            }
        };

        verifyToken();
    }, [token, onVerifyResult]);

    return (
        <div>
            <h2>{status}</h2>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
