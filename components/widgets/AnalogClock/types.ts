export type AnalogClockProps = {
  updateDuration?: number;
  enableIndicators?: boolean;
  backgroundColor?: string;
  textColor?: string;
  title?: string;
  scale?: number;
  timezone?: string;
};

export interface InnerConfig extends AnalogClockProps {
  diameter: number;
  offsetWithoutIndicators: number;
  indicatorSize: { width: number; height: number };
  hourHandSize: { width: number; height: number };
  minuteHandSize: { width: number; height: number };
  secondHandSize: { width: number; height: number };
  fontSizeClass: string;
  titleSizeClass: string;
}
