import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logoBlanco from "../assets/imagenes-navbar/logo-jenny-blanco.png";
import logoOscuro from "../assets/imagenes-navbar/logo-jenny-oscuro.png";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa móvil
  const [scrolled, setScrolled] = useState(false); // Estado para la transparencia al hacer scroll

  // Efecto para detectar el desplazamiento de la página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <span> +34 632 24 13 67</span>
          <span> contacto.jennymoscol@gmail.com</span>
        </div>
        <div className="topbar-right">
          <span>ES</span>
        </div>
      </div>

      {/* Se añade dinámicamente la clase 'scrolled' según el estado */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo">
            <Link to="/" onClick={closeAll} className="logo-link">
              
              {/* Logo Blanco (Visible arriba cuando el fondo es oscuro/transparente) */}
              <img 
                src={logoBlanco} 
                alt="Jenny Moscol Logopeda" 
                className="logo-img logo-blanco" 
              />

              {/* Logo Oscuro (Visible al bajar cuando el fondo es blanco) */}
              <img 
                src={logoOscuro} 
                alt="Jenny Moscol Logopeda" 
                className="logo-img logo-oscuro" 
              />

              <div className="logo-text">
                <h2>Jenny Moscol</h2>
                <span>LOGOPEDA</span>
              </div>
            </Link>
          </div>

          {/* Botón Hamburguesa para Móvil */}
          <button 
            className={`menu-toggle ${menuOpen ? "active" : ""}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú de navegación"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <NavLink to="/" onClick={closeAll}>INICIO</NavLink>
            </li>
            <li>
              <NavLink to="/sobre-mi" onClick={closeAll}>SOBRE MI</NavLink>
            </li>

            {/* Menú Desplegable con eventos seguros */}
            <li 
              className="nav-item-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className="nav-dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                SERVICIOS <span>▾</span>
              </button>

              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/servicios/logopedia infantil" onClick={closeAll}>
                      LOGOPEDIA INFANTIL
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/logopedia jovenes y adultos" onClick={closeAll}>
                      LOGOP. JOVENES Y ADULTOS
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/logopedia online" onClick={closeAll}>
                      LOGOPEDIA ONLINE
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/logopedia a domicilio" onClick={closeAll}>
                      LOGOPEDIA A DOMICILIO
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/metodologia" onClick={closeAll}>METODOLOGIA</NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={closeAll}>BLOG</NavLink>
            </li>
            <li>
              <NavLink to="/contacto" onClick={closeAll}>CONTACTO</NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

Navbar.displayName = "Navbar";
export default Navbar;