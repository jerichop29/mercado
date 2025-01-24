import MainLayout from "./layouts/main_layout/layout"
import Aos from 'aos';
import { useEffect } from "react"

function App() {
  useEffect (() => {
    Aos.init();
  }, [])
  return (
    <>
      <MainLayout />
    </>
  )
}

export default App
