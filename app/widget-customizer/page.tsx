import PrimarySidebar from '@/components/PrimarySidebar';
import SecondarySidebar from '@/components/SecondarySidebar';
import WidgetPreview from '@/components/WidgetPreview';
import { WidgetProvider } from '@/contexts/WidgetContext';

const WidgetCustomizer = () => {
  return (
    <WidgetProvider>
      <div className="flex">
        <PrimarySidebar />
        <SecondarySidebar />
        <WidgetPreview />
      </div>
    </WidgetProvider>
  );
};

export default WidgetCustomizer;
