'use client';

import React, { useState } from 'react';
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
    <div className="h-16 px-2 flex items-center border-b border-gray-200">
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

      <div className="ml-auto">
        <AvatarMenu />
      </div>
    </div>
  );
};

export default TopNavigation;
