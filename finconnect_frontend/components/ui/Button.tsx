import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "success" | "danger" | "primary";
}

const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "primary", ...props }) => {
  const variantStyles = {
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
    primary: "bg-blue-500 hover:bg-blue-600",
  };

  return (
    <button
      className={`px-4 py-2 text-white rounded-xl ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
