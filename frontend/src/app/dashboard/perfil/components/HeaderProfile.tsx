'use client'

import { Star, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface HeaderProfileProps {
    user: { name: string; avatar: string; rating: number; description: string }
    products: { description: string }[]
    authUser: boolean
}
const HeaderProfile: React.FC<HeaderProfileProps> = ({
    user,
    products,
    authUser
}) => {
    const router = useRouter()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <Card className="rounded-3xl bg-[#F1F1F1]">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="size-[180px]">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
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
                    scrollbarWidth: 'thin'
                }}
            >
                {products.map((product, index) => (
                    <Card
                        key={index}
                        className="h-[calc(50%-8px)] flex items-center px-4 rounded-3xl bg-[#F1F1F1]"
                    >
                        <Image
                            src="https://placehold.co/150x150/png"
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
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-[#74ACDF]"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="bg-[#D14A4A]"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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