'use client'

import Image from "next/image";
import ImgBg1 from '@/../public/img/banner1psd 4.jpg'
import TopbarHome from "@/components/containers/topbar-home";
import CarouselHome from "@/components/containers/carousel-home";
import FormHome from "@/components/filters/form-home";
import CardServicio from "@/components/cards/Cardcategory";
import { srvTemp } from "@/lib/data/servicios";
import {MejorCalificados,CercanosaTi, MasBuscados } from '@/lib/data/ServicciesHome'
import { ServicesFetchHomeSize12 } from "@/services/ServicesFetch";
import SectionServicesHome from "@/components/containers/section-services-home";


export default function Home() {
    
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="">
        <CarouselHome />
        <TopbarHome />
      </section>
      <section className="bg-primary flex items-center justify-center">
        {/* Filtros Home */}
        <section className="absolute w-full -translate-y-[11rem] z-10">
          <FormHome />
        </section>
        {/* Nuestros Números */}
        <div className="flex flex-row items-center justify-center gap-32 p-12 mt-8 mb-8">
          <h3 className="text-md max-w-[16rem]">
            Nuestros Números hablan por sí solos
          </h3>
          <div className="flex flex-col items-center">
            <h1 className="text-display-medium">3000</h1>
            <h4 className="font-bold">Registrados</h4>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-display-medium">437</h1>
            <h4 className="font-bold">Ciudades registradas</h4>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-display-medium">826</h1>
            <h4 className="font-bold">Trueques exitosos</h4>
          </div>
        </div>
      </section>
      <SectionServicesHome />
    </main>
  );
}
