import React from 'react';
import PrimarySidebar from '@/components/PrimarySidebar';
import { WidgetProvider } from '@/contexts/WidgetContext';

export default function WidgetCustomizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WidgetProvider>
      <div className="flex">
        <PrimarySidebar />
        {children}
      </div>
    </WidgetProvider>
  );
}
