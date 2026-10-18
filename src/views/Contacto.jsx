import { heroStyle } from '../utils/hero-style.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { useState } from "react";
const HeroContacto = '/media/contacto-imagen-1.webp';
const card1 = '/media/contacto-imagen-4.webp';
const card2 = '/media/contacto-imagen-2.webp';
const card3 = '/media/contacto-imagen-3.webp';
const card4 = '/media/contacto-imagen-5.webp';
const imgfor = '/media/contacto-imagen-6.webp';
import "./Contacto.css";

import { User, AtSign, Send } from "lucide-react";

function Contacto() {
  const [cargando, setCargando] = useState(false);
  const [errorEmailReal, setErrorEmailReal] = useState("");
  const [enviadoExito, setEnviadoExito] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [notice, setNotice] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrorEmailReal("");

    const formElement = e.target;
    const formData = new FormData(formElement);
    const emailIngresado = formData.get("email")?.toString().trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailIngresado)) {
      setErrorEmailReal("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch('/api/contacto', {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: challenge ? 'submit' : 'challenge',
          email: emailIngresado,
          nombre: formData.get('nombre'), mensaje: formData.get('mensaje'),
          politica: formData.has('politica'), website: formData.get('website'),
          challengeId: challenge?.id, code: formData.get('code'),
        }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.resetChallenge) { setChallenge(null); setNotice(''); }
        throw new Error(data.error || 'No se pudo procesar la consulta.');
      }
      if (data.ok) {
        setEnviadoExito(true);
      } else {
        setChallenge({ id: data.challengeId, email: emailIngresado });
        setNotice('Te enviamos un código de seis dígitos. Revisa tu bandeja de entrada y spam. Caduca en diez minutos. Tu consulta aún no se ha enviado.');
      }
    } catch (err) {
      setErrorEmailReal(err.name === 'TimeoutError' ? 'La solicitud tardó demasiado. Inténtalo de nuevo.' : err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="contacto-page">

      {/* 1. HERO */}
      <section className="contacto-hero" data-responsive-hero="" style={heroStyle(HeroContacto)}>
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
            <ResponsiveImage src={card1} alt="Apoyo familiar" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Apoyo familiar</h3>
              <p>Orientación para madres, padres y familiares.</p>
            </div>
          </article>

          <article className="historia-card">
            <ResponsiveImage src={card2} alt="Niños en terapia" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Niños</h3>
              <p>Apoyo en lenguaje, comunicación y desarrollo.</p>
            </div>
          </article>

          <article className="historia-card">
            <ResponsiveImage src={card3} alt="Adultos y mayores" className="historia-card-bg" />
            <div className="historia-card-overlay"></div>
            <div className="historia-card-content">
              <h3>Adultos y mayores</h3>
              <p>Atención para fortalecer voz, habla y comunicación.</p>
            </div>
          </article>

          <article className="historia-card">
            <ResponsiveImage src={card4} alt="Formación a profesionales" className="historia-card-bg" />
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
              <form className="formulario-body" onSubmit={manejarEnvio} aria-busy={cargando}>
                <p>Para proteger tu consulta, confirmaremos tu correo con un código antes de enviarla.</p>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="website">Deja este campo vacío</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
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
                        autoComplete="name"
                        minLength={2}
                        maxLength={120}
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
                        autoComplete="email"
                        maxLength={254}
                        readOnly={!!challenge}
                        aria-describedby="contact-status contact-error"
                        required
                      />
                    </div>
                    {errorEmailReal && (
                      <span id="contact-error" role="alert" className="error-email-real" style={{ color: "#a12820", fontSize: "14px", marginTop: "5px", display: "block" }}>
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
                    minLength={10}
                    maxLength={5000}
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
                    He leído y acepto la <a href="/politica-de-privacidad">política de privacidad</a>.
                  </label>
                </div>

                <div id="contact-status" role="status" aria-live="polite">{notice}</div>
                {challenge && (
                  <div className="form-group verification-panel">
                    <label htmlFor="code">Código enviado a {challenge.email}</label>
                    <input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} placeholder="000000" required />
                    <button type="button" className="verification-reset" disabled={cargando} onClick={() => { setChallenge(null); setNotice(''); setErrorEmailReal(''); }}>Cambiar correo o solicitar otro código</button>
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn-formulario" 
                  disabled={cargando}
                >
                  <span>
                    {cargando ? 'Procesando…' : challenge ? 'Confirmar y enviar consulta' : 'Recibir código de confirmación'}
                  </span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>

          <div className="met-about-image-container">
            <div className="met-about-card-wrapper">
              <div className="met-about-slider-frame">
                <ResponsiveImage 
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
