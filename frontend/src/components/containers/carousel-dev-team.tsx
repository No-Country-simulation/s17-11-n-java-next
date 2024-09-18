"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from 'next/image';


interface TeamMember {
  image: string;
  name: string;
  role: string;
  linkedin: string;
}

const styles = {
  carouselHidden: {
    opacity: 0,
    visibility: "hidden",
    height: "0",
    transition:
      "opacity 0.5s ease-out, visibility 0.5s ease-out, height 0.5s ease-out",
  },
  carouselVisible: {
    opacity: 1,
    visibility: "visible",
    height: "auto",
    transition:
      "opacity 0.5s ease-in, visibility 0.5s ease-in, height 0.5s ease-in",
  },
};

function CarouselDevTeam() {
  const [selectedMember, setSelectedMember] =
    useState<string>("Orlando Cardenas");
  const [isInitialScrollDone, setIsInitialScrollDone] =
    useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const team: TeamMember[] = useMemo(()=> [
    {
      image: "Natalia Caniza.png",
      name: "Natalia Caniza",
      role: "DESIGN UX/UI",
      linkedin: "https://www.linkedin.com/in/naticaniza",
    },
    {
      image: "Malena de Arriba.png",
      name: "Malena de Arriba",
      role: "DESIGN UX/UI",
      linkedin: "https://www.linkedin.com/in/malena-de-arriba/",
    },
    {
      image: "Orlando Cardenas.png",
      name: "Orlando Cardenas",
      role: "FRONTEND",
      linkedin: "https://www.linkedin.com/in/orlandocardenasvillegas/",
    },
    {
      image: "Pedro Nunez.png",
      name: "Pedro Nuñez",
      role: "FRONTEND",
      linkedin:
        "https://www.linkedin.com/in/pedro-alejandro-núñez-castañeda-67969117a/",
    },
    {
      image: "Luiggi Rosas.png",
      name: "Luiggi Rosas",
      role: "FRONTEND",
      linkedin: "https://www.linkedin.com/in/luiggi-rosas/",
    },
    {
      image: "Matias Acevedo.png",
      name: "Matias Acevedo",
      role: "PROJECT MANAGER",
      linkedin: "https://www.linkedin.com/in/matias-nicolas-acevedo",
    },
    {
      image: "Joaquín Pena.png",
      name: "Joaquín Peña",
      role: "DESIGN UX/UI",
      linkedin: "https://www.linkedin.com/in/joaquinpe/",
    },
    {
      image: "Victor Maye.png",
      name: "Victor Maye",
      role: "FRONTEND",
      linkedin: "https://www.linkedin.com/in/victor-fullstack",
    },
    {
      image: "Alexander Machicado.png",
      name: "Alexander Machicado",
      role: "BACKEND",
      linkedin: "https://www.linkedin.com/in/machicadogomezalexander/",
    },
    {
      image: "Edgar Camberos.png",
      name: "Edgar Camberos",
      role: "BACKEND",
      linkedin: "https://www.linkedin.com/in/edgar-camberos-8a66052bb/",
    },
    {
      image: "Arnoldo Felce.png",
      name: "Arnoldo Felce",
      role: "QA TESTER",
      linkedin: "https://www.linkedin.com/in/arnoldo-felce-rondón",
    },
    {
      image: "Benjamin Matos.png",
      name: "Benjamin Matos",
      role: "QA TESTER",
      linkedin: "https://www.linkedin.com/in/benjaminmatosvega",
    },
    {
      image: "Gisela Lago.png",
      name: "Gisela Lago",
      role: "QA TESTER",
      linkedin: "https://www.linkedin.com/in/giselalago",
    },
    {
      image: "Gladys Ferreira.png",
      name: "Gladys Ferreira",
      role: "QA TESTER",
      linkedin: "https://www.linkedin.com/in/gladys-ferreira/",
    },
  ], []);

  const extendedTeam = useMemo(() => [...team, ...team, ...team], [team]);

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

  useEffect(() => {
    if (carouselRef.current && !isInitialScrollDone) {
      const centralIndex = team.findIndex(
        (member) => member.name === "Orlando Cardenas"
      );
      const middleTeamStart = team.length;
      const itemIndex = middleTeamStart + centralIndex;

      const item = carouselRef.current.children[itemIndex] as HTMLElement;

      const carouselContent = carouselRef.current;
      if (carouselContent) {
        Object.assign(carouselContent.style, styles.carouselHidden);
      }

      setTimeout(() => {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });

        setTimeout(() => {
          if (carouselContent) {
            Object.assign(carouselContent.style, styles.carouselVisible);
          }
          setIsInitialScrollDone(true);
        }, 1000);
      }, 100);
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
                <Image
                  src={`/team/${member.image}`}
                  alt={`${member.name} - ${member.role}`}
                  loading="lazy"
                  width={500} // Ajusta el ancho según sea necesario
                  height={300} // Ajusta la altura según sea necesario
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
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-start text-[14px] text-[#A8A8A8] hover:text-blue-600 hover:font-bold ml-1.5"
                >
                  LinkedIn
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselDevTeam;
