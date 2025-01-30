import { Outlet } from "react-router-dom";
import Header from "../components/user/Header/Header"
import Footer from "../components/user/Footer/Footer"
import '../assets/css/main.css'



export default function MainLayout() {
    return (
        <div className="index-page">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}