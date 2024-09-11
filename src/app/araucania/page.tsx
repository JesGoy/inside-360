"use client";
import { use, useState } from "react";
import View360 from "../components/view-360";
import { Place } from "../interfaces/Place";

const places: Place[] = [
  {
    description: "Descripcion del lugar",
    image360: "/images/outdoor_umbrellas_4k.jpg",
    name: "Cerro Tololo",
  },
];

const AraucaniaPage = () => {
  const [start, setStart] = useState(false);

  return start ? (
    <View360 places={places} />
  ) : (
    <button onClick={() => setStart(true)}> comenzar </button>
  );
};

export default AraucaniaPage;
