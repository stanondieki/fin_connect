interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "success" | "danger" | "primary" | "outline";
}


const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "primary", size = "medium", ...props }) => {
  const variantStyles = {
    success: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
    primary: "bg-blue-500 hover:bg-blue-600",
    outline: "border border-gray-500 text-gray-700 bg-white hover:bg-gray-100", // Add styles for outline
  };

  return (
    <button
      className={`px-4 py-2 rounded-xl ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
