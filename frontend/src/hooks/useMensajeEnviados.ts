'use client'
import { fetchMensajesEnviados } from '@/services/MensajeEnviados';
import { useQuery } from '@tanstack/react-query';

export default function useMEnsajeEnviados() {
    return useQuery({
        queryKey: ['mensajesEnviados'],
        queryFn: () => fetchMensajesEnviados(),
        refetchInterval: 10000, // Refresca cada 10 segundos (puedes ajustar este valor)
    });
}
