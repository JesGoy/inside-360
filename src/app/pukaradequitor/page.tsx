"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_360.webp",
    imageMin: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_m.webp",
    name: "Pukara de Quitor 1",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_m.webp",
    name: "Pukara de Quitor 2",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_m.webp",
    name: "Pukara de Quitor 3",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/pukara-de-quitor/ValleDeLaLuna_Pukara_199_201_360.webp",
    imageMin:"/images/pukara-de-quitor/ValleDeLaLuna_124_126_m.webp",
    name: "Pukara de Quitor 4",
  },

];

const PukaraDeQuitorPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Pukara de Quitor"}></WelcomePage>
  );
};

export default PukaraDeQuitorPage;
