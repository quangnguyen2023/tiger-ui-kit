import { WidgetProvider } from '@/contexts/WidgetContext';

const EmbedLayout = ({ children }: { children: React.ReactNode }) => {
  return <WidgetProvider>{children}</WidgetProvider>;
};

export default EmbedLayout;
