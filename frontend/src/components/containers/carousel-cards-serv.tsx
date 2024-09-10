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

function CarouselCardsServicio() {
  return (
    <div className="w-full bg-primary">
        <Carousel opts={{
          align: "start",
          loop: true,
          duration: 40,
        }}
        plugins={[Autoplay({ delay: 5000, })]}>
          <CarouselContent>
            {['banner1psd 4.jpg','banner2psd 2.jpg','banner3psd 2.jpg',].map((item,index) => (
              <CarouselItem key={index} className='w-auto'>
                <div className='w-auto h-[88vh] relative'>
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
        </Carousel>
    </div>
  )
}

export default CarouselCardsServicio