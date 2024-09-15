'use client'

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MapPin } from 'lucide-react';

interface ResultData {
  id: number;
  imag: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
}

interface CardServicioProps {
  dataResultados: ResultData[];
  servicio: string;
}

export default function CardServicio({ dataResultados, servicio }: CardServicioProps) {
  return (
    <>
      <div className='mt-8 mb-8'>
        <p className='w-[497px] h-11 text-black text-[36px] font-bold  leading-[44px]'>{`${servicio}`}</p>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {dataResultados.map((resultado, index) => (
          <Card
            key={index}
            className="w-full h-full bg-gray-100 border-2 border-[#BAD6EF] rounded-lg shadow-md flex flex-col overflow-hidden"
            style={{ filter: 'drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))' }}
          >
            <div className="flex items-center justify-center">
              <Image
                src={resultado.imag || 'https://placehold.co/289x150/png'}
                alt="Service"
                width={571}
                height={416}
                className="object-cover object-center w-full h-[150px]"
              />
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
              <CardTitle className="text-[24px] font-semibold mb-2">{resultado.titulo}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-8 flex-grow">{resultado.descripcion}</CardDescription>
              <hr className="border-[#618FBA] border-2 my-4" />
              <div className="mt-auto flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className='text-[9px]'>{resultado.ubicacion}</span>
                </div>
                <Link
                  href={`public/servicio/${resultado.id}`}
                  className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition duration-300 w-[132px] text-center text-black text-[12px] font-normal leading-none tracking-wide block"
                >
                  Ver publicación
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div></>
  );
}
