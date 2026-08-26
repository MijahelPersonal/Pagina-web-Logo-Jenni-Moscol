import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa"; // Ajusta tus íconos si usas react-icons
import "./Servicio1.css";
import heroImg from "../assets/imagenes-servicio1/hero-servicio1.jpg";
import imgServicio1 from "../assets/imagenes-servicio1/imagen-1.jpg";
import imgServicio2 from "../assets/imagenes-servicio1/imagen-2.png";
import imgServicio3 from "../assets/imagenes-servicio1/imagen-3.jpg";
import imgServicio4 from "../assets/imagenes-servicio1/imagen-4.jpg";
import imgServicio5 from "../assets/imagenes-servicio1/imagen-5.jpg";
import imgServicio6 from "../assets/imagenes-servicio1/imagen-6.png";

function Servicio1() {
  const secciones = [
    {
      num: "01.",
      titulo: "LENGUAJE Y HABLA",
      items: [
        "Atención temprana",
        "Retrasos del lenguaje",
        "Trastorno de los sonidos del habla (TSH)",
        "Trastorno del desarrollo del lenguaje (TDL)",
        "Trastorno de la comunicación no especificado",
        "Trastorno de la fluidez (tartamudez)"
      ],
      imgUrl: imgServicio1,
      alt: "Lenguaje y habla infantil"
    },
    {
      num: "02.",
      titulo: "NEURODESARROLLO INFANTIL",
      items: [
        "Trastorno generalizado del desarrollo (TGD)",
        "Trastorno del espectro autista (TEA)",
        "TDA / TDAH",
        "Cuadro sindrómico",
        "Discapacidad intelectual"
      ],
      imgUrl: imgServicio2,
      alt: "Neurodesarrollo infantil"
    },
    {
      num: "03.",
      titulo: "DIFICULTADES DE APRENDIZAJE",
      items: [
        "Evaluación psicopedagógica",
        "Dificultades de la lectura (dislexia)",
        "Dificultades de la escritura (disgrafía)",
        "Dificultades de cálculo (discalculia)",
        "Retraso en el aprendizaje de la lectura",
        "Retraso en el aprendizaje de la escritura"
      ],
      imgUrl: imgServicio3,
      alt: "Dificultades de aprendizaje"
    },
    {
      num: "04.",
      titulo: "MOTRICIDAD OROFACIAL",
      items: [
        "Mal posicionamiento lingual",
        "Incompetencia oral anterior",
        "Respiración oral",
        "Tratamiento pre y post ortodoncia",
        "Frenillo lingual"
      ],
      imgUrl: imgServicio4,
      alt: "Motricidad orofacial infantil"
    },
    {
      num: "05.",
      titulo: "PROBLEMAS DE ALIMENTACIÓN",
      items: [
        "Deglución disfuncional",
        "Disfagia"
      ],
      imgUrl: imgServicio5,
      alt: "Problemas de alimentación infantil"
    },
    {
      num: "06.",
      titulo: "VOZ",
      items: [
        "Disfonía infantil"
      ],
      imgUrl: imgServicio6,
      alt: "Voz infantil"
    }
  ];

  return (
    <div className="srv1-page-wrapper">
      {/* 1. HERO SECTION ESTILO INICIO CON IMAGEN DE FONDO */}
      <section 
        className="srv1-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="srv1-hero-container-inner">
          <div className="srv1-hero-content">
            <span className="srv1-hero-subtitle">Servicios · Jenny Moscol</span>
            <h1>Logopedia Infantil</h1>
            <p>
              Estoy comprometida en ayudar a los niños a superar dificultades en el lenguaje, la audición y el aprendizaje mediante evaluaciones y tratamientos totalmente personalizados.
            </p>
            <div className="srv1-hero-buttons">
              <a href="#contacto" className="srv1-btn-hero">
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER EXACTO AL DE INICIO */}
      <div className="srv1-wave-divider">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="srv1-wave-back" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="srv1-wave-mid" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,160C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="srv1-wave-front" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* SECCIÓN PRINCIPAL: BLOQUES EN ZIG-ZAG */}
      <section className="srv1-main-container">
        <div className="srv1-grid-list">
          {secciones.map((sec, idx) => (
            <div 
              key={idx} 
              className={`srv1-block-row ${idx % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="srv1-info-col">
                <div className="srv1-title-group">
                  <span className="srv1-num">{sec.num}</span>
                  <h2>{sec.titulo}</h2>
                </div>
                <ul className="srv1-items-list">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="srv1-img-col">
                {sec.imgUrl ? (
                  <img src={sec.imgUrl} alt={sec.alt} />
                ) : (
                  <div className="srv1-placeholder">
                    <span>📷 Coloca la imagen descargada</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN AL FINAL DIRIGIDO AL FORMULARIO DE CONTACTO */}
        <div className="srv1-action-footer" id="contacto">
          <p>¿Tienes dudas o necesitas agendar una primera valoración?</p>
          <a href="/contacto" className="srv1-btn-contact">
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}

export default Servicio1;