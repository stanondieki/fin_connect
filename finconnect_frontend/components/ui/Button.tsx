import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "success" | "danger" | "primary" | "ghost"; 
  size?: "small" | "medium" | "large" | "icon";
}


const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "primary", size = "medium", ...props }) => {
  const variantStyles = {
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
    primary: "bg-blue-500 hover:bg-blue-600",
    ghost: "bg-transparent hover:bg-gray-200 text-gray-800",
  };
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
    icon: "p-2 rounded-full", 
  };

  return (
    <button
      className={`px-4 py-2 text-white rounded-xl ${variantStyles[variant]}${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
