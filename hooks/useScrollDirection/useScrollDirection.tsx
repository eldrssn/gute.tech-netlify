import { useEffect, useState } from 'react';
import { SCROLL_DIRECTIONS } from './constants';

export const useScrollDirection = ({
  initialDirection = SCROLL_DIRECTIONS.UP,
  thresholdPixels = 64,
} = {}) => {
  const [scrollDirection, setScrollDirection] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(
        scrollY > lastScrollY ? SCROLL_DIRECTIONS.DOWN : SCROLL_DIRECTIONS.UP,
      );
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels]);

  return scrollDirection;
};
