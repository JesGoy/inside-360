"use client";
import { useEffect, useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";
import { useIntl } from "react-intl";
import { getCurrentLanguage } from "../types";

const places: Place[] = [
  {
    nameEN: "Ahu Tongariki",
    image360: "/images/isla-de-pascua/IslaDePascua_189_191_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_189_191_m.webp",
    nameES: "Ahu Tongariki",
  },
  {
    nameEN: "Ahu Ko Te Riku",
    image360: "/images/isla-de-pascua/IslaDePascua_044_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_044_m.webp",
    nameES: "Ahu Ko Te Riku",
  },
  {
    nameEN: "Anakena Beach",
    image360: "/images/isla-de-pascua/IslaDePascua_061_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_061_m.webp",
    nameES: "Playa Anakena",
  },
  {
    nameEN: "Anakena beach shore",
    image360: "/images/isla-de-pascua/IslaDePascua_064_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_064_m.webp",
    nameES: "Orilla de playa Anakena",
  },

  {
    nameEN: "Rano Kau volcano lookout",
    image360: "/images/isla-de-pascua/IslaDePascua_194_196_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_194_196_m.webp",
    nameES: "Mirador al volcán Rano Kau",
  },
  {
    nameEN: "Ahu Nau Nau",
    image360: "/images/isla-de-pascua/IslaDePascua_062_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_062_m.webp",
    nameES: "Ahu Nau Nau",
  },
  {
    nameEN: "Taha Complex",
    image360: "/images/isla-de-pascua/IslaDePascua_045_360.webp",
    imageMin: "/images/isla-de-pascua/IslaDePascua_045_m.webp",
    nameES: "Complejo Taha",
  },
];

const RapanuiPage = () => {
  const [language, setlanguage] = useState("es");
  
  useEffect(() => {
    getCurrentLanguage().then((r) => setlanguage(r));
  }, []);
  const [start, setStart] = useState<boolean>(false);
  const intl = useIntl();
  const descriptionPlace = intl.formatMessage({ id: 'rapanui.descriptionPlace'});

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={language == "es" ? "Isla de Pascua" : "Easter Island"} descriptionPlace={descriptionPlace}></WelcomePage>
  );
};

export default RapanuiPage;
