import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import Link from "next/link";
import useServiceForId from "@/hooks/useServiceForId";
import {ContactUser} from '@/components/dialog/ContactarUser'

interface ServiceCardProps {
  id: number;
  idUser: number;
  title: string;
  description: string;
  image: string;
  userName: string;
  category: string;
  province: string;
  department: string;
  days: string[];
  shifts: string[];
}

const ServiceCard = ({
  id,
  idUser,
  title,
  description,
  image,
  userName,
  category,
  province,
  department,
  days,
  shifts
}: ServiceCardProps) => {

  //
  const Databutton = {
    myid: id,
    userId: idUser
  };
  //
  return (
    <article
      className=" px-4 lg:px-8 py-12 mx-3 bg-white rounded-3xl overflow-hidden border-2 border-[#BAD6EF]"
      style={{
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      <div className="flex gap-8 flex-col md:flex-row">
        <aside className="flex-1 bg-transparent flex items-center justify-center">
          <figure className="space-y-2">
            <Image
              src={image || "https://placehold.co/571x416/png"}
              alt="Service"
              width={300}
              height={300}
              className="object-cover object-center w-full max-h-96"
            />
          </figure>
        </aside>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <header className="flex items-center mb-2">
              <Image
                className="w-12 h-12 bg-gray-300 rounded-full mr-3 hidden"
                src="https://placehold.co/79x79/png"
                alt={userName}
                width={79}
                height={79}
              />
              <div>
                <h2 className="text-[2rem] md:text-[3.1rem] font-bold">
                  {title}
                </h2>
                <div
                  className="flex text-[#F7C036] text-display-small-bold"
                  aria-label="5 out of 5 stars rating"
                >
                  {"★".repeat(5)}
                </div>
              </div>
            </header>
            <p className="text-[#0C0C0C] mb-4 text-[1rem] md:text-[1rem] lg:text-[1.5rem]">
              {description}
            </p>
          </div>
          <div className="flex space-x-4 justify-center">
            <ContactUser Databutton={Databutton}/>
            <Link
              href={`/public/perfil/${idUser}`} // Usa la id en la ruta
              className="bg-[#74ACDF] text-black font-bold px-8 lg:px-12 py-3 rounded"
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              VER PERFIL
            </Link>
          </div>
        </div>
      </div>
      <section className="my-4 border-gray-200 p-4">
        <dl className="grid grid-cols-4 gap-8">
          <div>
            <dt className="text-gray-500 text-sm">Categoría</dt>
            <dd className="font-bold">{category}</dd>
          </div>
          <div>
            <dt className="text-gray-500 text-sm">Provincia</dt>
            <dd className="font-bold">{province}</dd>
          </div>
          <div>
            <dt className="text-gray-500 text-sm">Departamento</dt>
            <dd className="font-bold">{department}</dd>
          </div>
        </dl>
      </section>
      <section className="border-gray-200 p-4">
        <div className="flex justify-between gap-8 flex-col md:flex-row">
          <div className="flex-1">
            <h3 className="text-gray-500 text-sm mb-2">Día/s</h3>
            <ul className="flex space-x-1" aria-label="Días disponibles">
              {days.map((day, index) => (
                <li key={index}>
                  <span
                    className={`size-[50px] rounded-full flex items-center justify-center text-black text-[20px] ${day === "S" ? "bg-yellow-500" : "border border-gray-300"
                      }`}
                  >
                    {day}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-500 text-sm mb-2">Turno/s</h3>
            <ul className="flex gap-4" aria-label="Turnos disponibles">
              {shifts.map((shift, index) => (
                <li
                  key={index}
                  className={`block px-4 py-[9px] rounded-full ${index === 0 ? "bg-[#F7C036]" : "border border-gray-300"
                    }`}
                >
                  <span
                    className={`text-black size-full font-semibold text-[20px]`}
                  >
                    {shift}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ServiceCard;
