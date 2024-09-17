"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import TopbarGeneral from "@/components/containers/topbar-general";
import Link from "next/link";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  index: number;
}
const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  toggle,
  index,
}) => (
  <div className="border-gray-200">
    <button
      className={`flex justify-between px-4 py-6 rounded-lg items-center w-full text-left font-medium text-gray-900 focus:outline-none border-2 border-[#BAD6EF] ${
        isOpen ? "bg-[#BAD6EF]" : ""
      } ${index !== 0 ? "border-t-0" : ""} ${index}`}
      onClick={toggle}
    >
      <span className="font-medium">{question}</span>
      {isOpen ? (
        <ChevronUp className="flex-shrink-0 ml-2" />
      ) : (
        <ChevronDown className="flex-shrink-0 ml-2" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pt-4 pb-16 text-gray-600 border-lg border-[2px] border-[#BAD6EF] rounded-lg">
        {answer}
      </div>
    )}
  </div>
);

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "1. ¿Qué es el trueque y cómo funciona en nuestra plataforma?",
      answer: 'El trueque es un intercambio directo de servicios o productos sin utilizar dinero. En nuestra plataforma, los usuarios pueden publicar ofertas de los productos o servicios que desean intercambiar y buscar las ofertas de otros usuarios que les interesen. Una vez que encuentres una oferta que te guste, puedes contactar al usuario para negociar el intercambio y coordinar los detalles.',
    },
    {
      question: "2. ¿Cómo puedo registrarme y comenzar a intercambiar?",
      answer: 'Para registrarte, simplemente haz clic en el botón de "Registro" en la esquina superior derecha de la página de inicio. Completa el formulario con tu información básica, verifica tu dirección de correo electrónico y ya podrás comenzar a publicar ofertas y buscar intercambios. Es fácil y gratuito.',
    },
    {
      question: "3. ¿Es seguro intercambiar productos y servicios en esta plataforma?",
      answer: 'Nos tomamos muy en serio la seguridad de nuestros usuarios. Contamos con un sistema de calificaciones y comentarios que permite a los usuarios evaluar sus experiencias de intercambio. Recomendamos siempre revisar los perfiles y las calificaciones antes de realizar un intercambio, y mantener todas las comunicaciones dentro de la plataforma para mayor seguridad.',
    },
    {
      question: "4. ¿Qué tipos de productos y servicios se pueden intercambiar?",
      answer: 'Puedes intercambiar una amplia variedad de productos y servicios, siempre y cuando cumplan con nuestras políticas y términos de uso. Esto incluye desde artículos del hogar y ropa hasta servicios profesionales como clases particulares, reparaciones, asesorías, y más. Consulta nuestras políticas para asegurarte de que tu oferta cumpla con nuestros estándares.',
    },
    {
      question: "5. ¿Qué sucede si no estoy satisfecho con un intercambio?",
      answer: 'Si no estás satisfecho con un intercambio, te recomendamos que primero intentes resolver el problema directamente con el otro usuario. Si no se puede llegar a una solución, puedes reportar el problema a nuestro equipo de soporte a través de la función de “Ayuda” en la plataforma. Investigaremos el caso y tomaremos las medidas necesarias para ayudarte a resolver la situación.',
    },
  ];

  return (
    <>
      <TopbarGeneral />
      <Card className="border-none rounded-none shadow-none">
        <CardHeader className="bg-[#74ACDF] text-whit">
          <div className="w-full max-w-2xl mx-auto">
            <CardTitle className="text-[36px] font-bold text-black">
              PREGUNTAS FRECUENTES
            </CardTitle>
            <div className="relative mt-4">
              <Input
                placeholder="Buscador"
                className="pr-10 pl-4 py-6 w-full rounded-md text-gray-900"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 w-full max-w-[1232px] mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-center mt-6">
          <h3 className="text-[36px] font-semibold mb-2">
            ¿Te quedaste con la duda?
          </h3>
          <p className="text-center mb-4">
            ¡No dudes en contactarnos para resolver cualquier consulta y sumarla
            a la comunidad!
          </p>
          <Link href='/public/contacto'>
            <Button className="bg-[#F6B40E] hover:bg-[#ffc32c] text-black text-[20px] py-4 px-4 lg:px-20">
              Contáctanos
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default FAQComponent;
