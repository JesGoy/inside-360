"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_044_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_044_m.webp",
    name: "Rapa nui 1",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_061_360.webp",
    imageMin:"/images/isla-de-pascua/IslaDePascua_061_m.webp",
    name: "Rapa nui 2",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_064_360.webp",
    imageMin:"/images/isla-de-pascua/IslaDePascua_064_m.webp",
    name: "Rapa nui 3",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_189_191_360.webp",
    imageMin:"/images/isla-de-pascua/IslaDePascua_189_191_m.webp",
    name: "Rapa nui 4",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/isla-de-pascua/IslaDePascua_194_196_360.webp",
    imageMin:"/images/isla-de-pascua/IslaDePascua_194_196_m.webp",
    name: "Rapa nui 4",
  },
];

const RapanuiPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Rapa nui"}></WelcomePage>
  );
};

export default RapanuiPage;
