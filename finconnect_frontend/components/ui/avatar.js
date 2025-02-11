// components/ui/avatar.js
import React from "react";

export function Avatar({ className = "", children }) {
  return (
    <div className={`w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return <img className="w-full h-full object-cover" src={src} alt={alt} />;
}

export function AvatarFallback({ children }) {
  return <div className="text-gray-600 font-bold">{children}</div>;
}
