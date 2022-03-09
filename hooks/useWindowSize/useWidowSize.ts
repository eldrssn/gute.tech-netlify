import { useEffect, useState } from 'react';
import { WindowSideType } from 'types/productTypes';
import { useThrottle } from '@react-hook/throttle';

type WindowSidesType = {
  windowWidth: WindowSideType;
  windowHeight: WindowSideType;
};

const FPS = 1;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useThrottle<WindowSidesType>(
    {
      windowWidth: undefined,
      windowHeight: undefined,
    },
    FPS,
  );

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

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};
