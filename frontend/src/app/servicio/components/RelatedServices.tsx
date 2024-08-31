import React, { useRef, useState, useEffect } from "react";
import {
  Triangle,
  Square,
  Circle,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const ServiceCard = ({ title, description, location }) => (
  <div
    className="bg-gray-100 border-2 border-[#BAD6EF] rounded-lg shadow-md flex flex-col h-full basis-[calc(25%-1.6rem)] flex-shrink-0 overflow-hidden"
    style={{
      filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
    }}
  >
    <div className="flex items-center justify-center">
      <Image
        src="https://placehold.co/289x150/png"
        alt="Service"
        width={571}
        height={416}
        className="object-cover object-center w-full h-full"
      />
    </div>
    <div className="p-4">
      <h3 className="text-[24px] font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-8 flex-grow">{description}</p>
      <hr className="border-[#618FBA] border-2 my-4" />
      <div className="mt-auto flex justify-between">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{location}</span>
        </div>
        <button className="bg-yellow-500 text-white text-sm py-1 px-3 rounded-full hover:bg-yellow-600 transition duration-300">
          Ver publicación
        </button>
      </div>
    </div>
  </div>
);

const RelatedServices = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const services = [
    {
      title: "Título 1",
      description: "Descripción 1",
      location: "Ubicación 1",
    },
    {
      title: "Título 2",
      description: "Descripción 2",
      location: "Ubicación 2",
    },
    {
      title: "Título 3",
      description: "Descripción 3",
      location: "Ubicación 3",
    },
    {
      title: "Título 4",
      description: "Descripción 4",
      location: "Ubicación 4",
    },
    {
      title: "Título 5",
      description: "Descripción 5",
      location: "Ubicación 5",
    },
  ];

  const startDragging = (e: MouseEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLDivElement;
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const move = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    checkScrollPosition();
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () =>
      container && container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <section className="py-8 relative">
      <h2 className="text-[36px] font-bold mb-6">SERVICIOS RELACIONADOS</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex py-4 overflow-x-auto cursor-grab gap-[1.6rem] active:cursor-grabbing scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={move}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default RelatedServices;
