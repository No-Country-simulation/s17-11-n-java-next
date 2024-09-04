import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaChevronDown, FaUser } from "react-icons/fa";
import Link from 'next/link';

const TopbarHome = () => {
  const authStatus = true
  const session = {nombre:'Laura', apellido:'Lopez'}
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm shadow-sm">
      <div className="container w-[80%] lg:w-[95%] bg-primary rounded-sm mx-auto px-4">
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image alt='logo' src="/logo.png" width={150} height={150} />
          </div>

          {/* User Profile Button */}
          <div>
            { !authStatus ? (
              <div className='flex gap-2'>
                <Button variant="ghost" size="sm" className="text-xs">
                  Registrarse
                </Button>
                <Button variant="secondary" size="sm" className="">
                  Iniciar Sesión
                </Button>
              </div>
            ) : (
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className='bg-white rounded-full p-2 flex flex-row gap-2'>
                      <FaUser />
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

export default TopbarHome
