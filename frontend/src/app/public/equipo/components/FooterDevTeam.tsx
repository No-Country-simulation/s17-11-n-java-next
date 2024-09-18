"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function FooterDevTeam() {
  return (
    <>
      <Card className="flex flex-col justify-start items-start border-none shadow-none p-8">
        <CardHeader className="">
          <CardTitle className="text-display-small-bold font-bold">
            Tenés alguna pregunta? Estaremos felices de ayudarte.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-start text-[24px]">
            Pregunta sobre Retrueque, intercambios, seguridad, reclamos o
            cualquier otra cosa. Nuestros
            <br />
            representantes altamente capacitados están listos para ayudar
          </CardDescription>
        </CardContent>
        <hr className="border-t-2 border-black" />
        <CardFooter>
          <Link href='/public/contacto'>
            <Button className="bg-[#F6B40E] hover:bg-[#dda10d] font-bold px-40">Contáctanos</Button>
          </Link>
        </CardFooter>
      </Card>
      <aside className="flex-1 bg-[#DADCE0] flex items-center justify-center rounded-md p-4">
        <figure className="relative w-[500px] h-[400px] flex-shrink-0">
          <Image
            src="/skelets/servicios.png"
            alt="Service"
            width={500}
            height={400}
            className="object-cover"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </figure>
      </aside>
    </>
  );
}

export default FooterDevTeam;
