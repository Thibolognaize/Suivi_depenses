import React from "react";
import Image from "next/image";

// Composant pour l'en-tête de la page
const Header1 = () => (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Image 
            src={"/logo/logo-GLPI-250-black.png"}
            alt="Logo ECS" 
            width={128} 
            height={128}
            className="mr-4 object-contain"
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Suivi des dépenses informatiques
          </h1>
        </div>
      </div>
    </div>
  )

export default Header1;