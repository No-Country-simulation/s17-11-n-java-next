import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Contact3() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#F6B40E] hover:bg-[#dda10d] font-bold px-40">Contáctanos</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-blue-300 rounded-lg p-6">
                <div className="flex flex-row justify-between space-x-8">
                    {/* Columna Izquierda - Formulario */}
                    <div className="flex flex-col w-1/2 space-y-4">
                        {/* Nombre */}
                        <div>
                            <Label htmlFor="name" className="text-sm font-semibold">Nombre</Label>
                            <Input id="name" placeholder="Ingresa tu nombre" />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                            <Input id="email" placeholder="Ingresa tu email" />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <Label htmlFor="phone" className="text-sm font-semibold">Teléfono</Label>
                            <Input id="phone" placeholder="Ingresa tu teléfono" />
                        </div>

                        {/* Consulta */}
                        <div>
                            <Label htmlFor="message" className="text-sm font-semibold">Desarrolla tu consulta</Label>
                            <Textarea
                                id="message"
                                placeholder="Escribe aquí tu consulta..."
                                rows={3}  // Reducimos el número de filas
                            />
                            <p className="text-xs text-gray-600 text-right">0/300</p>
                        </div>
                    </div>

                    {/* Columna Derecha - Texto y Botón */}
                    <div className="flex flex-col w-1/2 justify-between">
                        <div className='text-white justify-center text-md mt-[100px]'>
                            <DialogTitle className="text-lg font-semibold text-left">
                                Pregúntanos lo que quieras.
                            </DialogTitle>
                            <p className="text-left mt-2">
                                Prometemos contestarte a la brevedad.
                            </p>
                        </div>

                        {/* Botón de Enviar */}
                        <div className="flex justify-end mt-6">
                            <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                                Enviar consulta
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
