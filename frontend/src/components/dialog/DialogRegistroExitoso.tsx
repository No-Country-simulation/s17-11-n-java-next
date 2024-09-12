"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; // Importa el ScrollArea
import Image from "next/image";

interface DialogRegistroExitosoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const DialogRegistroExitoso: React.FC<DialogRegistroExitosoProps> = ({ open, onOpenChange }) => {
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-[30px] shadow-lg w-[454px] h-[558px] overflow-hidden">
                {/* Imagen de fondo */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/register/fondo.png" // Asegúrate de cambiar esto a la ruta correcta de tu imagen
                        alt="Fondo"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                    />
                </div>

                {/* Imagen flotante adicional */}
                <div className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 z-10">
                    <Image
                        src="/register/imagen1.png"
                        alt="Avión de papel"
                        width={150}
                        height={150}
                        className="rotate-[9.37deg]"
                    />
                </div>

                {/* ScrollArea envuelve el contenido desplazable */}
                <ScrollArea className="relative top-[150px] left-0 w-full h-[350px] z-10">
                    <div className="px-8 flex flex-col items-center space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-extrabold text-black leading-tight">¡Casi terminamos!</h2>
                            <p className="text-[28px] font-medium text-black">Confirma tu email para hacer tu primer trueque</p>
                        </div>
                        <div className="text-center text-2xl text-black space-y-2">
                            <p>
                                <span className="font-bold">1. Abre el mensaje que te hemos enviado a:</span><br />
                                correo@correo.com.ar
                            </p>
                            <p>Esta dirección de correo es incorrecta? Vuelve a registrarte con un mail diferente
                                <span className="text-[#608fb9] underline cursor-pointer"> cerrando sesión aquí.</span>
                            </p>
                            <p>Revisa las carpetas de spam o notificaciones en tu bandeja de entrada.</p>
                            <p>¿No has recibido nada o el mail ha caducado?
                                <span className="text-[#608fb9] underline cursor-pointer"> Enviar de nuevo.</span>
                            </p>
                            <p className="font-bold">2. Pulsa el botón &quot;confirma tu email&quot;</p>
                        </div>

                        {/* Links adicionales */}
                        <div className="text-center text-[#608fb9] text-2xl underline">
                            cerrando sesión aquí
                        </div>
                        <div className="text-center text-[#608fb9] text-2xl underline">
                            Enviar de nuevo
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer con el botón */}
                <DialogFooter />
            </DialogContent>
        </Dialog>
    );
};
