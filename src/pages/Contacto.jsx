import React, { useState } from "react";
import HeroContacto from "../assets/imagenes-contacto/imagen-1.jpg";
import card1 from "../assets/imagenes-contacto/imagen-4.jpg";
import card2 from "../assets/imagenes-contacto/imagen-2.jpg";
import card3 from "../assets/imagenes-contacto/imagen-3.png";
import card4 from "../assets/imagenes-contacto/imagen-5.jpg";
import imgfor from "../assets/imagenes-contacto/imagen-6.jpg";
import "./Contacto.css";

import { User, AtSign, Send } from "lucide-react";

function Contacto() {
  const FORMSPREE_LINK = "https://formspree.io/f/xwlelqbz";

  const [cargando, setCargando] = useState(false);
  const [errorEmailReal, setErrorEmailReal] = useState("");
  const [enviadoExito, setEnviadoExito] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrorEmailReal("");

    const formElement = e.target;
    const formData = new FormData(formElement);
    const emailIngresado = formData.get("email")?.toString().trim();

    // 1. Validar formato básico en el frontend
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailIngresado)) {
      setErrorEmailReal("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setCargando(true);

    try {
      // 2. Consultar a nuestra API Serverless en Vercel (Pasa por el servidor, NO por el navegador -> Cero CORS)
      const resServer = await fetch(`/api/validar?email=${encodeURIComponent(emailIngresado)}`);
      const dataServer = await resServer.json();

      // Si Abstract API determina que el correo NO existe:
      if (!dataServer.esValido) {
        setErrorEmailReal("El correo electrónico ingresado no existe o no puede recibir mensajes.");
        setCargando(false);
        return; // 🛑 Detenemos el envío
      }

      // 3. Si el correo ES REAL, se envía a Formspree
      const respuestaFormspree = await fetch(FORMSPREE_LINK, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (respuestaFormspree.ok) {
        setEnviadoExito(true);
      } else {
        setErrorEmailReal("Ocurrió un problema al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al procesar el formulario:", err);
      setErrorEmailReal("Error al verificar el correo. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contacto-page">

      {/* 1. HERO */}
      <section className="contacto-hero" style={{ backgroundImage: `url(${HeroContacto})` }}>
        <div className="contacto-hero-content">
          <span className="contacto-etiqueta">
            Prevención · Evaluación · Rehabilitación · Estrategias
          </span>
          <h1>Estamos contigo</h1>
          <p>
            Un espacio de escucha y orientación profesional para evaluar, cuidar y potenciar la comunicación de tu familia.
          </p>
          <div className="contacto-hero-buttons">
            <a href="#contacto-formulario" className="btn-hero-contacto">
              Agendar consulta
            </a>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER */}
      <div className="wave-divider-contacto">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="wave-back" d="M0,100 C320,180 800,20 1440,120 L1440,200 L0,200 Z" />
          <path className="wave-mid" d="M0,40 C480,160 960,-10 1440,80 L1440,200 L0,200 Z" />
          <path className="wave-front" d="M0,110 C360,20 1080,180 1440,60 L1440,200 L0,200 Z" />
        </svg>
      </div>

      {/* 3. HISTORIA */}
      <section className="contacto-historia">
        <div className="historia-texto">
          <h2>Un acompañamiento pensado para cada familia</h2>
          <p>
            Sé que cuando una familia busca apoyo pueden aparecer muchas preguntas, dudas e incluso miedo por no saber cómo actuar.
          </p>
          <p>
            Como profesional y como madre, entiendo que detrás de cada consulta existe una persona que necesita sentirse escuchada y acompañada.
          </p>
          <p>
            Mi objetivo es brindar un espacio seguro donde niños, adultos y familias encuentren estrategias adaptadas a sus necesidades.
          </p>
        </div>

        <div className="historia-cards">
          <article className="historia-card">
            <img src={card1} alt="Apoyo familiar" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Apoyo familiar</h3>
              <p>Orientación para madres, padres y familiares.</p>
            </div>
          </article>

          <article className="historia-card">
            <img src={card2} alt="Niños en terapia" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Niños</h3>
              <p>Apoyo en lenguaje, comunicación y desarrollo.</p>
            </div>
          </article>

          <article className="historia-card">
            <img src={card3} alt="Adultos y mayores" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Adultos y mayores</h3>
              <p>Atención para fortalecer voz, habla y comunicación.</p>
            </div>
          </article>

          <article className="historia-card">
            <img src={card4} alt="Formación a profesionales" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Formación a Profesionales</h3>
              <p>Asesoría y pautas prácticas 1 a 1 para docentes y terapeutas</p>
            </div>
          </article>
        </div>
      </section>

      {/* 4. FORMULARIO CON VALIDACIÓN DE ABSTRACT API */}
      <section className="met-about" id="contacto-formulario">
        <div className="met-about-content-wrapper">
          
          <div className="met-about-text">
            <span className="met-about-subtitle">CONTACTO DIRECTO</span>
            <h2>Cuéntame cómo puedo ayudarte</h2>
            <p className="met-about-paragraph-main">
              Escríbeme tu situación sin compromiso. Encontraré la mejor manera de orientarte a ti y a tu familia.
            </p>

            {enviadoExito ? (
              <div className="mensaje-exito-card">
                <div className="exito-icon-wrapper">
                  <Send className="exito-icon" size={32} />
                </div>
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>
                  Gracias por contactarme. He recibido tu consulta correctamente y te responderé en breve.
                </p>
              </div>
            ) : (
              <form className="formulario-body" onSubmit={manejarEnvio}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <div className="input-with-icon">
                      <User className="input-icon" />
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        placeholder="Ej. Jenny"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <div className="input-with-icon">
                      <AtSign className="input-icon" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        required
                      />
                    </div>
                    {errorEmailReal && (
                      <span className="error-email-real" style={{ color: "#d32f2f", fontSize: "13px", marginTop: "5px", display: "block" }}>
                        {errorEmailReal}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">¿En qué puedo ayudarte?</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder="Cuéntame qué necesitas o qué consulta tienes..."
                    required
                  />
                </div>

                <div className="contacto-check">
                  <input 
                    type="checkbox" 
                    id="politica" 
                    name="politica" 
                    required 
                  />
                  <label htmlFor="politica">
                    He leído y acepto la <a href="#politica">política de privacidad</a>.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn-formulario" 
                  disabled={cargando}
                >
                  <span>
                    {cargando ? 'Verificando y enviando...' : 'Enviar mensaje'}
                  </span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>

          <div className="met-about-image-container">
            <div className="met-about-card-wrapper">
              <div className="met-about-slider-frame">
                <img 
                  src={imgfor} 
                  alt="Atención y consulta de logopedia" 
                  className="met-slider-img"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. POLÍTICA DE PRIVACIDAD */}
      <section className="contacto-privacidad">
        <div className="privacidad-container">
          <h2>Política de Privacidad y Protección de Datos</h2>
          <p>
            En cumplimiento de la normativa de protección de datos, te informamos que los 
            datos de carácter personal que nos proporciones a través de este formulario serán 
            tratados de manera confidencial y responsable.
          </p>
          <div className="privacidad-links">
            <a href="/politica-de-privacidad" className="link-privacidad">
              Leer política de privacidad completa →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Contacto;