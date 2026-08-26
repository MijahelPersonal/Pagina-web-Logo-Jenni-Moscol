import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

import heroImg from "../assets/imagenes-inicio/hero-logopeda.jpg";
import foto1 from "../assets/imagenes-inicio/imagen-1.jpg";
import foto2 from "../assets/imagenes-inicio/imagen-2.jpg";
import foto3 from "../assets/imagenes-inicio/imagen-3.jpg";
import foto4 from "../assets/imagenes-inicio/imagen-4.jpg";
import foto5 from "../assets/imagenes-inicio/imagen-5.jpg";
import card1 from "../assets/imagenes-inicio/card1.jpg";
import card2 from "../assets/imagenes-inicio/card2.jpg";
import card3 from "../assets/imagenes-inicio/card3.jpg";
import card4 from "../assets/imagenes-inicio/card4.jpg";
import ter1 from "../assets/imagenes-inicio/terapia1.jpg";
import ter2 from "../assets/imagenes-inicio/terapia2.jpg";
import ter3 from "../assets/imagenes-inicio/terapia3.jpg";

function Inicio() {
  const especialidades = [
    "Habla y Lenguaje",
    "Motricidad Orofacial",
    "Voz",
    "Deglución"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Referencia para controlar el scroll del carrusel
  const serviciosRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % especialidades.length);
        setFade(true);
      }, 300);

    }, 3000);

    return () => clearInterval(timer);
  }, [especialidades.length]);

  // Fotos para la sección Filosofía / Sobre Mí
  const photos = [ter1, ter2, ter3];
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="inicio-container">

      {/* ===========================
          1. HERO SECTION
      =========================== */}
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-container-inner">
          
          <div className="hero-content">
            <span className="hero-subtitle">
              TECNÓLOGO MÉDICO EN T. DE LENGUAJE (PERÚ) - LOGOPEDA (ESPAÑA)
            </span>

            <h1>
              Terapia especializada en: <br/>
              <span className={`typing-text ${fade ? "fade-in" : "fade-out"}`}>
                {especialidades[index]}
              </span>
            </h1>

            <div className="hero-buttons">
              <a href="#servicios" className="btn-hero">
                ¿Quieres conocer más?
              </a>
            </div>
          </div>

          {/* Redes Sociales con SVG Transparentes */}
          <div className="hero-socials-lateral">
            <div className="hero-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===========================
          2. WAVE DIVIDER
      =========================== */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="wave-back" d="M0,40 C320,160 800,-20 1440,100 L1440,200 L0,200 Z" />
          <path className="wave-mid" d="M0,110 C480,-10 960,170 1440,60 L1440,200 L0,200 Z" />
          <path className="wave-front" d="M0,80 C360,180 1080,20 1440,110 L1440,200 L0,200 Z" />
        </svg>
      </div>

{/* ===========================
    3. FILOSOFÍA / PROPUESTA DE VALOR (PARA LA PÁGINA DE INICIO)
=========================== */}
<section className="mini-about" id="sobre-mi">
  <div className="about-content-wrapper">
    
    {/* COLUMNA IZQUIERDA: ENFOQUE DE INICIO / SOLUCIONES */}
    <div className="about-text">
      <span className="about-subtitle">MI COMPROMISO</span>
      <h2>Potenciamos la comunicación y el desarrollo del lenguaje</h2>
      
      <p className="about-paragraph-main">
        Cada persona aprende, comunica y se expresa de manera única. Mi propósito es brindar un acompañamiento 
        terapéutico que transforme las dificultades en herramientas de confianza para la vida diaria, 
        ya sea en niños que están iniciando su habla o adultos que buscan recuperar su comunicación.
      </p>

      <div className="about-features-grid">
        <div className="about-feature-item">
          <span className="feature-bullet">✦</span>
          <p><strong>Evaluación e Intervención Integral:</strong> Estrategias diseñadas según las necesidades reales del paciente.</p>
        </div>
        <div className="about-feature-item">
          <span className="feature-bullet">✦</span>
          <p><strong>Riesgo Cero en Casa:</strong> Guías y pautas prácticas para que la familia acompañe el progreso día a día.</p>
        </div>
        <div className="about-feature-item">
          <span className="feature-bullet">✦</span>
          <p><strong>Sesiones Dinámicas y Motivadoras:</strong> Métodos interactivos que mantienen el interés y aceleran el avance.</p>
        </div>
        <div className="about-feature-item">
          <span className="feature-bullet">✦</span>
          <p><strong>Respaldo Profesional Oficial:</strong> Atención liderada por una Tecnóloga Médica en Terapia de Lenguaje y Logopeda en España.</p>
        </div>
      </div>
    </div>

    {/* COLUMNA DERECHA: TARJETA DE GALERÍA FLOTANTE */}
    <div className="about-image-container">
      <div className="about-card-wrapper">
        <div className="about-slider-frame">
          {photos.map((photo, indexPhoto) => (
            <img
              key={indexPhoto}
              src={photo}
              alt={`Terapia ${indexPhoto + 1}`}
              className={`slider-img ${indexPhoto === currentPhoto ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>

  </div>
</section>

      {/* ===========================
          4. MANIFIESTO + MARQUEE
      =========================== */}
      <section className="manifesto">
        <div className="manifesto-content">
          <h2>Potenciamos la Comunicación y el Lenguaje</h2>
          <p>
            A través de evaluaciones, terapias y orientación familiar, creo espacios donde cada persona pueda desarrollar sus habilidades comunicativas con seguridad y confianza.
          </p>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {[foto1, foto2, foto3, foto4, foto5, foto1, foto2, foto3, foto4, foto5].map((img, idx) => (
              <div className="marquee-item" key={idx}>
                <img src={img} alt={`Logopedia foto ${idx}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="scroll-button">↓</button>
      </section>


      {/* ===========================
          5. SERVICIOS ESPECIALIZADOS
      =========================== */}
      <section className="servicios-seccion" id="servicios">
        <h2>Nuestros Servicios</h2>
        
        <div className="servicios-carousel-wrapper">
          <div className="servicios-ref-cards-container" ref={serviciosRef}>
            
            {/* Card 1: Infantil */}
            <Link to="/servicios/logopedia infantil" className="service-ref-card">
              <img src={card1} alt="Terapia de Lenguaje Infantil" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Infantil</h3>
                <p className="card-ref-description">Tratamos los diversos problemas de habla, lenguaje y articulación en los más pequeños.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </Link>

            {/* Card 2: Adultos */}
            <Link to="/servicios/logopedia jovenes y adultos" className="service-ref-card">
              <img src={card2} alt="Terapia para Jovenes y Adultos" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Jovenes y adultos</h3>
                <p className="card-ref-description">Nunca es tarde para tratar las dificultades en la comunicación, habla, voz y deglución.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </Link>

            {/* Card 3: Online */}
            <Link to="/servicios/logopedia online" className="service-ref-card">
              <img src={card3} alt="Terapia del Lenguaje Online" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Online</h3>
                <p className="card-ref-description">Adaptamos nuestras sesiones presenciales para obtener el mismo resultado de manera virtual.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </Link>

            {/* Card 4: Domicilio */}
            <Link to="/servicios/logopedia a domicilio" className="service-ref-card">
              <img src={card4} alt="Atención Presencial a Domicilio" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia a Domicilio</h3>
                <p className="card-ref-description">Acercamos nuestras evaluaciones y tratamientos a la comodidad de tu lugar de residencia.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Inicio;