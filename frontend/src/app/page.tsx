import Image from "next/image";
import ImgBg1 from '@/../public/img/banner1psd 4.jpg'
import TopbarHome from "@/components/containers/topbar-home";
import CarouselHome from "@/components/containers/carousel-home";
import FormHome from "@/components/filters/form-home";
import CardServicio from "@/components/cards/CardServicio";
import { srvTemp } from "@/lib/data/servicios";


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
        <section className="absolute w-full -translate-y-[7.3rem] z-10">
          <FormHome />
        </section>
        {/* Nuestros Números */}
        <div className="flex flex-row gap-8 items-center justify-center p-8 mt-16 mb-8">
          <h3 className="text-xs max-w-[8.5rem]">
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
      {/* Mejor Calificados */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Mejor Calificados</h1>
        <CardServicio dataResultados={srvTemp.mcalif.dataResultados} servicio={srvTemp.mcalif.servicio} key={1} />
      </section>
      {/* Más Buscados */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Más Buscados</h1>
        <CardServicio dataResultados={srvTemp.mbuscados.dataResultados} servicio={srvTemp.mbuscados.servicio} key={1} />
      </section>
      {/* Cercanos a Ti */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Cercanos a Ti</h1>
        <CardServicio dataResultados={srvTemp.cercanos.dataResultados} servicio={srvTemp.cercanos.servicio} key={1} />
      </section>
    </main>
  );
}
