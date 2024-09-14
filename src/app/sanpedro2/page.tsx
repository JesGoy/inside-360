"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";


const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_m.webp",
    name: "Camino a San Pedro de Atacama",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_199_201_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_Pukara_199_201_m.webp",
    name: "Pucará de Quitor",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_360.webp",
    imageMin: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_m.webp",
    name: "Catarpe",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_m.webp",
    name: "Catarpe",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_m.webp",
    name: "Entrada a la quebrada Chulacao",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_m.webp",
    name: "Quebrada Chulacao",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_m.webp",
    name: "Quebrada Chulacao",
  },

];

const PukaraDeQuitorPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"San Pedro de Atacama  Pukara de Quitor  Catarpe"} descriptionPlace="Visita virtualmente los lugares más turísticos de nuestro país."></WelcomePage>
  );
};

export default PukaraDeQuitorPage;
