import PrimarySidebar from '@/components/PrimarySidebar';
import TopNavigation from '@/components/TopNavigation';

const MyWidgets = () => {
  return (
    <>
      <TopNavigation />

      <div className="flex">
        <PrimarySidebar />
        Hello
      </div>
    </>
  );
};

export default MyWidgets;
