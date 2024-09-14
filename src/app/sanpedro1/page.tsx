"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_70_72_360.webp",
    imageMin: "/images/valle-de-la-luna/ValleDeLaLuna_70_72_m.webp",
    name: "Mina de sal",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_96_96_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_94_96_m.webp",
    name: "Camino a la mina de sal",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_106_108_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_106_108_m.webp",
    name: "Duna mayor",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_124_126_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_124_126_m.webp",
    name: "Vista a cordillera de la sal",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_360.webp",
    imageMin: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_m.webp",
    name: "Mirador a la cordillera de la sal",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_m.webp",
    name: "Mirador a la cordillera de la sal",
  },

];

const ValleDeLaLunaPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"San Pedro de Atacama  Valle de la Luna"} descriptionPlace="Visita virtualmente los lugares más turísticos de nuestro país."></WelcomePage>
  );
};

export default ValleDeLaLunaPage;
