import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorPage";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "react-calendar/dist/Calendar.css";
import "boxicons/css/boxicons.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
