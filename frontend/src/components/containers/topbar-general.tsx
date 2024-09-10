import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';

// Topbar General para las demás interfaces de la página, no es flotante como el del home

const TopbarGeneral = () => {
  const authStatus = true
  const session = {nombre:'Laura', apellido:'Lopez'}
  return (
    <header className="top-0 w-full z-50 bg-transparent">
      <div className="w-full bg-primary mx-0">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image alt='logo' src="/logo.png" width={300} height={300} />
          </div>

          {/* User Profile Button */}
          <div>
            { !authStatus ? ( //Si no hay sesion
              <div className='flex gap-2'>
                <Button variant="ghost" size="sm" className="text-xs">
                  Registrarse
                </Button>
                <Button variant="secondary" size="sm" className="">
                  Iniciar Sesión
                </Button>
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
      </div>
    </header>
  )
}

export default TopbarGeneral