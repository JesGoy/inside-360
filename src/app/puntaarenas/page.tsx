"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";
import { useIntl } from "react-intl";

const places: Place[] = [
  {
    nameEN: "San Isidro Lighthouse",
    image360: "/aecl24/tour360/images/punta-arenas/FaroSanIsidro_360.webp",
    imageMin: "/images/punta-arenas/FaroSanIsidro_m.webp",
    nameES: "Faro San Isidro",
  },
  {
    nameEN: "Landmark half of Chile",
    image360: "/aecl24/tour360/images/punta-arenas/HitoMitadDeChile_3_360.webp",
    imageMin:"/images/punta-arenas/HitoMitadDeChile_3_m.webp",
    nameES: "Hito la mitad de Chile",
  },
];

const PuntaArenasPage = () => {
  const [start, setStart] = useState<boolean>(false);

  const intl = useIntl();
  const descriptionPlace = intl.formatMessage({ id: 'puntaarenas.descriptionPlace'});


  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace={"Punta Arenas"} descriptionPlace={descriptionPlace}></WelcomePage>
  );
};

export default PuntaArenasPage;
