import Image from "next/image";
import { Label } from "@/components/ui/label";

const AboutUs = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Título */}
      <div className="mt-28 mb-5">
        <h1 className="text-display-small-bold font-bold pr-[890px]">
          SOBRE NOSOTROS
        </h1>
      </div>

      {/* Contenedor para c1 y c2 */}
      <div className="flex flex-row items-center justify-center w-full max-w-7xl">
        {/* Contenedor C1 - Ajuste de fondo azul claro con texto de 32px */}
        <div
          id="c1"
          className="flex flex-col justify-center w-[604px] bg-[#BAD6EF80] bg-opacity-60 rounded-lg p-4"
        >
          <div className="text-[32px]">
            <span className="font-medium align-middle">En</span>
            <span className="inline-block align-middle">
              <Image
                src="/logo.png"
                width={200}
                height={28}
                alt="Logo de Trueque"
              />
            </span>
            <span className="font-medium align-middle">
              creemos que el intercambio de habilidades y conocimientos es una
              forma poderosa de construir comunidad y generar valor.
            </span>
            <p className="mt-4">
              Nos dedicamos a crear un espacio donde las personas puedan ofrecer
              y recibir servicios a través del trueque, sin necesidad de dinero.
            </p>
            <p className="mt-4 pb-8">
              Aquí, cada intercambio es una <br />
              oportunidad para aprender, colaborar y <br />
              aprovechar al máximo las habilidades de todos.
            </p>
          </div>
        </div>

        {/* Contenedor C2 - Texto de 36px y centrar imagen */}
        <div
          id="c2"
          className="flex flex-col justify-center items-center w-[599px]"
        >
          <p className="text-[36px] font-bold text-center">
            ¡Únete a nuestra comunidad y descubre lo que puedes lograr
            intercambiando servicios!
          </p>
          <div className="w-full flex justify-center">
            <Image
              src="/img/bg_nosotros.png"
              width={599}
              height={575}
              alt="nosotros"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
