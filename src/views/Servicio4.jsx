import React from "react";
import ServicePage from '../components/ServicePage.jsx';
const heroImg = '/media/servicio4-hero-servicio4.webp';
const imgServicio1 = '/media/servicio4-imagen-1.webp';
const imgServicio2 = '/media/servicio4-imagen-2.webp';
const imgServicio3 = '/media/servicio4-imagen-3.webp';

function Servicio4() {
  const secciones = [
    {
      num: "01.",
      titulo: "ATENCIÓN EN EL HOGAR",
      items: [
        "Evaluación logopédica inicial en un entorno familiar y cercano.",
        "Mayor comodidad para pacientes con movilidad reducida o agendas ajustadas.",
        "Menor nivel de estrés y ansiedad al encontrarse en un espacio conocido."
      ],
      imgUrl: imgServicio1,
      alt: "Terapia logopédica a domicilio"
    },
    {
      num: "02.",
      titulo: "FASE DE INTERVENCIÓN",
      items: [
        "Sesiones individualizadas enfocadas en objetivos reales del día a día.",
        "Uso de objetos y espacios cotidianos para potenciar el aprendizaje funcional.",
        "Orientación directa a la familia durante todo el proceso terapéutico."
      ],
      imgUrl: imgServicio2,
      alt: "Intervención en casa"
    },
    {
      num: "03.",
      titulo: "COMODIDAD Y CONFIANZA",
      items: [
        "Desplazamiento directo a tu domicilio sin preocupaciones de tráfico o esperas.",
        "Ambiente óptimo y relajado para los más pequeños o adultos mayores.",
        "Adaptación total de la sesión a las rutinas diarias del paciente."
      ],
      imgUrl: imgServicio3,
      alt: "Comodidad en logopedia a domicilio"
    }
  ];

  return <ServicePage heroImg={heroImg} sections={secciones} {...{"title":"Logopedia a Domicilio","subtitle":"MODALIDAD PRESENCIAL EN CASA · Jenny Moscol","description":"Llevo la terapia directamente a tu entorno habitual, ofreciendo una atención totalmente personalizada para facilitar la comodidad y la adaptación al hogar.","heroAction":"Agendar Cita a Domicilio","contactPrompt":"¿Te interesa recibir atención logopédica directamente en casa?","contactAction":"Contáctame"}} />;
}

export default Servicio4;
