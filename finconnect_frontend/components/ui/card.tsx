import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`px-4 py-2 border-b ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
