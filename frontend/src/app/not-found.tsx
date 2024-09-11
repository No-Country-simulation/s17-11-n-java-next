import Link from 'next/link'
import Image from 'next/image'
import { rubikOne, rubikPuddles } from '@/font/google'

export default function NotFound() {
    return (
        <>
            <div className="bg-[#74acdf] w-screen h-[120px]">Reemplazar por el Header Original</div>
            <main className="text-center bg-[#fcfcfc] h-auto w-screen flex flex-col justify-center items-center relative">
                {/* Contenedor principal con imagen de fondo */}
                <div className="flex flex-col justify-center items-center w-[912px] h-[613px] bg-cover bg-center relative mt-0 mb-0"
                    style={{ backgroundImage: "url('/404/splash2.png')" }}>
                    {/* Texto grande de 404 */}
                    <div className="relative top-[120px] flex items-center justify-center w-[461px] h-[317px] gap-2">
                        {/* Letra 4 */}
                        <div className="relative flex justify-center items-center w-1/3 h-full">
                            <span className={`${rubikPuddles.className} absolute text-[#74acdf] text-[200px] font-normal opacity-50`}>
                                4
                            </span>
                            <span className={`${rubikOne.className} relative text-[#74acdf] text-[170px] font-normal z-10`}>
                                4
                            </span>
                        </div>

                        {/* Letra 0 */}
                        <div className="relative flex justify-center items-center w-1/3 h-full">
                            <span className={`${rubikPuddles.className} absolute text-[#74acdf] text-[200px] font-normal opacity-50`}>
                                0
                            </span>
                            <span className={`${rubikOne.className} relative text-[#74acdf] text-[170px] font-normal z-10`}>
                                0
                            </span>
                        </div>

                        {/* Letra 4 */}
                        <div className="relative flex justify-center items-center w-1/3 h-full">
                            <span className={`${rubikPuddles.className} absolute text-[#74acdf] text-[200px] font-normal opacity-50`}>
                                4
                            </span>
                            <span className={`${rubikOne.className} relative text-[#74acdf] text-[170px] font-normal z-10`}>
                                4
                            </span>
                        </div>
                    </div>

                    <div className="w-[1064px] h-[181px] relative top-[70px]">
                        <p className="text-5xl font-normal 
                        text-black text-[40px] leading-[56px]">Parece que te perdiste en un mar de intercambios.</p>
                    </div>

                    {/* Texto adicional */}
                    <div className="text-black text-[32px] font-medium leading-10 mt-8 mb-8">
                        ¡No te preocupes, te vinimos a rescatar!
                        <br />Puedes volver al inicio y empezar de nuevo.
                    </div>
                </div>

                {/* Enlace para volver al inicio */}
                <Link href="/" className="mb-30 bottom-10 w-[290px] h-[50px] px-[18px] py-[13px] bg-[#f6b40e] hover:bg-[#dda10d] rounded-lg shadow-lg flex justify-center items-center z-20 mt-28 mb-10">
                    <span className="text-black text-base font-bold">Volver al inicio</span>
                </Link>
                {/* Splash images positioning */}
                <div className="relative w-full h-[350px]"> {/* Add this div to wrap the splash images */}
                    <div className="absolute w-[91.63px] h-[96.33px] left-[10%] top-[100px] transform rotate-[2.11deg]">
                        <Image src={'/404/splash.png'} width={91} height={96} alt='splash'/>
                    </div>
                    <div className="absolute w-[91.63px] h-[96.33px] right-[5%] top-[80px] transform rotate-[100deg]">
                        <Image src={'/404/splash.png'} width={91} height={96} alt='splash'/>
                    </div>
                </div>
                {/* Imagen del logo al fondo */}
                <div className="bg-image404 w-screen h-[300px] absolute bottom-0 bg-no-repeat"
                >
                </div>
            </main>
            <div className="bg-[#74acdf] w-screen h-[300px]">Reemplazar por el foother original</div>
        </>
    );
}