'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import useProfile from '@/hooks/useProfile'

// Topbar General para las demás interfaces de la página, no es flotante como el del home

const TopbarGeneral = () => {
  const authStatus = true
  const session = { nombre: 'Laura', apellido: 'Lopez' };
  const { token, clearAuth } = useAuthStore();
  const router = useRouter()
  const {data:profile, isLoading:isLoadingUser, error:errorUser} = useProfile()

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    clearAuth(); // Limpiar el estado de autenticación
    router.push('/'); // Redireccionar a la página de login o a la de inicio
  };

  return (
    <header className="w-full items-center justify-items-center text-justify">
      <div className="w-full bg-primary mx-0">
        <div className="flex items-center  h-full px-4">
          {/* Logo */}
          <div className="flex-shrink-0 text-gray-50">
            <Image alt='logo' src="/logo.png" width={300} height={300} />
          </div>
          <div className="h-10 justify-start items-center gap-6 inline-flex">
            <div className="w-[184px] justify-center items-center flex text-center hover:text-black text-[#fcfcfc] text-base font-bold leading-normal tracking-tight">
              <Link href='/public/nosotros' >SOBRE NOSOTROS</Link>
            </div>
            <div className="w-[184px] justify-center items-center flex text-center hover:text-black text-[#fcfcfc] text-base font-bold leading-normal tracking-tight">
              <Link href='/public/soporte' className="">SOPORTE</Link>
            </div>
          </div>
          {/* User Profile Button */}
          <div className="ml-auto flex items-center">
            {!token ? ( //Si no hay sesion
              <div className='flex gap-6 text-black hover:text-gray-50 items-center justify-items-end'>

                <Link href='/auth/registro'>
                  Registrarse</Link>

                <Button onClick={() => router.push('/auth/login')} variant="secondary" size="sm" className="">
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
                      {`${profile?.name} ${profile?.lastname}`}
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
      </div>
    </header>
  )
}

export default TopbarGeneral
