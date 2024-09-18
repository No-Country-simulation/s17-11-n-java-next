'use client'
import React, { useEffect, useState } from 'react'
import { srvTemp } from "@/lib/data/servicios";
import CardServicio from '../cards/Cardcategory';
import { ServicesFetchHomeSize12 } from '@/services/ServicesFetch';
import { useServicesHomeSize12 } from '@/hooks/useServices';
import { ResultData } from '@/lib/response';

export default function SectionServicesHome() {
  // Partir los 12 Servicios (Esta parte se implementa temporalmente, se modificará cuando se tenga el endpoint)
  const [resultados, setResultados] = useState<ResultData[]>([]);
  const {data:rsservices} = useServicesHomeSize12()
  useEffect(() => {
    if (Array.isArray(rsservices?.content)) {
        setResultados(rsservices?.content.map(servicio => ({
            id: servicio.id,
            idUser: servicio.user.id,
            imag: servicio.imgUrl || "",
            titulo: servicio.title,
            descripcion: servicio.description,
            ubicacion: servicio.provincia?.name || ""
        })));
        console.log('esto son los servicios encontrados', rsservices);
    } else {
        console.error('No se obtuvieron Datos en Section-services-home: useServicesHomeSize12',rsservices);
    }
  }, [rsservices]);
  // console.log("RS Services:",resultados);
  let locservices
  if(resultados != null){
    locservices = resultados
  } else locservices = srvTemp
  // console.log("Content:",locservices);

  let srv = []
  if(locservices != null){
    srv.push(locservices.slice(0,4))
    srv.push(locservices.slice(4,8))
    srv.push(locservices.slice(8,12))
  }

  return (
    <div>
      {/* Mejor Calificados */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Mejor Calificados</h1>
        <CardServicio dataResultados={srv[0]} servicio={''} key={1} />
      </section>
      {/* Más Buscados */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Más Buscados</h1>
        <CardServicio dataResultados={srv[1]} servicio={''} key={2} />
      </section>
      {/* Cercanos a Ti */}
      <section className="p-16 my-8">
        <h1 className="text-display-medium font-bold uppercase">Cercanos a Ti</h1>
        <CardServicio dataResultados={srv[2]} servicio={''} key={3} />
      </section>
    </div>
  )
}
