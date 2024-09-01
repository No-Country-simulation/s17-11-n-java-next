import React, { useRef, useState, useEffect } from "react";
import {
  Triangle,
  Square,
  Circle,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface ServiceCardProps {
  title: string;
  description: string;
  location: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  location,
}) => (
  <div
    className="bg-gray-100 border-2 border-[#BAD6EF] rounded-lg shadow-md flex flex-col h-full  flex-shrink-0 overflow-hidden"
    style={{
      filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
    }}
  >
    <div className="flex items-center justify-center">
      <Image
        src="https://placehold.co/289x150/png"
        alt="Service"
        width={571}
        height={416}
        className="object-cover object-center w-full h-full"
      />
    </div>
    <div className="p-4">
      <h3 className="text-[24px] font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-8 flex-grow">{description}</p>
      <hr className="border-[#618FBA] border-2 my-4" />
      <div className="mt-auto flex justify-between">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{location}</span>
        </div>
        <button className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-full hover:bg-yellow-600 transition duration-300">
          Ver publicación
        </button>
      </div>
    </div>
  </div>
);

const RelatedServices = () => {
  const services = [
    {
      title: "Título 1",
      description: "Descripción 1",
      location: "Ubicación 1",
    },
    {
      title: "Título 2",
      description: "Descripción 2",
      location: "Ubicación 2",
    },
    {
      title: "Título 3",
      description: "Descripción 3",
      location: "Ubicación 3",
    },
    {
      title: "Título 4",
      description: "Descripción 4",
      location: "Ubicación 4",
    },
    {
      title: "Título 5",
      description: "Descripción 5",
      location: "Ubicación 5",
    },
  ];

  return (
    <section className="py-8 relative">
      <h2 className="text-[36px] font-bold">SERVICIOS RELACIONADOS</h2>
      <div className="services cursor-grab">
        <Carousel>
          <CarouselContent className="py-8">
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ServiceCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RelatedServices;
