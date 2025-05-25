import PrimarySidebar from '@/components/PrimarySidebar';
// import SecondarySidebar from '@/components/SecondarySidebar';
import { WidgetProvider } from '@/contexts/WidgetContext';

const WidgetCustomizer = () => {
  return (
    <div>
      <WidgetProvider>
        <PrimarySidebar />
        {/* <SecondarySidebar /> */}
      </WidgetProvider>
    </div>
  );
};

export default WidgetCustomizer;
