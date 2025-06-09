import React from 'react';
import PrimarySidebar from '@/components/PrimarySidebar';
import { WidgetProvider } from '@/contexts/WidgetContext';
import TopNavigation from '@/components/TopNavigation';

export default function WidgetCustomizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WidgetProvider>
      <TopNavigation />

      <div className="flex">
        <PrimarySidebar />
        {children}
      </div>
    </WidgetProvider>
  );
}
