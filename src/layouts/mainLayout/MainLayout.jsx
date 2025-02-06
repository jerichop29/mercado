import { Outlet } from "react-router-dom";
import Header from "../../components/main/Header/Header"
import Footer from "../../components/main/Footer/Footer"

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}