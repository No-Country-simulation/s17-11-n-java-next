"use client";
import { useParams } from "next/navigation";
import React from "react";
import RelatedServices from "../_components/RelatedServices";
import ServiceCard from "../_components/ServiceCard";
import TopbarGeneral from "@/components/containers/topbar-general";

const Page = () => {
  const { id } = useParams();
  return (
    <>
    <TopbarGeneral/>
    <section className="w-full max-w-[1232px] mx-auto mt-10">
      <section>
        <ServiceCard />
      </section>
      <section>
        <RelatedServices />
      </section>
    </section></>
  );
};

export default Page;
