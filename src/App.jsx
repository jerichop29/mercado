import { BrowserRouter as Router } from "react-router-dom";
import Aos from 'aos';
import { useEffect } from "react"
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect (() => {
    Aos.init();
  }, [])
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
