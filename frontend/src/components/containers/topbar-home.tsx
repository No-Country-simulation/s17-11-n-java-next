'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';
import {useAuthStore} from '@/store/auth'
import {useRouter} from 'next/navigation'
import useProfile from '@/hooks/useProfile'

const TopbarHome = () => {
  const authStatus = true
  const session = {nombre:'Laura', apellido:'Lopez'} //Temporal, debería obtenerse de la sesión
  const {token, clearAuth} = useAuthStore();
  const router = useRouter()
  const {data:profile, isLoading:isLoadingUser, error:errorUser} = useProfile()

  const handleLogout = () => {
    clearAuth(); // Limpiar el estado de autenticación
    router.push('/'); // Redireccionar a la página de login o a la de inicio
  };

  return (
    <header className="absolute top-6 left-6 right-6 z-40 bg-transparent">
      <div className="container w-[80%] lg:w-[95%] bg-primary mx-auto px-4 z-40 flex items-center justify-between h-full p-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image alt='logo' src="/logo.png" width={300} height={300} />
        </div>
          <div className="h-10 justify-start items-center gap-6 inline-flex">
            <div className="w-[184px] justify-center items-center flex text-center text-[#fcfcfc] hover:text-black text-base font-bold leading-normal tracking-tight">
              <Link href='/public/nosotros' >SOBRE NOSOTROS</Link>
            </div>
            <div className="w-[184px] justify-center items-center flex text-center text-[#fcfcfc] hover:text-black text-base font-bold leading-normal tracking-tight">
              <Link href='/public/soporte' className="">SOPORTE</Link>
            </div>
          </div>

          {/* User Profile Button */}
          <div>
            { !token ? ( //Si no hay sesion
              <div className='flex gap-6 justify-around text-black hover:text-gray-50 items-center'>
                <Link href='/auth/registro' className='text-black font-bold p-6 px-8'>
                  Registrarse
                </Link>
                
                <Button onClick={() => router.push('/auth/login')} variant="secondary" size="sm" className="text-black font-bold p-6 px-8">
                  Iniciar Sesión
                </Button>
              </div>
          ) : ( //Si hay sesion
            <div>
              <Popover>
                <PopoverTrigger>
                  <div className='bg-white rounded-full p-1 flex flex-row items-center gap-2'>
                    <Image 
                      src={profile?.profileImageUrl || '/img/userimg-default.jpg'}
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
                    {`${profile?.name || ''} ${profile?.lastname || ''}`.trim() || "Nuevo Usuario"}

                      <hr className='border-white w-full' />
                    </div>
                    <Link href={'/dashboard/perfil'} className='font-bold'>
                      Mi Perfil
                    </Link>
                    <Button variant='ghost' className='font-bold hover:bg-transparent' onClick={handleLogout}>
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
