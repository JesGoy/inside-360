"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_360.webp",
    imageMin: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_m.webp",
    name: "Quitor - Catarpe 1",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_m.webp",
    name: "Quitor - Catarpe 2",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_m.webp",
    name: "Quitor - Catarpe 3",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_m.webp",
    name: "Quitor - Catarpe 4",
  },
  {
    description: "Descripcion del lugar",
    image360: "/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_360.webp",
    imageMin:"/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_m.webp",
    name: "Quitor - Catarpe 5",
  },

];

const PukaraDeQuitorPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Quitor - Catarpe"}></WelcomePage>
  );
};

export default PukaraDeQuitorPage;
