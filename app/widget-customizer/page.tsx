import { PATH_WIDGET_CUSTOMIZER } from '@/constants';
import { redirect, RedirectType } from 'next/navigation';

const WidgetCustomizer = () => {
  redirect(`${PATH_WIDGET_CUSTOMIZER}/my-widgets`, RedirectType.replace);
};

export default WidgetCustomizer;
