import { useEffect, useState } from 'react';

import sizes from 'styles/_export.module.scss';
import { setBreakpointSize } from 'utility/helpers';

import { WindowSidesType } from './types';

const tablet = setBreakpointSize(sizes.tablet);
const xsMobile = setBreakpointSize(sizes.xsMobile);
const sMobile = setBreakpointSize(sizes.sMobile);
const mobile = setBreakpointSize(sizes.mobile);

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

  const { windowWidth, windowHeight } = windowSize;

  return {
    windowWidth,
    windowHeight,
    isTablet: windowWidth ? windowWidth < tablet : false,
    isXSMobile: windowWidth ? windowWidth < xsMobile : false,
    isSMobile: windowWidth ? windowWidth < sMobile : false,
    isMobile: windowWidth ? windowWidth < mobile : false,
  };
};

export { useWindowSize };
