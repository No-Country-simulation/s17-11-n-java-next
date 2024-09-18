'use client'

import { Star, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {DeleteButton} from '@/components/buttons/DeleteService'
interface HeaderProfileProps {
    user: { 
        name: string; 
        profileImagUrl?: string 
        rating: number; 
        ubicacion: string;

    }
    products: { id: number; description: string; imag:string}[]
    authUser: boolean
}
const HeaderProfile: React.FC<HeaderProfileProps> = ({
    user,
    products,
    authUser
}) => {
    const router = useRouter()
    //
    const handleButtonClick =()=> {
        router.push('/dashboard/perfil/editar')
    };
    //
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <Card className="rounded-3xl bg-[#F1F1F1]">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="size-[180px]">
                            <AvatarImage src={user.profileImagUrl || 'https://placehold.co/64x64/png'} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-[28px]">
                                {user.name}
                                <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-[#74ACDF] ml-40 hover:bg-[#9cb5cc] text-black font-bold drop-shadow-md"
                                            onClick={handleButtonClick}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                            </CardTitle>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={clsx(
                                            'size-5',
                                            i < user.rating
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        )}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-[24px]">Ubicacion : {user.ubicacion}</p>
                </CardContent>
            </Card>

            <div
                className="space-y-4 overflow-y-auto md:h-[420px]"
                style={{
                    scrollbarWidth: 'thin'
                }}
            >
                {products.map((product, index) => (
                    <Card
                        key={index}
                        className="h-[calc(50%-8px)] flex items-center px-4 rounded-3xl bg-[#F1F1F1]"
                    >
                        <Image
                            src={`${product.imag || "https://placehold.co/150x150/png"}`}
                            alt="Product"
                            width={150}
                            height={150}
                            className="size-[150px] rounded-3xl"
                        />
                        <div>
                            <CardHeader className="py-3">
                                <CardTitle className="text-sm font-medium">
                                    Producto
                                </CardTitle>
                                <p className="text-xs text-gray-500">
                                    Cambio por:
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{product.description}</p>
                                {authUser && (
                                    <div className="mt-2 flex justify-end space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-[#74ACDF]"
                                            onClick={() => router.push(`/public/servicio/${product.id}`)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <DeleteButton serviceId={product.id} />
                                    </div>
                                )}
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
            {authUser && (
                <Button
                    className="w-full md:w-3/5 mx-auto col-start-[2] bg-[#F6B40E] font-bold h-[50px] hover:bg-[#F7C036]"
                    onClick={() => router.push('/public/servicio/nuevo')}
                >
                    Publicar anuncio
                </Button>
            )}
        </div>
    )
}

export default HeaderProfile
