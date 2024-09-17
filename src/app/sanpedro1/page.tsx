"use client";
import { useEffect, useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";
import { useIntl } from "react-intl";
import { getCurrentLanguage } from "../types";



const places: Place[] = [
  {
    nameEN: "Salt mine",
    image360: "/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_70_72_360.webp",
    imageMin: "/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_70_72_m.webp",
    nameES: "Mina de sal",
  },
  {
    nameEN: "Road to salt mine",
    image360: "/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_94_96_360.webp",
    imageMin:"/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_94_96_m.webp",
    nameES: "Camino a la mina de sal",
  },
  {
    nameEN: "Larger dune",
    image360: "/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_106_108_360.webp",
    imageMin:"/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_106_108_m.webp",
    nameES: "Duna mayor",
  },
  {
    nameEN: "Salt mountain range view",
    image360: "/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_124_126_360.webp",
    imageMin:"/aecl24/tour360/images/valle-de-la-luna/ValleDeLaLuna_124_126_m.webp",
    nameES: "Vista a cordillera de la sal",
  },
  {
    nameEN: "Lookout to salt mountain range",
    image360: "/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_360.webp",
    imageMin: "/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_163_165_m.webp",
    nameES: "Mirador a la cordillera de la sal",
  },
  {
    nameEN: "Lookout to salt mountain range",
    image360: "/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_360.webp",
    imageMin:"/aecl24/tour360/images/pukara-de-quitor/ValleDeLaLuna_Pukara_175_177_m.webp",
    nameES: "Mirador a la cordillera de la sal",
  },

];

const ValleDeLaLunaPage = () => {
  const [start, setStart] = useState<boolean>(false);
  const [language, setlanguage] = useState("es");
  
  useEffect(() => {
    getCurrentLanguage().then((r) => setlanguage(r));
  }, []);
  const intl = useIntl();
  const descriptionPlace = intl.formatMessage({ id: 'sanpedro1.descriptionPlace'});

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={language == "es" ? "San Pedro de Atacama  Valle de la Luna" : "San Pedro de Atacama  Moon Valley"} descriptionPlace={descriptionPlace}></WelcomePage>
  );
};

export default ValleDeLaLunaPage;
