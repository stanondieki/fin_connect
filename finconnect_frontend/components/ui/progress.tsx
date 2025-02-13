import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress: React.FC<ProgressProps> = ({ value = 0, max = 100, ...props }) => {
  return (
    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden" {...props}>
      <div
        className="absolute top-0 left-0 h-full transition-all"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
};

export default Progress;
