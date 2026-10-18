import { heroStyle } from '../utils/hero-style.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import "./Inicio.css";

const heroImg = '/media/inicio-hero-logopeda.webp';
const foto1 = '/media/inicio-imagen-1.webp';
const foto2 = '/media/inicio-imagen-2.webp';
const foto3 = '/media/inicio-imagen-3.webp';
const foto4 = '/media/inicio-imagen-4.webp';
const foto5 = '/media/inicio-imagen-5.webp';
const card1 = '/media/inicio-card1.webp';
const card2 = '/media/inicio-card2.webp';
const card3 = '/media/inicio-card3.webp';
const card4 = '/media/inicio-card4.webp';
const ter1 = '/media/inicio-terapia1.webp';
const ter2 = '/media/inicio-terapia2.webp';
const ter3 = '/media/inicio-terapia3.webp';

function Inicio() {
  const especialidades = [
    "Habla y Lenguaje",
    "Motricidad Orofacial",
    "Voz",
    "Deglución"
  ];

  const photos = [ter1, ter2, ter3];

  return (
    <div className="inicio-container">

      {/* ===========================
          1. HERO SECTION
      =========================== */}
      <section className="hero" data-responsive-hero="" style={heroStyle(heroImg)}>
        <div className="hero-container-inner">
          
          <div className="hero-content">
            <span className="hero-subtitle">
              TECNÓLOGO MÉDICO EN T. DE LENGUAJE (PERÚ) - LOGOPEDA (ESPAÑA)
            </span>

            <h1>
              Terapia especializada en: <br/>
              <span className="typing-text fade-in specialties-static">
                {especialidades.join(' · ')}
              </span>
            </h1>

            <div className="hero-buttons">
              <a href="#servicios" className="btn-hero">
                ¿Quieres conocer más?
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
        <div className="about-slider-frame" data-carousel="photos" aria-label="Escenas ilustrativas de terapia" data-carousel="photos" aria-label="Escenas ilustrativas de terapia">
          {photos.map((photo, indexPhoto) => (
            <ResponsiveImage
              key={indexPhoto}
              src={photo}
              alt={`Terapia ${indexPhoto + 1}`}
              className={`slider-img ${indexPhoto === 0 ? 'active' : ''}`}
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

        <div className="marquee-container" data-animated-marquee data-animated-marquee>
          <div className="marquee-track">
            {[foto1, foto2, foto3, foto4, foto5].map((img, idx) => (
              <div className="marquee-item" key={idx}>
                <ResponsiveImage src={img} alt={`Logopedia foto ${idx}`} />
              </div>
            ))}
          </div>
        </div>
        <a className="scroll-button" href="#servicios" aria-label="Ver los servicios">↓</a>
      </section>


      {/* ===========================
          5. SERVICIOS ESPECIALIZADOS
      =========================== */}
      <section className="servicios-seccion" id="servicios">
        <h2>Nuestros Servicios</h2>
        
        <div className="servicios-carousel-wrapper">
          <div className="servicios-ref-cards-container">
            
            {/* Card 1: Infantil */}
            <a href="/servicios/logopedia-infantil" className="service-ref-card">
              <ResponsiveImage src={card1} alt="Terapia de Lenguaje Infantil" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Infantil</h3>
                <p className="card-ref-description">Tratamos los diversos problemas de habla, lenguaje y articulación en los más pequeños.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </a>

            {/* Card 2: Adultos */}
            <a href="/servicios/logopedia-jovenes-y-adultos" className="service-ref-card">
              <ResponsiveImage src={card2} alt="Terapia para Jovenes y Adultos" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Jovenes y adultos</h3>
                <p className="card-ref-description">Nunca es tarde para tratar las dificultades en la comunicación, habla, voz y deglución.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </a>

            {/* Card 3: Online */}
            <a href="/servicios/logopedia-online" className="service-ref-card">
              <ResponsiveImage src={card3} alt="Terapia del Lenguaje Online" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia Online</h3>
                <p className="card-ref-description">Adaptamos nuestras sesiones presenciales para obtener el mismo resultado de manera virtual.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </a>

            {/* Card 4: Domicilio */}
            <a href="/servicios/logopedia-a-domicilio" className="service-ref-card">
              <ResponsiveImage src={card4} alt="Atención Presencial a Domicilio" className="card-ref-bg-image" loading="lazy" />
              <div className="card-ref-content">
                <span className="card-ref-category">Servicio</span>
                <h3 className="card-ref-title">Logopedia a Domicilio</h3>
                <p className="card-ref-description">Acercamos nuestras evaluaciones y tratamientos a la comodidad de tu lugar de residencia.</p>
                <span className="btn-saber-mas">Saber más</span>
              </div>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Inicio;
