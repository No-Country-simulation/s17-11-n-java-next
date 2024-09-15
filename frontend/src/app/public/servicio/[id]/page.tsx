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
    idUser: data.data.user.id,
    title: data.data.title,
    description: data.data.description,
    image: data.data.imgUrl || "https://placehold.co/571x416/png",
    userName: data.data.user.username,
    category: data.data.category.name,
    province: data.data.provincia?.name || 'No disponible',
    department: data.data.departamento?.name || 'No disponible',
    days: ["D", "L", "M", "M", "J", "V", "S"], // Mapear según los días disponibles
    shifts: ["Mañana", "Tarde", "Noche"] // Mapear según los turnos disponibles
  };

  return (
    <>
      <TopbarGeneral />
      <section className="w-full max-w-[1232px] mx-auto mt-10">
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
