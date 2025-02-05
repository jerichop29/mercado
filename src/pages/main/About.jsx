import About from "../../components/main/About/About";
import PageTitle from "../../components/main/PageTitle/PageTitle";
import Stats from "../../components/main/Stats/Stats";
import Features from "../../components/main/Features/Features";

export default function AboutPage() {
    return (
        <div>
            <PageTitle />
            <About />
            <Stats />
            <Features />
        </div>
    );
}