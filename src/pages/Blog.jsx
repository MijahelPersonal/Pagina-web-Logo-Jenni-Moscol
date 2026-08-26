import React from "react";
import "./Blog.css";
import heroImg from "../assets/imagenes-blog/Blog-4.jpg";
import imgBlog1 from "../assets/imagenes-blog/Blog-1.jpg";
import imgBlog2 from "../assets/imagenes-blog/Blog-2.jpg";
import imgBlog3 from "../assets/imagenes-blog/Blog-3.jpg";

function Blog() {
  const articulos = [
    { 
      id: 1,
      titulo: "Estrategias de Comunicación y Apoyo en Autismo e Infancia",
      categoria: "Para Padres y Psicólogos · Logopedia y Autismo",
      texto1: "El trabajo con niños dentro del Espectro Autista (TEA) requiere herramientas prácticas de apoyo visual, pictogramas y estimulación estructurada.",
      texto2: "Aprende cómo la interacción diaria y las técnicas basadas en evidencia ayudan a desarrollar la comprensión y el habla expresiva.",
      imagen: imgBlog1,
      subimagenTexto: "Niños y Autismo",
      enlaceExterno: "https://leafwingcenter.org/es/autism-communication-strategies/",
      textoBoton: "Leer artículo para padres y psicólogos &rarr;"
    },
    {
      id: 2,
      titulo: "Detección de Trastornos del Lenguaje y Habla en el Aula",
      categoria: "Para Profesores y Educadores · Detección Precoz",
      texto1: "Los docentes son clave para detectar dificultades en la articulación, fluidez, dislalias o retrasos del lenguaje a temprana edad.",
      texto2: "Revisa este manual práctico con pautas claras para identificar señales de alerta escolar y saber cómo orientar a los padres a la consulta logopédica.",
      imagen: imgBlog2,
      subimagenTexto: "Acompañamiento Escolar",
      enlaceExterno: "https://fedema.es/wp-content/uploads/2020/10/MANUALLOGOPEDIA.pdf",
      textoBoton: "Leer manual docente completo &rarr;"
    },
    {
      id: 3,
      titulo: "Terapia de Deglución y Rehabilitación de Disfagia en Adultos",
      categoria: "Para Neurólogos y Otorrinolaringólogos · Área Adultos",
      texto1: "La disfagia y la afasia tras un evento cerebrovascular o neurodegenerativo requieren intervención en postura, movilidad laringea y consistencia de alimentos.",
      texto2: "Conoce los ejercicios motores orales, cambios posturales y estrategias de seguridad digestiva avalados por terapeutas del habla.",
      imagen: imgBlog3,
      subimagenTexto: "Disfagia y Afasia",
      enlaceExterno: "https://thevozinstitute.com/es/terapia-del-habla-para-adultos-con-disfagia/",
      textoBoton: "Consultar guía clínica de disfagia &rarr;"
    },
    {
      id: 4,
      titulo: "Trastorno del Desarrollo del Lenguaje (TDL): Enfoque Familiar",
      categoria: "Para Psicólogos y Logopedas · Evaluación e Intervención",
      texto1: "El TDL es una condición neurológica que afecta cómo el cerebro procesa las reglas del lenguaje sin estar asociado a pérdidas auditivas.",
      texto2: "Descubre un modelo de intervención donde los logopedas capacitan a las familias para ser los motores de la estimulación lingüística en casa.",
      imagen: imgBlog1,
      subimagenTexto: "Diagnóstico TDL",
      enlaceExterno: "https://institutoraimongaja.com/blog/tdl-en-logopedia-diagnostico-e-intervencion-familiar-guia-practica",
      textoBoton: "Leer guía práctica de TDL &rarr;"
    },
    {
      id: 5,
      titulo: "Salud Vocal y Prevención de Disfonías en Docentes",
      categoria: "Para Profesores y Otorrinolaringólogos · Higiene Vocal",
      texto1: "El uso prolongado de la voz en ambientes ruidosos causa fatiga cordal, nódulos y lesiones recurrentes en educadores y ponentes.",
      texto2: "Recomendaciones médicas de fonoaudiología para la hidratación, técnica vocal, calentamiento y cuidado de las cuerdas vocales.",
      imagen: imgBlog2,
      subimagenTexto: "Salud Vocal",
      enlaceExterno: "https://www.ucsf.edu.ar/manejo-y-prevencion-de-la-voz-en-los-docentes/",
      textoBoton: "Leer recomendaciones de salud vocal &rarr;"
    }
  ];

  return (
    <div className="blog-page-container-page">

      {/* ===========================
          1. HERO SECTION (ESTILO SRV1)
      =========================== */}
      <section className="blog-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="blog-hero-container-inner">
          <div className="blog-hero-content">
            <span className="blog-hero-subtitle">
              Artículos · Guías · Consejos profesionales
            </span>
            <h1>
              Blog y Recursos para Familias
            </h1>
            <p>
              Artículos prácticos, guías y consejos profesionales explicados de corazón a corazón, para acompañarte en cada etapa.
            </p>
            <div className="blog-hero-buttons">
              <a href="#lista-articulos" className="blog-btn-hero">
                Leer artículos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          2. WAVE DIVIDER (BLOG)
      =========================== */}
      <div className="blog-wave-container">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="blog-wave-layer-back" d="M0,40 C320,160 800,-20 1440,100 L1440,200 L0,200 Z" />
          <path className="blog-wave-layer-mid" d="M0,110 C480,-10 960,170 1440,60 L1440,200 L0,200 Z" />
          <path className="blog-wave-layer-front" d="M0,80 C360,180 1080,20 1440,110 L1440,200 L0,200 Z" />
        </svg>
      </div>

      {/* ===========================
          3. ARTÍCULOS ESTILO "MI HISTORIA"
      =========================== */}
      <div className="blog-page-list-section" id="lista-articulos">
        {articulos.map((art, index) => (
          <section className={`blog-page-row-item ${index % 2 === 1 ? "reverse" : ""}`} key={art.id}>
            
            {/* Texto explicativo */}
            <div className="blog-page-row-text">
              <span className="blog-page-row-category">{art.categoria}</span>
              <h2>{art.titulo}</h2>
              <p>{art.texto1}</p>
              <p>{art.texto2}</p>
              
              <a 
                href={art.enlaceExterno} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="blog-page-row-link"
                dangerouslySetInnerHTML={{ __html: art.textoBoton }}
              />
            </div>

            {/* Tarjeta con imagen local */}
            <div className="blog-page-row-image-container">
              <div className="blog-page-image-card-box">
                <div className="blog-page-image-card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <img src={art.imagen} alt={art.titulo} loading="lazy" />
                <div className="blog-page-image-card-caption">
                  <h4>{art.subimagenTexto}</h4>
                  <p>Lectura recomendada</p>
                </div>
              </div>
            </div>

          </section>
        ))}
      </div>

    </div>
  );
}

export default Blog;