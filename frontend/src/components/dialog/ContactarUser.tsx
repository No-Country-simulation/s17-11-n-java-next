'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface Databutton {
    idservice: number;
    userId: number;
}

export function ContactUser({ Databutton }: { Databutton: Databutton }) {
    const { idservice, userId } = Databutton;
    const { token } = useAuthStore.getState();

    // Estados para manejar el mensaje y el conteo de caracteres
    const [message, setMessage] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que el mensaje no esté vacío
        if (message.trim() === "") {
            setStatusMessage({ type: "error", text: "Por favor, ingresa un mensaje." });
            return;
        }

        // Crear el payload a enviar
        const data = {
            serviceId: idservice,
            description: message,
        };

        // Realizar la petición fetch
        try {
            const response = await fetch(`${API}/api/v1/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            // Manejar la respuesta del servidor
            if (response.ok) {
                setStatusMessage({ type: "success", text: "Mensaje enviado con éxito." });
                setMessage(""); // Resetear el mensaje
                setCharCount(0);
            } else {
                setStatusMessage({ type: "error", text: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo." });
            }
        } catch (error) {
            setStatusMessage({ type: "error", text: "Error de conexión. No se pudo enviar el mensaje." });
            console.error("Error al enviar el mensaje:", error);
        }
    };

    // Manejar el cambio en el textarea
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setCharCount(e.target.value.length);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-[#f7b40f] text-black font-bold px-8 lg:px-12 py-3 rounded">
                    CONTACTAR
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-blue-300 rounded-lg p-6">
                <DialogTitle className="text-lg font-semibold text-center mb-4">
                    Envía un mensaje al usuario para comenzar a coordinar el trueque
                </DialogTitle>

                {statusMessage && (
                    <div className={`mb-4 p-2 text-center rounded ${statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <p className="text-sm text-white mb-2">
                            Sé claro en tu propuesta para asegurar un buen intercambio
                        </p>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Escribe aquí tu consulta..."
                            rows={4}
                            maxLength={300}
                            className="w-full"
                        />
                        <p className="text-xs text-gray-600 text-right">
                            {charCount}/300
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-transparent text-black font-bold py-2 px-4 border border-black rounded"
                            onClick={() => setMessage("")} // Limpiar el mensaje
                        >
                            Cancelar
                        </button>
                        <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                            Enviar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
