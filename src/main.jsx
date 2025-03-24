import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/main/ErrorPages/ErrorPage.jsx";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "react-calendar/dist/Calendar.css";
import "boxicons/css/boxicons.min.css";
import 'jspdf-autotable'; 
import "apexcharts"

createRoot(document.getElementById("root")).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
);
