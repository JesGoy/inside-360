"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

export default function WelcomePage({
  setStart,
  namePlace,
  descriptionPlace,
}: {
  setStart: any;
  namePlace: string;
  descriptionPlace: string;
}) {
  function handleClickStartButton() {
    setStart(true);
  }
  return (
    <body className="overflow-hidden bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/aecl24/tour360/images/logo-asamblea-full.svg"
            alt="Chile 2024 Logo"
            className="w-50"
            width="193"
            height="91"
            style={{ aspectRatio: "150/150" }}
          />
        </div>
        <div className="w-48">
          <p className="text-lg text-[#2F2D2C;]">
            <b><FormattedMessage id="app.title"/></b>
            <br /> {namePlace}
          </p>

          <p className="text-sm text-[#8E8D8A;]">{descriptionPlace}</p>
        </div>
        <div className="mt-28">
          <button
            className="flex items-center justify-center space-x-2 h-10 px-10 py-6 text-sm font-medium text-white bg-[#2C7C89] rounded-full transition-colors hover:bg-[#256973]  disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleClickStartButton}
          >
            <FormattedMessage id="app.button"/> <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
      {/* <footer className="sticky bottom-4 text-xs text-center text-gray-400">
        V.0.0.1
      </footer> */}
    </body>
  );
}
