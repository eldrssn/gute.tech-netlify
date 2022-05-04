import { useLayoutEffect, useState } from 'react';

import { WindowSidesType } from './types';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSidesType>({
    windowWidth: null,
    windowHeight: null,
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowSize;
};
