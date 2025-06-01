'use client';

import { useId, useState } from 'react';
import { Input } from './ui/input';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';
import { createWidgetUrl } from '@/lib/utils';
import { WidgetType } from '@/types';

const EmbedLink = ({ widgetType }: { widgetType: WidgetType }) => {
  const [copied, setCopied] = useState(false);

  const embedUrl = createWidgetUrl(widgetType, useId());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied embed link!');
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input readOnly value={embedUrl} />

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center gap-2 p-2 px-3 text-sm bg-zinc-100 hover:bg-zinc-50 transition duration-200 rounded-md cursor-pointer"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {copied ? 'Copied!' : 'Copy embed link'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default EmbedLink;
