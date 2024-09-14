"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_189_191_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_189_191_m.webp",
    name: "Ahu Tongariki",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_044_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_044_m.webp",
    name: "Ahu Ko Te Riku",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_061_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_061_m.webp",
    name: "Playa Anakena",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_064_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_064_m.webp",
    name: "Orilla de playa Anakena",
  },

  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_194_196_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_194_196_m.webp",
    name: "Mirador al volcán Rano Kau",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_062_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_062_m.webp",
    name: "Ahu Nau Nau",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_045_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_045_m.webp",
    name: "Complejo Taha",
  },
];

const RapanuiPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Isla de Pascua"} descriptionPlace="Visita virtualmente los lugares más turísticos de nuestro país."></WelcomePage>
  );
};

export default RapanuiPage;
