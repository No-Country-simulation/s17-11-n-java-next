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

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}
const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  toggle,
}) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
      onClick={toggle}
    >
      <span>{question}</span>
      {isOpen ? (
        <ChevronUp className="flex-shrink-0 ml-2" />
      ) : (
        <ChevronDown className="flex-shrink-0 ml-2" />
      )}
    </button>
    {isOpen && <div className="mt-2 text-gray-600">{answer}</div>}
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="text-2xl font-bold">
          PREGUNTAS FRECUENTES
        </CardTitle>
        <div className="relative mt-4">
          <Input
            placeholder="Buscador"
            className="pl-10 pr-4 py-2 w-full rounded-md text-gray-900"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === openIndex}
            toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">
          ¿Te quedaste con la duda?
        </h3>
        <p className="text-center mb-4">
          ¡No dudes en contactarnos para resolver cualquier consulta y sumarla a
          la comunidad!
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-white">
          Contáctanos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FAQComponent;
