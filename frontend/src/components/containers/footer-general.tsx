import Image from 'next/image'
import React from 'react'
import logort from '@/../public/logort.png'
import Link from 'next/link'

function FooterGeneral() {
  return (
    <footer className='w-full p-10 bg-primary-variant-2'>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <Image src={logort} alt='RT' width={175} height={175} />
          <div className="ml-auto text-white flex flex-row gap-16 md:gap-8 sm:gap-2 sm:text-xs overflow-ellipsis">
            {[
              {href:'/',title:'INICIO',},
              {href:'/public/nosotros',title:'SOBRE NOSOTROS',},/*PENDIENTE*/
              {href:'/public/contacto',title:'CONTACTO',}, /*PENDIENTE*/
              {href:'/public/soporte',title:'SOPORTE',},
              {href:'/public/terminos',title:'TÉRMINOS Y CONDICIONES',}, /*PENDIENTE*/
            ].map((item,i) => (
              <Link href={item.href} className='h-2 font-bold hover:text-black duration-500' key={i}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <hr className='border border-white mt-4' />
        <div className="ml-auto mt-2">
          <h3 className='text-xs text-white'>
            © 2024 Retrueque - Todos los derechos reservados &nbsp;/&nbsp; 
            {/* PENDIENTE */}
            <Link href='/public/legal' className='mr-2 hover:underline hover:font-bold'>
              Aviso Legal
            </Link> - 
            {/* PENDIENTE */}
            <Link href='public/equipo' className='mx-2 hover:underline hover:font-bold'>
              Equipo de Desarrollo
            </Link> - 
            {/* PENDIENTE */}
            <Link href='public/privacidad' className='mx-2 hover:underline hover:font-bold'>
              Política de Privacidad
            </Link>
          </h3>
        </div>
      </div>
    </footer>
  )
}

export default FooterGeneral