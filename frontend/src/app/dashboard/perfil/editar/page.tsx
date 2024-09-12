import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Camera } from 'lucide-react'
import Image from 'next/image'

const ProfileUpdateForm = () => {
    return (
        <div className="space-y-8 mt-5 mb-28 w-full max-w-[1020px] mx-auto px-4">
            <h2 className="font-bold text-[36px] mx-auto">
                Mis datos personales
            </h2>
            <p className="text-[24px]">
                Desde esta pantalla puedes cambiar tus datos de usuario en
                Retrueque. Ninguno de tus datos personales será visible, excepto
                tu nombre, apellidos y foto de perfil.
            </p>
            <Card className="w-full max-w-[1020px] mx-auto rounded-3xl lg:rounded-3xl p-8 gap-x-8 gap-y-6 flex justify-center flex-col md:flex-row bg-[#74ACDF] border-none ">
                {/* placehold */}
                <Image
                    src="https://placehold.co/290x290/png"
                    alt="usuario"
                    className="rounded-full mx-auto size-36 lg:size-72"
                    width={290}
                    height={290}
                />
                <div className="flex justify-center items-center flex-col md:flex-row gap-6">
                    <Button
                        type="submit"
                        className="bg-[#F7C036] hover:bg-[#F7C036] text-black font-bold px-10 py-6 drop-shadow-md"
                    >
                        Agregar foto de perfil
                    </Button>
                    <Button
                        variant="outline"
                        className="border-white border-2 bg-transparent font-bold px-10 py-6 drop-shadow-md"
                    >
                        Borrar foto de perfil
                    </Button>
                </div>
            </Card>
            <Card className="w-full max-w-[1020px] mx-auto rounded-3xl bg-[#74ACDF] px-4 lg:px-24 py-2 lg:py-14">
                <CardHeader>
                    <CardTitle className="text-[24px] font-bold text-white">
                        ¿Qué te interesa a cambio?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="nameUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    id="nameUser"
                                    placeholder="Escribe tu nombre"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="lastnameUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Apellido
                                </Label>
                                <Input
                                    id="lastnameUser"
                                    placeholder="Escribe tu apellido"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="emailUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="emailUser"
                                    placeholder="Escribe tu correo electrónico"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="phoneUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Teléfono
                                </Label>
                                <Input
                                    id="phoneUser"
                                    placeholder="Escribe tu número de teléfono"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="provinceUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Provincia
                                </Label>
                                <Input
                                    id="provinceUser"
                                    placeholder="Escribe tu provincia"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="departmentUser"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Departamento
                                </Label>
                                <Input
                                    id="departmentUser"
                                    placeholder="Escribe tu departamento"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="NewPassword"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Nueva contraseña
                                </Label>
                                <Input
                                    id="NewPassword"
                                    type="password"
                                    placeholder="Escribe tu nueva contraseña"
                                    className="border-none"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-white font-semibold text-[1.2rem] my-4"
                                >
                                    Confirmar contraseña
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirma tu nueva contraseña"
                                    className="border-none"
                                />
                            </div>
                            <h3 className="text-white font-semibold text-[1.2rem] my-4">
                                Validar identidad
                            </h3>
                            <p className="text-white text-[18px]">
                                Para garantizar la seguridad de nuestra
                                comunidad, es importante validar tu identidad
                                adjuntando fotos de tu DNI. Es necesario para
                                que las transacciones sean seguras para vos y
                                para todos.
                            </p>
                            <div className="w-4/5 mx-auto flex flex-col items-center">
                                <h4 className="text-white font-semibold text-[1.2rem] my-4 w-full">
                                    Sube una foto del frente de tu DNI
                                </h4>
                                <div className="bg-white flex flex-col w-full items-center px-6 py-5 rounded-lg font-semibold">
                                    <Camera className="w-16 h-[71px] mx-auto" />
                                    <h3>Añadir foto</h3>
                                </div>
                                <h4 className="text-white font-semibold text-[1.2rem] my-4 w-full">
                                    Sube una foto del dorso de tu DNI
                                </h4>
                                <div className="bg-white flex flex-col w-full items-center px-6 py-5 rounded-lg font-semibold">
                                    <Camera className="w-16 h-[71px] mx-auto" />
                                    <h3>Añadir foto</h3>
                                </div>
                                <Button className="bg-[#A8A8A8] hover:bg-gray-200 mt-5 text-white font-bold px-14 py-6 drop-shadow-md">
                                    Guardar datos
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileUpdateForm
