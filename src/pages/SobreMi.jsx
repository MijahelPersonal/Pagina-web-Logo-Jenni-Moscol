import React, { useState, useEffect } from "react";
import { 
  UserCheck,      // Para Atención Privada / Kaen
  HeartHandshake, // Para ONG / Labor Social
  Building2,      // Para CPL Barcelona (Centro/Clínica)
  Sparkles,       // Para 26 Sentits Barcelona
  Stethoscope     // Para Naxum Barcelona (Atención clínica)
} from "lucide-react";
import "./SobreMi.css";
import heroImg from "../assets/imagenes-sobremi/imagen-1.jpg";
import his1 from "../assets/imagenes-sobremi/imagen-2.jpg";
import his2 from "../assets/imagenes-sobremi/imagen-3.jpg";
import his3 from "../assets/imagenes-sobremi/imagen-4.jpg";
import card1 from "../assets/imagenes-sobremi/imagen-5.jpg";
import card2 from "../assets/imagenes-sobremi/imagen-6.jpg";
import for1 from "../assets/imagenes-sobremi/FP-1.jpg";
import for2 from "../assets/imagenes-sobremi/FP-2.jpg";
import for3 from "../assets/imagenes-sobremi/FP-3.png";
import for4 from "../assets/imagenes-sobremi/FP-4.png";
import for5 from "../assets/imagenes-sobremi/FP-5.png";

function SobreMi() {
  const carouselSlides = [
    { img: his1, title: "Pasión Clínica", subtitle: "+10 Años de Experiencia" },
    { img: his2, title: "Rol de Madre", subtitle: "Inspiración en casa con mis 3 hijos" },
    { img: his3, title: "Empatía Real", subtitle: "Acompañamiento cercano a cada familia" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  return (
    <div className="sobremi-page">

      {/* ===========================
          CABECERA SOBRE MÍ
      =========================== */}
      <section className="sobremi-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="sobremi-hero-container-inner">
          <div className="sobremi-hero-content">
            <span className="sobremi-hero-subtitle">Tecnóloga Médica & Logopeda</span>
            <h1>Jenny Moscol</h1>
            <p>
              Uniendo el rigor de la ciencia clínica con la empatía inquebrantable de ser mamá de tres. Porque cada niño tiene su propio ritmo para conquistar el mundo a través de la voz.
            </p>
            <div className="sobremi-hero-buttons">
              <a href="#historia" className="sobremi-btn-hero">
                Conoce mi historia
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          WAVE DE TRANSICIÓN
      =========================== */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="wave-back" d="M0,40 C320,160 800,-20 1440,100 L1440,200 L0,200 Z" />
          <path className="wave-mid" d="M0,110 C480,-10 960,170 1440,60 L1440,200 L0,200 Z" />
          <path className="wave-front" d="M0,80 C360,180 1080,20 1440,110 L1440,200 L0,200 Z" />
        </svg>
      </div>

      {/* ===========================
          HISTORIA / BIOGRAFÍA HUMANA + CARRUSEL
      =========================== */}
      <section className="about-story-section" id="historia">
        <div className="story-container">
          <div className="story-text">
            <h2>Mi Historia:</h2>
            <p>
              Hola, soy <strong>Jenny Moscol</strong>. Mi camino en la logopedia y la tecnología médica no nació únicamente en las aulas universitarias de Perú y España, sino en la sala de estar de mi propia casa, lidiando con las risas, los llantos y las primeras palabras de mis tres hijos.
            </p>
            <p>
              Comprendo perfectamente la angustia de una madre cuando siente que su pequeño no se comunica como los demás, o la preocupación frente a un trastorno de deglución. Por eso, mi enfoque no busca imponer terapias rígidas; creamos puentes de confianza donde el niño se siente seguro para explorar su lenguaje y las familias recuperan la tranquilidad.
            </p>
            <p>
              Cada título colgado en mi pared representa horas de estudio, pero cada sonrisa de un paciente que logra decir "mamá" o comer sin miedo es el verdadero motor que impulsa mi vocación cada día.
            </p>
          </div>
          
          <div className="story-carousel-box">
            <div className="carousel-slides-container">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                >
                  <img src={slide.img} alt={slide.title} />
                  <div className="carousel-caption">
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          SECCIÓN TRAYECTORIA GENERAL
      =========================== */}
      <section className="sm-trayectoria-section">
        
        <div className="sm-main-header">
          <h2>TRAYECTORIA PROFESIONAL</h2>
          <p>Mi experiencia y formación continua al servicio de la excelencia</p>
        </div>

        {/* 1. FORMACIÓN PRÁCTICAS */}
        <div className="sm-block-wrapper">
          <h3 className="sm-block-title">Formación y Prácticas</h3>
          
          <div className="sm-cards-grid">
            
            <div className="sm-card">
              <span className="sm-badge-year">2014</span>
              <div className="sm-card-logo">
                <img src={for2} alt="Colegio 138" />
              </div>
              <div className="sm-card-details">
                <h4>Colegio 138</h4>
                <p>Prácticas en desarrollo del lenguaje y comunicación en entorno escolar.</p>
              </div>
            </div>

            <div className="sm-card">
              <span className="sm-badge-year">2015</span>
              <div className="sm-card-logo">
                <img src={for1} alt="Hospital FAP" />
              </div>
              <div className="sm-card-details">
                <h4>Hospital FAP</h4>
                <p>Internado de grado en evaluación y rehabilitación clínica.</p>
              </div>
            </div>

            <div className="sm-card">
              <span className="sm-badge-year">2016</span>
              <div className="sm-card-logo">
                <img src={for4} alt="UNFV" />
              </div>
              <div className="sm-card-details">
                <h4>UNFV</h4>
                <p>Tecnología Médica con especialidad en Lenguaje.</p>
              </div>
            </div>

            <div className="sm-card">
              <span className="sm-badge-year">2018</span>
              <div className="sm-card-logo">
                <img src={for3} alt="PUCP" />
              </div>
              <div className="sm-card-details">
                <h4>PUCP</h4>
                <p>Maestría en Perturbaciones de la Comunicación.</p>
              </div>
            </div>

            <div className="sm-card">
              <span className="sm-badge-year">2026</span>
              <div className="sm-card-logo">
                <img src={for5} alt="UAB Barcelona" />
              </div>
              <div className="sm-card-details">
                <h4>UAB (España)</h4>
                <p>Logopeda - Universitat Autònoma de Barcelona.</p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. EXPERIENCIA PROFESIONAL */}
<div className="sm-block-wrapper">
  <h3 className="sm-block-title">Experiencia Profesional</h3>
  
  <div className="sm-cards-grid">

    {/* Kaen - Atención Privada */}
    <div className="sm-card">
      <span className="sm-badge-year">Atención Privada</span>
      <div className="sm-card-logo icon-mode">
        <UserCheck size={32} color="#d9825b" />
      </div>
      <div className="sm-card-details">
        <h4>Kaen</h4>
        <p>Intervención logopédica y clínica personalizada.</p>
      </div>
    </div>

    {/* Yankan Awnasy ONG - Labor Social */}
    <div className="sm-card">
      <span className="sm-badge-year">Labor Social</span>
      <div className="sm-card-logo icon-mode">
        <HeartHandshake size={32} color="#d9825b" />
      </div>
      <div className="sm-card-details">
        <h4>Yankan Awnasy ONG</h4>
        <p>Apoyo profesional en terapia del lenguaje y desarrollo comunitario.</p>
      </div>
    </div>

    {/* CPL Barcelona */}
    <div className="sm-card">
      <span className="sm-badge-year">Barcelona</span>
      <div className="sm-card-logo icon-mode">
        <Building2 size={32} color="#d9825b" />
      </div>
      <div className="sm-card-details">
        <h4>CPL Barcelona</h4>
        <p>Centro de Psicología y Logopedia en Barcelona, España.</p>
      </div>
    </div>

    {/* 26 Sentits Barcelona */}
    <div className="sm-card">
      <span className="sm-badge-year">Barcelona</span>
      <div className="sm-card-logo icon-mode">
        <Sparkles size={32} color="#d9825b" />
      </div>
      <div className="sm-card-details">
        <h4>26 Sentits Barcelona</h4>
        <p>Espacio multidisciplinar de terapia e intervención infantil.</p>
      </div>
    </div>

    {/* Naxum Barcelona */}
    <div className="sm-card">
      <span className="sm-badge-year">Barcelona</span>
      <div className="sm-card-logo icon-mode">
        <Stethoscope size={32} color="#d9825b" />
      </div>
      <div className="sm-card-details">
        <h4>Naxum Barcelona</h4>
        <p>Atención clínica especializada en logopedia.</p>
      </div>
    </div>

  </div>
</div>

      </section>

    </div>
  );
}

export default SobreMi;