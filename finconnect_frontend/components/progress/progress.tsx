import React from "react";

interface ProgressProps {
  value: number; // A number between 0 and 100
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`relative h-4 bg-gray-300 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-500 transition-width duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress;
