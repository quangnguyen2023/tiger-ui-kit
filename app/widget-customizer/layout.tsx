import PrimarySidebar from '@/components/PrimarySidebar';
import TopNavigation from '@/components/TopNavigation';

const WidgetCustomizerLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <TopNavigation />

      <div className="flex">
        <PrimarySidebar />
        {children}
      </div>
    </>
  );
};

export default WidgetCustomizerLayout;
