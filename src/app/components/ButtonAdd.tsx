import Link from "next/link";
import React from "react";

// Définition des props 
interface ButtonAddProps {
  href: string;
  title?: string;
  children?: React.ReactNode;
}

const btnStyle =
  "fixed bottom-8 right-8 flex items-center justify-center w-16 h-16 bg-blue-500 hover:bg-blue-700 rounded-full z-10";

const Button: React.FC<ButtonAddProps> = ({ href, title }) => {
  return (
    <Link href={href} title={title}>
      <button className={btnStyle}>
        <span className="plus-icon"></span>
      </button>
    </Link>
  );
};

export default Button;