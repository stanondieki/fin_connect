interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "success" | "danger" | "primary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "primary", size = "medium", ...props }) => {
  const variantStyles = {
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-gray-500 text-gray-700 bg-white hover:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-200",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`rounded-xl ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
