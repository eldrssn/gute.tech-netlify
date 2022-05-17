import { useEffect, useState } from 'react';

import { WindowSidesType } from './types';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSidesType>({
    windowWidth: null,
    windowHeight: null,
  });

  useEffect(() => {
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

export { useWindowSize };
