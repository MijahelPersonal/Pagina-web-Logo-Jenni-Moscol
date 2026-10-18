import { heroStyle } from '../utils/hero-style.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import React from "react";
import "./Metodologia.css";
const heroImg = '/media/metodologia-hero-metodologias.webp';
const imgMetodologia1 = '/media/metodologia-imagen-1.webp';

function Metodologia() {
  const puntos = [
    {
      bullet: "01",
      title: "EVALUACIÓN INICIAL ESPECIALIZADA",
      text: "Diagnóstico preciso con pruebas estandarizadas para niños, jóvenes y adultos"
    },
    {
      bullet: "02",
      title: "PLAN DE TERAPIA PERSONALIZADO",
      text: "Estrategias a medida adaptadas al ritmo, colegio, trabajo y vida diaria"
    },
    {
      bullet: "03",
      title: "RESPALDO PROFESIONAL Y CIENTÍFICO",
      text: "Tecnología médica y logopedia basada en la evidencia con material moderno"
    },
    {
      bullet: "04",
      title: "AMBIENTE CÁLIDO Y DE CONFIANZA",
      text: "Aprendizaje lúdico para niños y atención empática para jóvenes y adultos"
    },
    {
      bullet: "05",
      title: "ORIENTACIÓN CONSTANTE A LA FAMILIA",
      text: "Pautas sencillas y acompañamiento directo para reforzar en el hogar"
    },
    {
      bullet: "06",
      title: "SEGUIMIENTO DE LOGROS Y ALTA",
      text: "Medición de avances periódicos hasta lograr una comunicación autónoma"
    }
  ];

  return (
    <div className="metodologia-page">
      {/* 1. HERO SECTION */}
      <section 
        className="met-hero" 
        data-responsive-hero="" style={heroStyle(heroImg)}
      >
        <div className="met-hero-container-inner">
          <div className="met-hero-content">
            <span className="met-hero-subtitle">CÓMO TRABAJAMOS</span>
            <h1>Mi Metodología</h1>
            <p>
              Especialidad médica, enfoque en Logopedia y la calidez que tu familia necesita. 
              Acompaño a niños, jóvenes y adultos a expresarse con claridad y seguridad.
            </p>
            <div className="met-hero-buttons">
              <a href="#metodologia-detalle" className="met-btn-hero">
                Conocer el proceso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER */}
      <div className="met-wave-divider">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="met-wave-back" d="M0,40 C320,160 800,-20 1440,100 L1440,200 L0,200 Z" />
          <path className="met-wave-mid" d="M0,110 C480,-10 960,170 1440,60 L1440,200 L0,200 Z" />
          <path className="met-wave-front" d="M0,80 C360,180 1080,20 1440,110 L1440,200 L0,200 Z" />
        </svg>
      </div>

      {/* 3. SECCIÓN DE PUNTOS METODOLÓGICOS */}
      <section className="met-about" id="metodologia-detalle">
        <div className="met-about-content-wrapper">
          
          {/* COLUMNA IZQUIERDA: PUNTOS CON PALABRAS CLAVE */}
          <div className="met-about-text">
            <span className="met-about-subtitle">NUESTRA FORMA DE TRABAJAR</span>
            <h2>Un proceso claro, paso a paso</h2>
            <p className="met-about-paragraph-main">
              Conocimiento en salud y trato humano para lograr mejoras reales en la comunicación de tu familia.
            </p>

            <div className="met-about-features-grid">
              {puntos.map((item, index) => (
                <div key={index} className="met-about-feature-item">
                  <span className="met-feature-bullet">{item.bullet}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: FOTO LOCAL */}
          <div className="met-about-image-container">
            <div className="met-about-card-wrapper">
              <div className="met-about-slider-frame">
                <ResponsiveImage 
                  src={imgMetodologia1} 
                  alt="Metodología de trabajo en terapia del lenguaje" 
                  className="met-slider-img"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Metodologia;