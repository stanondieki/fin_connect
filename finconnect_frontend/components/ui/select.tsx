import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

interface SelectItemProps extends SelectHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, ...props }) => {
  return <option value={value} {...props}>{children}</option>;
};
