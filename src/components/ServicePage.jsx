import '../views/Servicios.css';
import ResponsiveImage from './ResponsiveImage.jsx';

export default function ServicePage({heroImg, title, highlight, description, sections, subtitle = 'Servicios · Jenny Moscol', heroAction = 'Agendar Cita', contactPrompt, contactAction = 'Contáctanos'}) {
  return (
    <div className="service-page-wrapper">
      {/* 1. HERO SECTION ESTILO INICIO CON IMAGEN DE FONDO */}
      <section 
        className="service-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="service-hero-container-inner">
          <div className="service-hero-content">
            <span className="service-hero-subtitle">{subtitle}</span>
            <h1>{title}{highlight && <span className="service-highlight-word">{highlight}</span>}</h1>
            <p>
              {description}
            </p>
            <div className="service-hero-buttons">
              <a href="/contacto#contacto-formulario" className="service-btn-hero">
                {heroAction}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER EXACTO AL DE INICIO */}
      <div className="service-wave-divider">
        <svg aria-hidden="true" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="service-wave-back" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="service-wave-mid" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,192C672,192,768,160,864,160C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path className="service-wave-front" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* SECCIÓN PRINCIPAL: BLOQUES EN ZIG-ZAG */}
      <section className="service-main-container">
        <div className="service-grid-list">
          {sections.map((sec, idx) => (
            <div 
              key={idx} 
              className={`service-block-row ${idx % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="service-info-col">
                <div className="service-title-group">
                  <span className="service-num">{sec.num}</span>
                  <h2>{sec.titulo}</h2>
                </div>
                <ul className="service-items-list">
                  {sec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-img-col">
                {sec.imgUrl ? (
                  <ResponsiveImage src={sec.imgUrl} alt={sec.alt} sizes="(max-width: 900px) 100vw, 45vw" />
                ) : (
                  <div className="service-placeholder">
                    <span>📷 Coloca la imagen descargada</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN AL FINAL DIRIGIDO AL FORMULARIO DE CONTACTO */}
        <div className="service-action-footer" id="contacto">
          <p>{contactPrompt}</p>
          <a href="/contacto#contacto-formulario" className="service-btn-contact">
            {contactAction}
          </a>
        </div>
      </section>
    </div>
  );
}
