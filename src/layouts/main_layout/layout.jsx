import Header from "../../components/user/Header/Header";
import Footer from "../../components/user/Footer/Footer";
import Home from "../../pages/main/Home";

export default function MainLayout() {
    return (
        <div className="index-page">
            <Header />
            <Home />
            <Footer />
        </div>
    );
}