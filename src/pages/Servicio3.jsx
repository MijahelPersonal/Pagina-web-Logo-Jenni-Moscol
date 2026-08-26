import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Servicio3.css";

// Importación de imágenes para Servicio 3 (todas .jpg)
import heroImg from "../assets/imagenes-servicio3/hero-servicio3.jpg";
import imgServicio1 from "../assets/imagenes-servicio3/imagen-1.jpg";
import imgServicio2 from "../assets/imagenes-servicio3/imagen-2.jpg";
import imgServicio3 from "../assets/imagenes-servicio3/imagen-3.jpg";

function Servicio3() {
  const secciones = [
    {
      num: "01.",
      titulo: "TERAPIA SIN BARRERAS",
      items: [
        "Evaluación e intervención desde la comodidad de tu hogar.",
        "Ideal para quienes tienen agendas ajustadas o movilidad reducida.",
        "Elimina los tiempos y costes de desplazamiento."
      ],
      imgUrl: imgServicio1,
      alt: "Terapia online sin barreras"
    },
    {
      num: "02.",
      titulo: "SESIONES INTERACTIVAS",
      items: [
        "Videollamadas de alta calidad, seguras y confidenciales.",
        "Uso de materiales digitales, dinámicos y totalmente adaptados.",
        "Misma rigurosidad clínica y eficacia que en la consulta presencial."
      ],
      imgUrl: imgServicio2,
      alt: "Sesiones de logopedia online"
    },
    {
      num: "03.",
      titulo: "SEGUIMIENTO Y ASESORAMIENTO",
      items: [
        "Contacto directo y continuo para resolver dudas.",
        "Orientación a las familias para facilitar el trabajo en el hogar.",
        "Envío de pautas y ejercicios complementarios entre sesiones."
      ],
      imgUrl: imgServicio3,
      alt: "Seguimiento de logopedia"
    }
  ];

  return (
    <div className="srv3-page-wrapper">
      {/* 1. HERO SECTION */}
      <section 
        className="srv3-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="srv3-hero-container-inner">
          <div className="srv3-hero-content">
            <span className="srv3-hero-subtitle">Modalidad a Distancia · Jenny Moscol</span>
            <h1>
              Logopedia Online
            </h1>
            <p>
              Ofrezco sesiones interactivas y personalizadas desde cualquier lugar, manteniendo la misma cercanía, eficacia y seguimiento directo que en la consulta presencial.
            </p>
            <div className="srv3-hero-buttons">
              <a href="#contacto" className="srv3-btn-hero">
                Agendar Cita Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER (3 CAPAS) */}
      <div className="srv3-wave-divider">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            className="srv3-wave-back"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            className="srv3-wave-mid"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,160C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            className="srv3-wave-front"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* 3. SECCIÓN PRINCIPAL: BLOQUES EN ZIG-ZAG */}
      <section className="srv3-main-container">
        <div className="srv3-grid-list">
          {secciones.map((sec, idx) => (
            <div 
              key={idx} 
              className={`srv3-block-row ${idx % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="srv3-info-col">
                <div className="srv3-title-group">
                  <span className="srv3-num">{sec.num}</span>
                  <h2>{sec.titulo}</h2>
                </div>
                <ul className="srv3-items-list">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="srv3-img-col">
                {sec.imgUrl ? (
                  <img src={sec.imgUrl} alt={sec.alt} />
                ) : (
                  <div className="srv3-placeholder">
                    <span>📷 Coloca aquí tu foto para {sec.titulo.toLowerCase()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN DE CONTACTO AL FINAL */}
        <div className="srv3-action-footer" id="contacto">
          <p>¿Te gustaría empezar tu proceso terapéutico de forma online?</p>
          <a href="/contacto" className="srv3-btn-contact">
            Contáctame
          </a>
        </div>
      </section>
    </div>
  );
}

export default Servicio3;