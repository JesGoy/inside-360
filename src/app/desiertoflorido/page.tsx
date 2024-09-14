"use client";
import { useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";
import WelcomePage from "../welcomepage/welcompage";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/aecl24/tour360/images/desierto-florido/DesiertoFlorido_20_22_360.webp",
    imageMin: "/aecl24/tour360/images/desierto-florido/DesiertoFlorido_20_22_m.webp",
    name: "Desierto Florido 1",
  },
  {
    description: "Descripcion del lugar",
    image360: "/aecl24/tour360/images/desierto-florido/DesiertoFlorido_23_25_360.webp",
    imageMin:"/aecl24/tour360/images/desierto-florido/DesiertoFlorido_23_25_m.webp",
    name: "Desierto Florido 2",
  },
  {
    description: "Descripcion del lugar",
    image360: "./aecl24/tour360/images/desierto-florido/DesiertoFlorido_45_47_360.webp",
    imageMin:"./aecl24/tour360/images/desierto-florido/DesiertoFlorido_45_47_m.webp",
    name: "Desierto Florido 3",
  },
  {
    description: "Descripcion del lugar",
    image360: "./aecl24/tour360/images/desierto-florido/DesiertoFlorido_51_53_360.webp",
    imageMin:"./aecl24/tour360/images/desierto-florido/DesiertoFlorido_51_53_m.webp",
    name: "Desierto Florido 4",
  },
];

const DesiertoFloridoPage = () => {
  const [start, setStart] = useState<boolean>(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <WelcomePage setStart={setStart} namePlace="Desierto florido" descriptionPlace="Visita virtualmente los lugares más turísticos de nuestro país."></WelcomePage>
  );
};

export default DesiertoFloridoPage;
