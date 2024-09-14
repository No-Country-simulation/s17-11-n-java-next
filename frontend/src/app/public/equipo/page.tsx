import CarouselDevTeam from "@/components/containers/carousel-dev-team";
import TopbarGeneral from "@/components/containers/topbar-general";
import HeaderDevTeam from "./components/HeaderDevTeam";
import FooterDevTeam from "./components/FooterDevTeam";

export default function TeamPage() {
  return (
    // Asegúrate de usar return para devolver el JSX
    <>
      <TopbarGeneral />
      <section className="w-full max-w-[1232px] mx-auto mt-32">
        <HeaderDevTeam />
      </section>
      <section className="w-full max-w-[1900px] mx-auto py-20">
        <CarouselDevTeam />
      </section>
      <section className="flex gap-8 w-full max-w-[1232px] mx-auto mb-32">
        <FooterDevTeam />
      </section>
    </>
  );
}
