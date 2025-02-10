import React from "react";

export const Table = ({ children, className = "" }) => {
  return (
    <table className={`w-full border-collapse ${className}`}>{children}</table>
  );
};

export const TableHead = ({ children, className = "" }) => {
  return (
    <thead className={`bg-gray-200 text-gray-700 ${className}`}>{children}</thead>
  );
};

export const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

export const TableCell = ({ children, className = "", ...props }) => {
  return (
    <td className={`p-3 text-left ${className}`} {...props}>{children}</td>
  );
};
