import React from "react";
import ServicePage from '../components/ServicePage.jsx';

// Importación de imágenes para Servicio 3 (todas .jpg)
const heroImg = '/media/servicio3-hero-servicio3.webp';
const imgServicio1 = '/media/servicio3-imagen-1.webp';
const imgServicio2 = '/media/servicio3-imagen-2.webp';
const imgServicio3 = '/media/servicio3-imagen-3.webp';

function Servicio3() {
  const secciones = [
    {
      num: "01.",
      titulo: "TERAPIA SIN BARRERAS",
      items: [
        "Evaluación e intervención desde la comodidad de tu hogar.",
        "Ideal para quienes tienen agendas ajustadas o movilidad reducida.",
        "Elimina los tiempos y costes de desplazamiento."
      ],
      imgUrl: imgServicio1,
      alt: "Terapia online sin barreras"
    },
    {
      num: "02.",
      titulo: "SESIONES INTERACTIVAS",
      items: [
        "Videollamadas de alta calidad, seguras y confidenciales.",
        "Uso de materiales digitales, dinámicos y totalmente adaptados.",
        "Misma rigurosidad clínica y eficacia que en la consulta presencial."
      ],
      imgUrl: imgServicio2,
      alt: "Sesiones de logopedia online"
    },
    {
      num: "03.",
      titulo: "SEGUIMIENTO Y ASESORAMIENTO",
      items: [
        "Contacto directo y continuo para resolver dudas.",
        "Orientación a las familias para facilitar el trabajo en el hogar.",
        "Envío de pautas y ejercicios complementarios entre sesiones."
      ],
      imgUrl: imgServicio3,
      alt: "Seguimiento de logopedia"
    }
  ];

  return <ServicePage heroImg={heroImg} sections={secciones} {...{"title":"Logopedia Online","subtitle":"Modalidad a Distancia · Jenny Moscol","description":"Ofrezco sesiones interactivas y personalizadas desde cualquier lugar, manteniendo la misma cercanía, eficacia y seguimiento directo que en la consulta presencial.","heroAction":"Agendar Cita Online","contactPrompt":"¿Te gustaría empezar tu proceso terapéutico de forma online?","contactAction":"Contáctame"}} />;
}

export default Servicio3;
