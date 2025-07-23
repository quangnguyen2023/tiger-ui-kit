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
        <main className="ml-52 flex-1 pt-16">{children}</main>
      </div>
    </>
  );
};

export default WidgetCustomizerLayout;
