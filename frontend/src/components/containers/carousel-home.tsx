'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertCircleIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';

function CarouselHome() {
  const router = useRouter()
  const {token, clearAuth} = useAuthStore();
  return (
    <div className="w-full bg-primary">
        <Carousel opts={{
          align: "start",
          loop: true,
          duration: 60,
        }}
        plugins={[Autoplay({ delay: 4000, })]}>
          <CarouselContent>
            {['banner1psd 4.jpg','banner2psd 2.jpg','banner3psd 2.jpg',].map((item,index) => (
              <CarouselItem key={index} className='w-auto'>
                <div className='w-auto h-[67vh] relative'>
                  <Image
                    src={`/img/${item}`}
                    alt={`HeroImg ${index+1}`}
                    priority={index === 0} // Carga la imagen prioritariamente
                    className='w-full h-full'
                    fill
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          { !token ? ( //Si no hay sesión, mostrar dialog
            <Dialog.Root>
              <Dialog.Trigger className='bg-primary shadow-md shadow-gray-600 hover:bg-primary-variant-1 rounded-lg px-4 py-4 -translate-y-[15rem] ml-12 uppercase'>
              Publicar Anuncio
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50 z-40' />
                <Dialog.Title>Aviso Requiere Loguearse</Dialog.Title>
                <Dialog.Content className='fixed z-50 left-1/2 top-1/2 rounded-md bg-white p-8 textgray9 shadow -translate-x-1/2 -translate-y-1/2'>
                  <div className="flex flex-col items-center gap-3">
                    <div>
                      <AlertCircleIcon className='text-red-800 size-24' />
                    </div>
                    <h1 className='text-md font-bold'>
                      ¡Atención!
                    </h1>
                    <h4 className='max-w-[32rem] text-center'>
                      Para publicar un servicio, debes registrarte o iniciar sesión en tu cuenta. ¡Únete a nuestra comunidad para comenzar a intercambiar servicios!
                    </h4>
                    <div className="flex items-center justify-center gap-4 py-6">
                      <Link href='/login' className='text-black border border-blue-500 font-bold py-3 px-8 rounded-lg'>
                        Iniciar Sesión
                      </Link>
                      
                      <Button onClick={() => router.push('/registro')} variant="secondary" size="sm" className="text-black font-bold p-6 px-8">
                        Registrarse
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ) : ( //Si hay sesión mostrar botón que redirige
            <Button
              type="submit"
              variant="default"
              onClick={() => router.push('/servicios/crear')}
              className="bg-primary shadow-md shadow-gray-600 rounded-lg px-4 py-4 -translate-y-[15rem] ml-12 uppercase"
            >
              Publicar Anuncio
            </Button>
          )}
        </Carousel>
    </div>
  )
}

export default CarouselHome