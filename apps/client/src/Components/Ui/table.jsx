import React from 'react';

export const Table = ({ children }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      {children}
    </table>
  );
};

export const TableHead = ({ children }) => {
  return (
    <thead className="bg-gray-100">
      {children}
    </thead>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr className="border-b">
      {children}
    </tr>
  );
};

export const TableCell = ({ children }) => {
  return (
    <td className="px-4 py-2 text-sm text-gray-700">
      {children}
    </td>
  );
};

export const TableBody = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};
