// components/ui/dropdown-menu.js
import React, { useState } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative">{children}</div>;
}

export function DropdownMenuTrigger({ children, ...props }) {
  return (
    <button className="focus:outline-none" {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, align = "left" }) {
  return (
    <div className={`absolute mt-2 w-48 bg-white shadow-lg rounded-lg ${align === "end" ? "right-0" : "left-0"}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, className = "", ...props }) {
  return (
    <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`} {...props}>
      {children}
    </div>
  );
}

export {  };