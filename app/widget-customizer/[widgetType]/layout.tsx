import React from 'react';
import PrimarySidebar from '@/components/PrimarySidebar';
import TopNavigation from '@/components/TopNavigation';

export default function WidgetCustomizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavigation />

      <div className="flex">
        <PrimarySidebar />
        {children}
      </div>
    </>
  );
}
