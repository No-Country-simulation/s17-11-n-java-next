'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';
import {useAuthStore} from '@/store/auth'
import {useRouter} from 'next/navigation'

const TopbarHome = () => {
  const authStatus = true
  const session = {nombre:'Laura', apellido:'Lopez'} //Temporal, debería obtenerse de la sesión
  const {token, clearAuth} = useAuthStore();
  const router = useRouter()

  return (
    <header className="absolute top-6 left-6 right-6 z-40 bg-transparent">
      <div className="container w-[80%] lg:w-[95%] bg-primary mx-auto px-4 z-40 flex items-center justify-between h-full p-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image alt='logo' src="/logo.png" width={300} height={300} />
        </div>

        {/* User Profile Button */}
        <div className='w-full'>
          { !token ? ( //Si no hay sesion
            <div className='flex justify-around text-gray-50 items-center'>
              {[ //Array, luego se puede sustituir por variables
                {title:'Soporte',url:'/soporte'},
                {title:'Sobre nosotros',url:'/nosotros'},
              ].map((e,index)=>(
                <Link href={e.url} className='uppercase font-bold hover:text-black' key={index}>
                  {e.title}
                </Link>
              ))}
              <div className="flex items-center justify-center gap-4">
                <Link href='/registro' className='text-black font-bold p-6 px-8'>
                  Registrarse
                </Link>
                
                <Button onClick={() => router.push('/login')} variant="secondary" size="sm" className="text-black font-bold p-6 px-8">
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          ) : ( //Si hay sesion
            <div>
              <Popover>
                <PopoverTrigger>
                  <div className='bg-white rounded-full p-1 flex flex-row items-center gap-2'>
                    <Image 
                      src='/img/userimg-default.jpg'
                      alt='usrimg'
                      className='rounded-full'
                      height={30}
                      width={30}
                    />
                    <FaChevronDown />
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-full h-full bg-secondary-variant-1'>
                  <div className="flex flex-col items-center gap-5">
                    <div>
                      {`${session.nombre} ${session.apellido}`}
                      <hr className='border-white w-full' />
                    </div>
                    <Link href={'/perfil'} className='font-bold'>
                      Mi Perfil
                    </Link>
                    <Button variant='ghost' className='font-bold hover:bg-transparent'>
                      Cerrar Sesión
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopbarHome
