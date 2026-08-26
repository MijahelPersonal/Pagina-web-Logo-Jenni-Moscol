import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Servicio2.css";

// Importación de las 7 imágenes para Servicio 2
import heroImg from "../assets/imagenes-servicio2/hero-servicio2.jpg";
import imgServicio1 from "../assets/imagenes-servicio2/imagen-1.jpg";
import imgServicio2 from "../assets/imagenes-servicio2/imagen-2.jpg";
import imgServicio3 from "../assets/imagenes-servicio2/imagen-3.jpg";
import imgServicio4 from "../assets/imagenes-servicio2/imagen-4.png";
import imgServicio5 from "../assets/imagenes-servicio2/imagen-5.png";
import imgServicio6 from "../assets/imagenes-servicio2/imagen-6.png";

function Servicio2() {
  const secciones = [
    {
      num: "01.",
      titulo: "LENGUAJE Y HABLA",
      items: [
        "Trastorno de los sonidos del habla (TSH)",
        "Trastorno del desarrollo del lenguaje (TDL)",
        "Trastorno de la comunicación no especificado",
        "Trastorno de la fluidez (tartamudez)"
      ],
      imgUrl: imgServicio1,
      alt: "Lenguaje y habla en adultos"
    },
    {
      num: "02.",
      titulo: "NEURODESARROLLO",
      items: [
        "Trastorno del espectro autista (TEA)",
        "TDA / TDAH",
        "Cuadro sindrómico",
        "Discapacidad intelectual"
      ],
      imgUrl: imgServicio2,
      alt: "Neurodesarrollo adultos"
    },
    {
      num: "03.",
      titulo: "DIFICULTADES DE APRENDIZAJE",
      items: [
        "Evaluación psicopedagógica",
        "Dificultades de la lectura (dislexia)",
        "Dificultades de la escritura (disgrafía)",
        "Dificultades de cálculo (discalculia)"
      ],
      imgUrl: imgServicio3,
      alt: "Dificultades de aprendizaje en adultos"
    },
    {
      num: "04.",
      titulo: "MOTRICIDAD OROFACIAL",
      items: [
        "Mal posicionamiento lingual",
        "Incompetencia oral anterior",
        "Respiración oral",
        "Tratamiento pre y post ortodoncia",
        "Tratamiento pre y post intervención quirúrgica",
        "Ronquido y apnea del sueño"
      ],
      imgUrl: imgServicio4,
      alt: "Motricidad orofacial adultos"
    },
    {
      num: "05.",
      titulo: "PROBLEMAS DE ALIMENTACIÓN",
      items: [
        "Deglucion disfuncional",
        "Disfagia"
      ],
      imgUrl: imgServicio5,
      alt: "Problemas de alimentación y deglución"
    },
    {
      num: "06.",
      titulo: "VOZ",
      items: [
        "Disfonías funcionales",
        "Disfonía por lesiones adquiridas (nódulos, pólipos, edema de Reinke...)",
        "Disfonía por lesiones congénitas (quiste, sulcus, vergeture...)",
        "Voz profesional"
      ],
      imgUrl: imgServicio6,
      alt: "Tratamiento de la voz"
    }
  ];

  return (
    <div className="srv2-page-wrapper">
      {/* 1. HERO SECTION */}
      <section 
        className="srv2-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="srv2-hero-container-inner">
          <div className="srv2-hero-content">
            <span className="srv2-hero-subtitle">Servicios · Jenny Moscol</span>
            <h1>
              Logopedia para :
              <span className="srv2-highlight-word">Jovenes y Adultos</span>
            </h1>
            <p>
              Ofrezco soluciones para cubrir todas las necesidades relacionadas con el lenguaje, la comunicación, la voz y la deglución en esta etapa de la vida.
            </p>
            <div className="srv2-hero-buttons">
              <a href="#contacto" className="srv2-btn-hero">
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER (3 CAPAS) */}
      <div className="srv2-wave-divider">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            className="srv2-wave-back"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            className="srv2-wave-mid"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,160C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            className="srv2-wave-front"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* 3. SECCIÓN PRINCIPAL: BLOQUES EN ZIG-ZAG */}
      <section className="srv2-main-container">
        <div className="srv2-grid-list">
          {secciones.map((sec, idx) => (
            <div 
              key={idx} 
              className={`srv2-block-row ${idx % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="srv2-info-col">
                <div className="srv2-title-group">
                  <span className="srv2-num">{sec.num}</span>
                  <h2>{sec.titulo}</h2>
                </div>
                <ul className="srv2-items-list">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="srv2-img-col">
                {sec.imgUrl ? (
                  <img src={sec.imgUrl} alt={sec.alt} />
                ) : (
                  <div className="srv2-placeholder">
                    <span>📷 Coloca la imagen descargada</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN DE CONTACTO AL FINAL */}
        <div className="srv2-action-footer" id="contacto">
          <p>¿Tienes dudas o necesitas agendar una valoración personalizada?</p>
          <a href="/contacto" className="srv2-btn-contact">
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}

export default Servicio2;