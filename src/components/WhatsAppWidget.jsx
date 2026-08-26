import React, { useState, useEffect } from "react";
import "./WhatsAppWidget.css";

function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppIcon, setShowWhatsAppIcon] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Cambia cada 30 segundos
    const timer = setInterval(() => {
      setAnimating(true); // Activa la animación de salida
      setTimeout(() => {
        setShowWhatsAppIcon((prev) => !prev);
        setAnimating(false); // Activa la animación de entrada
      }, 300); // Duración de la transición intermedia
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="whatsapp-widget-container">
      {isOpen && (
        <div className="whatsapp-chat-box">
          <div className="whatsapp-chat-header">
            <span>El Whatsapp de Jenny</span>
            <button className="whatsapp-close-btn" onClick={toggleChat} aria-label="Cerrar chat">
              &times;
            </button>
          </div>

          <div className="whatsapp-chat-body">
            <div className="whatsapp-message-bubble">
              <p>Hola!<br />¿En qué puedo ayudarte?</p>
            </div>

            <a
              href="https://wa.me/34632241367?text=Hola,%20necesito%20más%20información%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-send-btn"
            >
              <span>Abrir chat</span>
              <div className="whatsapp-icon-wrapper">
                {showWhatsAppIcon ? (
                  <svg className={`whatsapp-icon-animated ${animating ? "slide-out" : "slide-in"}`} viewBox="0 0 32 32" width="22" height="22" fill="#ffffff">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.735 5.48 2.022 7.794L.526 30.655l7.078-1.856A15.908 15.908 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.457 0-4.755-.672-6.721-1.84l-.482-.29-4.99 1.309 1.332-4.858-.314-.502A13.266 13.266 0 012.667 16C2.667 8.64 8.64 2.667 16 2.667S29.333 8.64 29.333 16 23.36 29.333 16 29.333zm7.48-9.923c-.41-.205-2.428-1.198-2.804-1.334-.376-.137-.65-.205-.923.205-.274.41-1.06 1.334-1.299 1.605-.24.273-.479.308-.889.103s-1.733-.639-3.303-2.039c-1.222-1.09-2.046-2.435-2.286-2.845-.24-.41-.026-.632.18-.838.185-.183.41-.479.615-.719.205-.24.274-.41.41-.684.137-.274.068-.513-.034-.719-.103-.205-.923-2.224-1.265-3.045-.333-.797-.674-.689-.923-.701l-.787-.015c-.274 0-.719.103-1.095.513s-1.435 1.402-1.435 3.42 1.47 3.966 1.675 4.24c.205.274 2.88 4.397 6.979 6.164.975.421 1.736.672 2.329.86 1.002.318 1.913.273 2.632.165.811-.121 2.428-.992 2.769-1.951.341-.959.341-1.781.239-1.951-.103-.17-.376-.274-.787-.479z"/>
                  </svg>
                ) : (
                  <svg className={`whatsapp-icon-animated ${animating ? "slide-out" : "slide-in"}`} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </div>
            </a>
          </div>
        </div>
      )}

      <button className="whatsapp-floating-button" onClick={toggleChat} aria-label="Abrir WhatsApp">
        <svg viewBox="0 0 32 32" width="34" height="34" fill="#ffffff">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.735 5.48 2.022 7.794L.526 30.655l7.078-1.856A15.908 15.908 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.457 0-4.755-.672-6.721-1.84l-.482-.29-4.99 1.309 1.332-4.858-.314-.502A13.266 13.266 0 012.667 16C2.667 8.64 8.64 2.667 16 2.667S29.333 8.64 29.333 16 23.36 29.333 16 29.333zm7.48-9.923c-.41-.205-2.428-1.198-2.804-1.334-.376-.137-.65-.205-.923.205-.274.41-1.06 1.334-1.299 1.605-.24.273-.479.308-.889.103s-1.733-.639-3.303-2.039c-1.222-1.09-2.046-2.435-2.286-2.845-.24-.41-.026-.632.18-.838.185-.183.41-.479.615-.719.205-.24.274-.41.41-.684.137-.274.068-.513-.034-.719-.103-.205-.923-2.224-1.265-3.045-.333-.797-.674-.689-.923-.701l-.787-.015c-.274 0-.719.103-1.095.513s-1.435 1.402-1.435 3.42 1.47 3.966 1.675 4.24c.205.274 2.88 4.397 6.979 6.164.975.421 1.736.672 2.329.86 1.002.318 1.913.273 2.632.165.811-.121 2.428-.992 2.769-1.951.341-.959.341-1.781.239-1.951-.103-.17-.376-.274-.787-.479z"/>
        </svg>
      </button>
    </div>
  );
}

export default WhatsAppWidget;