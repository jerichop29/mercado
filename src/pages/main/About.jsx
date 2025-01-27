import About from "../../components/user/About/About";
import PageTitle from "../../components/user/PageTitle/PageTitle";
import Stats from "../../components/user/Stats/Stats";
import Features from "../../components/user/Features/Features";

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