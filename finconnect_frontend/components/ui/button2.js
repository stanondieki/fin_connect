// components/ui/button.js
import React from "react";

export function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-200",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}