"use client";
import { useParams } from "next/navigation";
import React from "react";
import RelatedServices from "../_components/RelatedServices";
import ServiceCard from "../_components/ServiceCard";
import TopbarGeneral from "@/components/containers/topbar-general";
import useServiceForId from "@/hooks/useServiceForId";


const Page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data, isLoading, isError, error } = useServiceForId(id);

  if (isLoading) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>Error: {error?.message}</p>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="fullscreen-container h-screen">
        <TopbarGeneral />
        <p>No se encontraron detalles del servicio.</p>
      </div>
    );
  }
  

  const serviceProps = {
    id: data?.data?.id ?? 'ID no disponible',
    idUser: data?.data?.user?.id ?? 'ID de usuario no disponible',
    title: data?.data?.title ?? 'Título no disponible',
    description: data?.data?.description ?? 'Descripción no disponible',
    image: data?.data?.imgUrl || "https://placehold.co/571x416/png",
    userName: data?.data?.user?.username ?? 'Usuario no disponible',
    category: data?.data?.category?.name ?? 'Categoría no disponible',
    province: data?.data?.provincia?.name || 'Provincia no disponible',
    department: data?.data?.departamento?.name || 'Departamento no disponible',
    days: ["D", "L", "M", "M", "J", "V", "S"], // Mapear según los días disponibles
    shifts: ["Mañana", "Tarde", "Noche"] // Mapear según los turnos disponibles
  };

  return (
    <>
      <TopbarGeneral />
      <section className="w-full max-w-[1232px] mx-auto m-10 p-10">
        <section>
          <ServiceCard {...serviceProps} />
        </section>
        <section>
          <RelatedServices />
        </section>
      </section></>
  );
};

export default Page;
