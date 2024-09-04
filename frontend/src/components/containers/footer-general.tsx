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
          <div className="ml-auto text-white flex flex-row gap-16">
            {[
              {href:'/',title:'INICIO',},
              {href:'/nosotros',title:'SOBRE NOSOTROS',},
              {href:'/contacto',title:'CONTACTO',},
              {href:'/soporte',title:'SOPORTE',},
              {href:'/terminos',title:'TÉRMINOS Y CONDICIONES',},
            ].map((item) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={item.href} className=''>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <hr className='border border-white mt-4' />
        <div className="ml-auto mt-2">
          <h3 className='text-xs text-white'>
            © 2024 Retrueque - Todos los derechos reservados &nbsp;/&nbsp; 
            <Link href='/legal' className='mr-2 hover:underline hover:font-bold'>
              Aviso Legal
            </Link> - 
            <Link href='/equipo' className='mx-2 hover:underline hover:font-bold'>
              Equipo de Desarrollo
            </Link> - 
            <Link href='/privacidad' className='mx-2 hover:underline hover:font-bold'>
              Política de Privacidad
            </Link>
          </h3>
        </div>
      </div>
    </footer>
  )
}

export default FooterGeneral