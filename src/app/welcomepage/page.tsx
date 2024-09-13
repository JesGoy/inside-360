"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomePage({setStart}) {
  function handleClickStartButton(){
    setStart(true);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/images/logo-asamblea-full.svg"
          alt="Chile 2024 Logo"
          className="w-50"
          width="193"
          height="91"
          style={{ aspectRatio: "150/150" }}
        />
      </div>
      <div className="w-48">
        <p className="text-lg text-[#2F2D2C;]">Tour 360º</p>
        <p className="text-xs text-[#8E8D8A;]">Descubre los lugares tipicos de nuestro pais, viendo cada region con sus lugares tipicos.</p>        
      </div>
      <div className="mt-48">
        <button className="flex items-center justify-center space-x-2 h-10 px-10 py-6 text-sm font-medium text-white bg-[#2C7C89] rounded-full transition-colors hover:bg-[#256973]  disabled:opacity-50 disabled:pointer-events-none" onClick={handleClickStartButton}>
          Comenzar <ArrowRight size={16} className="ml-2"/>
        </button>
      </div>
      <footer className="absolute bottom-4 text-xs text-gray-400">
        V.0.0.1
      </footer>
    </div>
  );
}