import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/main/ErrorPages/ErrorPage.jsx";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
