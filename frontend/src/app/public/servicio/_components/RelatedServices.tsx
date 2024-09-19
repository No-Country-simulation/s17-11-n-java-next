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
import useFilteredServices from '@/hooks/useRelacionados';
import { useRouter } from "next/navigation"
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const BASE_ROUTE = '/public';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  location?: string;
  image?: string;
  onClick: (id: number) => void;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  location,
  image,
  onClick,
}) => (
  <div
    className="w-full max-w-[300px] bg-gray-100 border-2 border-[#BAD6EF] rounded-lg shadow-md flex flex-col overflow-hidden"
    style={{
      filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
    }}
  >
    <div className="flex items-center justify-center">
      <Image
        src={image || "https://placehold.co/300x200/png"}
        alt="Service"
        width={300}
        height={200}
        className="object-cover object-center w-full h-[200px]"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      <hr className="border-[#618FBA] border-2 my-4" />
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span className="text-xs">{location}</span>
        </div>
        <Link
          href={`${BASE_ROUTE}/servicio/${id}`}
          className="bg-[#F6B40E] text-black text-xs py-1 px-2 rounded hover:bg-yellow-400 transition duration-300">
          Ver publicación
        </Link>
      </div>
    </div>
  </div>
);
interface CategoryId {
  categoryId: number
}
const RelatedServices = ({ categoryId }: CategoryId) => {
  const router = useRouter();
  const { data: services, isLoading, isError, error } = useFilteredServices({ categoryId });

  // const services = [
  //   {
  //     title: "Título 1",
  //     description: "Descripción 1",
  //     location: "Ubicación 1",
  //   },
  //   {
  //     title: "Título 2",
  //     description: "Descripción 2",
  //     location: "Ubicación 2",
  //   },
  //   {
  //     title: "Título 3",
  //     description: "Descripción 3",
  //     location: "Ubicación 3",
  //   },
  //   {
  //     title: "Título 4",
  //     description: "Descripción 4",
  //     location: "Ubicación 4",
  //   },
  //   {
  //     title: "Título 5",
  //     description: "Descripción 5",
  //     location: "Ubicación 5",
  //   },
  // ];
  const handleClick = (id: number) => {
    router.push(`public/servicio/${id}`); // Asegúrate de que la ruta es correcta
  };

  return (
    <section className="py-8 relative">
      <h2 className="text-[36px] font-bold">OTROS SERVICIOS</h2>
      <div className="services cursor-grab">
        <Carousel>
          <CarouselContent className="py-8">
            {services?.map((service, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  location={service?.provincia?.name ?? 'Ubicación no disponible'}
                  image={service?.imgUrl ?? 'https://placehold.co/289x150/png'}
                  onClick={handleClick}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RelatedServices;
