"use client";
import { useParams } from "next/navigation";
import React from "react";
import RelatedServices from "../components/RelatedServices";
import ServiceCard from "../components/ServiceCard";

const Page = () => {
  const { id } = useParams();
  return (
    <section className="w-full max-w-[1232px] mx-auto mt-10">
      <section>
        <ServiceCard />
      </section>
      <section>
        <RelatedServices />
      </section>
    </section>
  );
};

export default Page;
