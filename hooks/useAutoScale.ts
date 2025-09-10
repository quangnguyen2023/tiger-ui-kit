import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useAutoScale = (
  containerSize: Size,
  childBaseSize: Size,
  padding: number = 0,
) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    // Available space sau khi trừ padding
    const availableWidth = containerSize.width - padding * 2;
    const availableHeight = containerSize.height - padding * 2;

    // Tính scale factor để fit hoàn toàn vào container
    const scaleX = availableWidth / childBaseSize.width;
    const scaleY = availableHeight / childBaseSize.height;

    // Chọn scale nhỏ hơn để đảm bảo fit hoàn toàn
    const newScale = Math.min(scaleX, scaleY);

    // Đảm bảo scale không âm và có minimum
    const finalScale = Math.max(0.1, newScale);

    // Round để tránh render liên tục
    // [0.8234567, 0.8234568, ....] => Mỗi giá trị khác nhau (dù rất nhỏ) sẽ trigger 1 lần re-render
    const roundedScale = Math.round(finalScale * 1000) / 1000; // Round đến 3 chữ số thập phân

    setScale(roundedScale);
  }, [
    containerSize.width,
    containerSize.height,
    childBaseSize.width,
    childBaseSize.height,
    padding,
  ]);

  return scale;
};
