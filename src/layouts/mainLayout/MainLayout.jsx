import { Outlet } from "react-router-dom";
<<<<<<< HEAD:src/layouts/mainLayout/MainLayout.jsx
import Header from "../../components/main/Header/Header"
import Footer from "../../components/main/Footer/Footer"
=======
import Header from "../components/main/Header/Header"
import Footer from "../components/main/Footer/Footer"
import '../assets/css/main.css'


>>>>>>> fb5749ce5f7e72d7f1e0135e787758e54dc32498:src/layouts/MainLayout.jsx

export default function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}