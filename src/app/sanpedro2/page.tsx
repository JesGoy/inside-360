"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";
import { useIntl } from "react-intl";


const places: Place[] = [
  {
    nameEN: "Road to San Pedro de Atacama",
    image360: "/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_360.webp",
    imageMin:"/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_187_189_m.webp",
    nameES: "Camino a San Pedro de Atacama",
  },
  {
    nameEN: "Pucará de Quitor",
    image360: "/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_199_201_360.webp",
    imageMin:"/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_199_201_m.webp",
    nameES: "Pucará de Quitor",
  },
  {
    nameEN: "Catarpe",
    image360: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_360.webp",
    imageMin: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_211_213_m.webp",
    nameES: "Catarpe",
  },
  {
    nameEN: "Catarpe",
    image360: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_360.webp",
    imageMin:"/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_223_225_m.webp",
    nameES: "Catarpe",
  },
  {
    nameEN: "Entrance to Chulacao ravine",
    image360: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_360.webp",
    imageMin:"/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_238_240_m.webp",
    nameES: "Entrada a la quebrada Chulacao",
  },
  {
    nameEN: "Chulacao ravine",
    image360: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_360.webp",
    imageMin:"/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_247_249_m.webp",
    nameES: "Quebrada Chulacao",
  },
  {
    nameEN: "Chulacao ravine",
    image360: "/aecl24/tour360/images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_360.webp",
    imageMin:"/aecl24/tour360images/quitor-catarpe/SanPedroDeAtacama_Quitor-Catarpe_259_261_m.webp",
    nameES: "Quebrada Chulacao",
  },

];

const PukaraDeQuitorPage = () => {
  const [start, setStart] = useState<boolean>(false);

  const intl = useIntl();
  const descriptionPlace = intl.formatMessage({ id: 'sanpedro1.descriptionPlace'});

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"San Pedro de Atacama  Pukara de Quitor  Catarpe"} descriptionPlace={descriptionPlace}></WelcomePage>
  );
};

export default PukaraDeQuitorPage;
