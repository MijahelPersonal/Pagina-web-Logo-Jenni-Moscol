import React from "react";
import ServicePage from '../components/ServicePage.jsx';
const heroImg = '/media/servicio1-hero-servicio1.webp';
const imgServicio1 = '/media/servicio1-imagen-1.webp';
const imgServicio2 = '/media/servicio1-imagen-2.webp';
const imgServicio3 = '/media/servicio1-imagen-3.webp';
const imgServicio4 = '/media/servicio1-imagen-4.webp';
import imgServicio5Asset from "../assets/imagenes-servicio1/imagen-5.jpg";
const imgServicio5 = imgServicio5Asset.src;
import imgServicio6Asset from "../assets/imagenes-servicio1/imagen-6.png";
const imgServicio6 = imgServicio6Asset.src;

function Servicio1() {
  const secciones = [
    {
      num: "01.",
      titulo: "LENGUAJE Y HABLA",
      items: [
        "Atención temprana",
        "Retrasos del lenguaje",
        "Trastorno de los sonidos del habla (TSH)",
        "Trastorno del desarrollo del lenguaje (TDL)",
        "Trastorno de la comunicación no especificado",
        "Trastorno de la fluidez (tartamudez)"
      ],
      imgUrl: imgServicio1,
      alt: "Lenguaje y habla infantil"
    },
    {
      num: "02.",
      titulo: "NEURODESARROLLO INFANTIL",
      items: [
        "Trastorno generalizado del desarrollo (TGD)",
        "Trastorno del espectro autista (TEA)",
        "TDA / TDAH",
        "Cuadro sindrómico",
        "Discapacidad intelectual"
      ],
      imgUrl: imgServicio2,
      alt: "Neurodesarrollo infantil"
    },
    {
      num: "03.",
      titulo: "DIFICULTADES DE APRENDIZAJE",
      items: [
        "Evaluación psicopedagógica",
        "Dificultades de la lectura (dislexia)",
        "Dificultades de la escritura (disgrafía)",
        "Dificultades de cálculo (discalculia)",
        "Retraso en el aprendizaje de la lectura",
        "Retraso en el aprendizaje de la escritura"
      ],
      imgUrl: imgServicio3,
      alt: "Dificultades de aprendizaje"
    },
    {
      num: "04.",
      titulo: "MOTRICIDAD OROFACIAL",
      items: [
        "Mal posicionamiento lingual",
        "Incompetencia oral anterior",
        "Respiración oral",
        "Tratamiento pre y post ortodoncia",
        "Frenillo lingual"
      ],
      imgUrl: imgServicio4,
      alt: "Motricidad orofacial infantil"
    },
    {
      num: "05.",
      titulo: "PROBLEMAS DE ALIMENTACIÓN",
      items: [
        "Deglución disfuncional",
        "Disfagia"
      ],
      imgUrl: imgServicio5,
      alt: "Problemas de alimentación infantil"
    },
    {
      num: "06.",
      titulo: "VOZ",
      items: [
        "Disfonía infantil"
      ],
      imgUrl: imgServicio6,
      alt: "Voz infantil"
    }
  ];

  return <ServicePage heroImg={heroImg} sections={secciones} {...{"title":"Logopedia Infantil","description":"Estoy comprometida en ayudar a los niños a superar dificultades en el lenguaje, la audición y el aprendizaje mediante evaluaciones y tratamientos totalmente personalizados.","contactPrompt":"¿Tienes dudas o necesitas agendar una primera valoración?"}} />;
}

export default Servicio1;
