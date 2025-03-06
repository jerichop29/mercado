import About from "../../components/main/About/About";
import PageTitle from "../../components/main/PageTitle/PageTitle";
import Stats from "../../components/main/Stats/Stats";
import Features from "../../components/main/Features/Features";
import FAQ from "../../components/main/FAQ/Faq"

export default function AboutPage() {
    return (
        <div>
            <PageTitle />
            <About />
            <Stats />
            <Features />
            <FAQ />
        </div>
    );
}