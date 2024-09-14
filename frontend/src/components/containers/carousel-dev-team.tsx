"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  linkedin: string;
}

const styles = {
  carouselHidden: {
    opacity: 0,
    visibility: 'hidden',
    height: '0',
    transition: 'opacity 0.5s ease-out, visibility 0.5s ease-out, height 0.5s ease-out',
  },
  carouselVisible: {
    opacity: 1,
    visibility: 'visible',
    height: 'auto',
    transition: 'opacity 0.5s ease-in, visibility 0.5s ease-in, height 0.5s ease-in',
  },
};

function CarouselDevTeam() {
  const [selectedMember, setSelectedMember] =
    useState<string>("Orlando Cardenas");
  const [isInitialScrollDone, setIsInitialScrollDone] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const team: TeamMember[] = [
    {
      image: "Natalia Caniza.png",
      name: "Natalia Caniza",
      role: "UI",
      linkedin: "https://linkedin.com/in/nataliacaniza",
    },
    {
      image: "Malena de Arriba.png",
      name: "Malena de Arriba",
      role: "DESIGN UX/UI",
      linkedin: "https://linkedin.com/in/malenadearriba",
    },
    {
      image: "Orlando Cardenas.png",
      name: "Orlando Cardenas",
      role: "FRONTEND",
      linkedin: "https://linkedin.com/in/orlandocardenas",
    },
    {
      image: "Pedro Nuñez.png",
      name: "Pedro Nuñez",
      role: "FRONTEND",
      linkedin: "https://linkedin.com/in/pedronunez",
    },
    {
      image: "Luiggi Rosas.png",
      name: "Luiggi Rosas",
      role: "FRONTEND",
      linkedin: "https://linkedin.com/in/luiggirosas",
    },
    {
      image: "Matias Acevedo.png",
      name: "Matias Acevedo",
      role: "BACKEND",
      linkedin: "https://linkedin.com/in/matiasacevedo",
    },
    {
      image: "Joaquín Peña.png",
      name: "Joaquín Peña",
      role: "DEVOPS",
      linkedin: "https://linkedin.com/in/joaquinpena",
    },
    {
      image: "Victor Maye.png",
      name: "Victor Maye",
      role: "BACKEND",
      linkedin: "https://linkedin.com/in/victormaye",
    },
    {
      image: "Alexander Machicado.png",
      name: "Alexander Machicado",
      role: "BACKEND",
      linkedin: "https://linkedin.com/in/alexandermachicado",
    },
    {
      image: "Edgar Camberos.png",
      name: "Edgar Camberos",
      role: "FULLSTACK",
      linkedin: "https://linkedin.com/in/edgarcamberos",
    },
    {
      image: "Arnoldo Felce.png",
      name: "Arnoldo Felce",
      role: "FRONTEND",
      linkedin: "https://linkedin.com/in/arnoldofelce",
    },
    {
      image: "Benjamin Matos.png",
      name: "Benjamin Matos",
      role: "BACKEND",
      linkedin: "https://linkedin.com/in/benjaminmatos",
    },
    {
      image: "Gisela Lago.png",
      name: "Gisela Lago",
      role: "DESIGNER",
      linkedin: "https://linkedin.com/in/giselalago",
    },
    {
      image: "Gladys Ferreira.png",
      name: "Gladys Ferreira",
      role: "UX/UI",
      linkedin: "https://linkedin.com/in/gladysferreira",
    },
  ];

  const extendedTeam = [...team, ...team, ...team];

  const handleCardClick = (name: string, index: number) => {
    setSelectedMember(name);
    if (carouselRef.current) {
      const item = carouselRef.current.children[index] as HTMLElement;
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  // // Solo se desplaza al equipo central una vez al montar el componente
  // useEffect(() => {
  //   if (carouselRef.current && !isInitialScrollDone) {
  //     const orlandoIndex = team.findIndex(
  //       (member) => member.name === "Orlando Cardenas"
  //     );
  //     const middleTeamStart = team.length; // El inicio del segundo equipo
  //     const itemIndex = middleTeamStart + orlandoIndex; // Índice de Orlando en el equipo central

  //     const item = carouselRef.current.children[itemIndex] as HTMLElement;
  //     item.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "center",
  //     });

  //     setIsInitialScrollDone(true); // Marcar que el desplazamiento inicial se hizo
  //   }
  // }, [extendedTeam, isInitialScrollDone, team]);
  
  useEffect(() => {
    if (carouselRef.current && !isInitialScrollDone) {
      const orlandoIndex = team.findIndex(
        (member) => member.name === "Orlando Cardenas"
      );
      const middleTeamStart = team.length;
      const itemIndex = middleTeamStart + orlandoIndex;

      const item = carouselRef.current.children[itemIndex] as HTMLElement;

      // Ocultar el carrusel durante el desplazamiento inicial
      const carouselContent = carouselRef.current;
      if (carouselContent) {
        Object.assign(carouselContent.style, styles.carouselHidden);
      }

      // Realiza el desplazamiento inicial sin afectar la visibilidad
      setTimeout(() => {
        item.scrollIntoView({
          behavior: "smooth", // Puedes ajustar la velocidad aquí
          block: "nearest",
          inline: "center",
        });

        // Espera a que termine el desplazamiento para mostrar el carrusel
        setTimeout(() => {
          if (carouselContent) {
            Object.assign(carouselContent.style, styles.carouselVisible);
          }
          setIsInitialScrollDone(true);
        }, 1000); // Ajusta el tiempo para que coincida con la duración del desplazamiento
      }, 100); // Ajusta el tiempo según sea necesario
    }
  }, [extendedTeam, isInitialScrollDone, team]);

  return (
    <Carousel className="w-full">
      <CarouselContent
        ref={carouselRef}
        style={{ display: "flex", gap: "1.58rem" }}
      >
        {extendedTeam.map((member, index) => (
          <CarouselItem
            key={index}
            className="flex-grow-0 flex-shrink-0 w-[20%] mx-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            onClick={() => handleCardClick(member.name, index)}
            aria-selected={selectedMember === member.name}
          >
            <Card className="border-none w-full h-full cursor-pointer m-0 p-0">
              <CardContent className="flex flex-col justify-start p-0">
                <img
                  src={`/team/${member.image}`}
                  alt={`${member.name} - ${member.role}`}
                  loading="lazy"
                  className={`object-cover w-full h-2/3 rounded-t-md ${
                    selectedMember !== member.name ? "filter grayscale" : ""
                  }`}
                />
                <h3 className="text-start text-[20px] font-semibold my-2 ml-1.5">
                  {member.name}
                </h3>
                <p className="text-start text-[14px] text-[#A8A8A8] ml-1.5">
                  {member.role}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-start text-[14px] text-[#A8A8A8] ml-1.5"
                >
                  LinkedIn
                </a>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselDevTeam;