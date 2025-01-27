import Hero from "../../components/user/Hero/Hero";
import FeaturedService from "../../components/user/FeaturedService/FeaturedService";
import CallToActionStall from "../../components/user/CallToActionStall/CallToActionStall";
import About from "../../components/user/About/About";
import Stats from "../../components/user/Stats/Stats";
import Features from "../../components/user/Features/Features";
import Services from "../../components/user/Services/Services";
import CallToActionFacility from "../../components/user/CallToActionFacility/CallToActionFacility";
import Contact from "../../components/user/Contact/Contact";

export default function HomePage() {
  return (
    <>
        <main className="main">
            <Hero />
            <FeaturedService />
            <CallToActionStall />
            <About />
            <Stats />
            <Features />
            <Services />
            <CallToActionFacility />
            <Contact />
        </main>
    </>
  );
}