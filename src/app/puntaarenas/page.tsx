"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";

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
  const [start, setStart] = useState(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <button onClick={() => setStart(true)}> Comenzar </button>
  );
};

export default PuntaArenasPage;
