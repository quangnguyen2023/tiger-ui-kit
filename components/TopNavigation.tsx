'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { useParams } from 'next/navigation';
import { Save, Check } from 'lucide-react';
import AvatarMenu from '@/components/AvatarMenu';

const TopNavigation = () => {
  const { widgetId } = useParams() as { widgetId: string };
  const { saveWidget } = useWidgetContext();

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveWidget(widgetId);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 px-4">
      {/* Left side */}
      <div className="flex items-center">
        {widgetId && (
          <Button
            variant="secondary"
            onClick={handleSave}
            loading={isSaving}
            disabled={saved}
            startIcon={saved ? <Check /> : <Save />}
          >
            {saved ? 'Saved' : 'Save changes'}
          </Button>
        )}
      </div>

      {/* Center - Logo */}
      <Image
        src="/logo_1.3.png"
        alt="Widget Kit Logo"
        width={100}
        height={23}
        className="scale-[1.5]"
      />

      {/* Right side */}
      <div className="flex items-center">
        <AvatarMenu />
      </div>
    </div>
  );
};

export default TopNavigation;
