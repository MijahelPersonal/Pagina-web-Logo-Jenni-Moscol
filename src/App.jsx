import Navbar from "./components/Navbar"
import WhatsAppWidget from "./components/WhatsAppWidget"
import PreFooter from "./components/preFooter"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Inicio from "./pages/Inicio"
import SobreMi from "./pages/SobreMi"
import Metodologia from "./pages/Metodologia"
import Blog from "./pages/Blog"
import Contacto from "./pages/Contacto"
import Servicio1 from "./pages/Servicio1"
import Servicio2 from "./pages/Servicio2"
import Servicio3 from "./pages/Servicio3"
import Servicio4 from "./pages/Servicio4"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/servicios/logopedia infantil" element={<Servicio1 />} />
        <Route path="/servicios/logopedia jovenes y adultos" element={<Servicio2 />} />
        <Route path="/servicios/logopedia online" element={<Servicio3 />} />
        <Route path="/servicios/logopedia a domicilio" element={<Servicio4 />} />
        <Route path="/metodologia" element={<Metodologia />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <PreFooter />
      <Footer />
      <WhatsAppWidget />
    </>
  )
}

export default App