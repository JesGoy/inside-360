"use client";
import { useEffect, useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";
import { useIntl } from "react-intl";
import { getCurrentLanguage } from "../types";

const places: Place[] = [
  {
    nameEN: "Flowered desert 1",
    image360: "/images/desierto-florido/DesiertoFlorido_20_22_360.webp",
    imageMin: "/images/desierto-florido/DesiertoFlorido_20_22_m.webp",
    nameES: "Desierto Florido 1",
  },
  {
    nameEN: "Flowered desert 2",
    image360: "/images/desierto-florido/DesiertoFlorido_23_25_360.webp",
    imageMin:"/images/desierto-florido/DesiertoFlorido_23_25_m.webp",
    nameES: "Desierto Florido 2",
  },
  {
    nameEN: "Flowered desert 3",
    image360: "/images/desierto-florido/DesiertoFlorido_45_47_360.webp",
    imageMin:"/images/desierto-florido/DesiertoFlorido_45_47_m.webp",
    nameES: "Desierto Florido 3",
  },
  {
    nameEN: "Flowered desert 4",
    image360: "/images/desierto-florido/DesiertoFlorido_51_53_360.webp",
    imageMin:"/images/desierto-florido/DesiertoFlorido_51_53_m.webp",
    nameES: "Desierto Florido 4",
  },
];

const DesiertoFloridoPage = () => {
  const [start, setStart] = useState<boolean>(false);
  const [language, setlanguage] = useState("es");
  
  useEffect(() => {
    getCurrentLanguage().then((r) => setlanguage(r));
  }, []);
  const intl = useIntl();
  const descriptionPlace = intl.formatMessage({ id: 'desiertoflorido.descriptionPlace'});

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={language == "es" ? "Desierto florido" : "Flowered desert"} descriptionPlace={descriptionPlace}></WelcomePage>
  );
};

export default DesiertoFloridoPage;
