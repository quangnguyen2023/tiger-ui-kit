import React from 'react';
import { Separator } from '../ui/separator';

const DividerWithLabel = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="mx-2 text-sm text-gray-500">{label}</span>
      <Separator className="flex-1" />
    </div>
  );
};

export default DividerWithLabel;
