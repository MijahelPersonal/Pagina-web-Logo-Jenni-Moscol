import React from "react";
import ServicePage from '../components/ServicePage.jsx';

// Importación de las 7 imágenes para Servicio 2
import heroImgAsset from "../assets/imagenes-servicio2/hero-servicio2.jpg";
const heroImg = heroImgAsset.src;
import imgServicio1Asset from "../assets/imagenes-servicio2/imagen-1.jpg";
const imgServicio1 = imgServicio1Asset.src;
import imgServicio2Asset from "../assets/imagenes-servicio2/imagen-2.jpg";
const imgServicio2 = imgServicio2Asset.src;
import imgServicio3Asset from "../assets/imagenes-servicio2/imagen-3.jpg";
const imgServicio3 = imgServicio3Asset.src;
import imgServicio4Asset from "../assets/imagenes-servicio2/imagen-4.png";
const imgServicio4 = imgServicio4Asset.src;
import imgServicio5Asset from "../assets/imagenes-servicio2/imagen-5.png";
const imgServicio5 = imgServicio5Asset.src;
import imgServicio6Asset from "../assets/imagenes-servicio2/imagen-6.png";
const imgServicio6 = imgServicio6Asset.src;

function Servicio2() {
  const secciones = [
    {
      num: "01.",
      titulo: "LENGUAJE Y HABLA",
      items: [
        "Trastorno de los sonidos del habla (TSH)",
        "Trastorno del desarrollo del lenguaje (TDL)",
        "Trastorno de la comunicación no especificado",
        "Trastorno de la fluidez (tartamudez)"
      ],
      imgUrl: imgServicio1,
      alt: "Lenguaje y habla en adultos"
    },
    {
      num: "02.",
      titulo: "NEURODESARROLLO",
      items: [
        "Trastorno del espectro autista (TEA)",
        "TDA / TDAH",
        "Cuadro sindrómico",
        "Discapacidad intelectual"
      ],
      imgUrl: imgServicio2,
      alt: "Neurodesarrollo adultos"
    },
    {
      num: "03.",
      titulo: "DIFICULTADES DE APRENDIZAJE",
      items: [
        "Evaluación psicopedagógica",
        "Dificultades de la lectura (dislexia)",
        "Dificultades de la escritura (disgrafía)",
        "Dificultades de cálculo (discalculia)"
      ],
      imgUrl: imgServicio3,
      alt: "Dificultades de aprendizaje en adultos"
    },
    {
      num: "04.",
      titulo: "MOTRICIDAD OROFACIAL",
      items: [
        "Mal posicionamiento lingual",
        "Incompetencia oral anterior",
        "Respiración oral",
        "Tratamiento pre y post ortodoncia",
        "Tratamiento pre y post intervención quirúrgica",
        "Ronquido y apnea del sueño"
      ],
      imgUrl: imgServicio4,
      alt: "Motricidad orofacial adultos"
    },
    {
      num: "05.",
      titulo: "PROBLEMAS DE ALIMENTACIÓN",
      items: [
        "Deglucion disfuncional",
        "Disfagia"
      ],
      imgUrl: imgServicio5,
      alt: "Problemas de alimentación y deglución"
    },
    {
      num: "06.",
      titulo: "VOZ",
      items: [
        "Disfonías funcionales",
        "Disfonía por lesiones adquiridas (nódulos, pólipos, edema de Reinke...)",
        "Disfonía por lesiones congénitas (quiste, sulcus, vergeture...)",
        "Voz profesional"
      ],
      imgUrl: imgServicio6,
      alt: "Tratamiento de la voz"
    }
  ];

  return <ServicePage heroImg={heroImg} sections={secciones} {...{"title":"Logopedia para:","highlight":"Jovenes y Adultos","description":"Ofrezco soluciones para cubrir todas las necesidades relacionadas con el lenguaje, la comunicación, la voz y la deglución en esta etapa de la vida.","contactPrompt":"¿Tienes dudas o necesitas agendar una valoración personalizada?"}} />;
}

export default Servicio2;
