import React from 'react';

type CustomHeaderProps = {
  title: string;
  subtitle?: string;
};

const CustomHeader = ({ title, subtitle }: CustomHeaderProps) => {
  return (
    <div className="-mb-3 flex flex-col">
      <h1 className="text-lg font-semibold">{title}</h1>
      {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
    </div>
  );
};

export default CustomHeader;
