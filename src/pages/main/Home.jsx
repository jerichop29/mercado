import Hero from "../../components/main/Hero/Hero";
import FeaturedService from "../../components/main/FeaturedService/FeaturedService";
import CallToActionStall from "../../components/main/CallToActionStall/CallToActionStall";
import About from "../../components/main/About/About";
import Stats from "../../components/main/Stats/Stats";
import Features from "../../components/main/Features/Features";
import Services from "../../components/main/Services/Services";
import CallToActionFacility from "../../components/main/CallToActionFacility/CallToActionFacility";
import Contact from "../../components/main/Contact/Contact";
import Discover from "../../components/main/Discover/Discover";

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
            <Discover />
            <Contact />
        </main>
    </>
  );
}