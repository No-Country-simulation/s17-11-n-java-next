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
      question: "¿Qué es el trueque y cómo funciona en nuestra plataforma?",
      answer:
        "El trueque es un intercambio directo de servicios o productos sin utilizar dinero. En nuestra plataforma, los usuarios pueden publicar ofertas de los productos o servicios que desean intercambiar y buscar las ofertas de otros usuarios que les interesen. Una vez que encuentres una oferta que te guste, puedes contactar al usuario para negociar el intercambio y coordinar los detalles.",
    },
    {
      question: "¿Cómo puedo registrarme y comenzar a intercambiar?",
      answer:
        "El proceso de registro es simple y rápido. [Aquí iría la explicación del proceso]",
    },
    {
      question:
        "¿Es seguro intercambiar productos y servicios en esta plataforma?",
      answer:
        "Sí, tomamos medidas para garantizar la seguridad. [Aquí irían los detalles de seguridad]",
    },
    {
      question: "¿Qué tipos de productos y servicios se pueden intercambiar?",
      answer:
        "Se puede intercambiar una amplia variedad de items. [Aquí iría una lista o explicación]",
    },
    {
      question: "¿Qué sucede si no estoy satisfecho con un intercambio?",
      answer:
        "Tenemos un proceso para manejar disputas. [Aquí irían los detalles del proceso]",
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
          <Button className="bg-[#F6B40E] hover:bg-[#ffc32c] text-black text-[20px] py-4 px-4 lg:px-20">
            Contáctanos
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FAQComponent;
