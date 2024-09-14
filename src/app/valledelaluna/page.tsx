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
    name: "Valle de la Luna 1",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_96_96_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_94_96_m.webp",
    name: "Valle de la Luna 2",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_106_108_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_106_108_m.webp",
    name: "Valle de la Luna 3",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/valle-de-la-luna/ValleDeLaLuna_124_126_360.webp",
    imageMin:"/images/valle-de-la-luna/ValleDeLaLuna_124_126_m.webp",
    name: "Valle de la Luna 4",
  },

];

const ValleDeLaLunaPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Valle de la Luna"}></WelcomePage>
  );
};

export default ValleDeLaLunaPage;
