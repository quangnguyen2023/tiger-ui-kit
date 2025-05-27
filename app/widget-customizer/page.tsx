import PrimarySidebar from '@/components/PrimarySidebar';
import SecondarySidebar from '@/components/SecondarySidebar';
import { WidgetProvider } from '@/contexts/WidgetContext';

const WidgetCustomizer = () => {
  return (
    <WidgetProvider>
      <div className="flex">
        <PrimarySidebar />
        <SecondarySidebar />
      </div>
    </WidgetProvider>
  );
};

export default WidgetCustomizer;
