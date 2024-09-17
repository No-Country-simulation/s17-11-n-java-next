'use client'

import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'

const BASE_ROUTE = '/public';

interface HeaderProfileProps {
    user: { name: string; avatar: string; rating: number; description: string }
    products: { id: number; description: string ; imag: string}[]
    authUser: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({
    user,
    products,
    authUser,
}) => {
    const router = useRouter()

    const handleProductClick = (productId: number) => {
        // Navegar al enlace del producto
        router.push(`/public/servicio/${productId}`)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-3xl bg-[#F1F1F1]">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="size-[180px]">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-[28px]">
                                {user.name}
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
                    <p className="text-[24px]">{user.description}</p>
                </CardContent>
            </Card>

            <div
                className="space-y-4 overflow-y-auto md:h-[420px]"
                style={{
                    scrollbarWidth: 'thin',
                }}
            >
                {products.map((product, index) => (
                    <Card
                        key={index}
                        className="h-[calc(50%-8px)] flex items-center px-4 rounded-3xl bg-[#F1F1F1] cursor-pointer hover:bg-gray-200"
                        onClick={() => handleProductClick(product.id)} // Evento onClick para redirigir al enlace del producto
                    >
                        <Image
                            src={product.imag || 'https://placehold.co/150x150/png'}
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
                                    Cambio por producto
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{product.description}</p>
                                {authUser && (
                                    <div className="mt-2 flex justify-end space-x-2">
                                        {/* Aquí podrías añadir botones o más funcionalidades */}
                                    </div>
                                )}
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HeaderProfile
