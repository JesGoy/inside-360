"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/punta-arenas/FaroSanIsidro_360.webp",
    imageMin: "/images/punta-arenas/FaroSanIsidro_m.webp",
    name: "Faro San Isidro",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/punta-arenas/HitoMitadDeChile_3_360.webp",
    imageMin:"/images/punta-arenas/HitoMitadDeChile_3_m.webp",
    name: "Hito mitad de Chile",
  },
];

const PuntaArenasPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Punta Arenas"}></WelcomePage>
  );
};

export default PuntaArenasPage;
