import { useRef, useEffect } from 'react';

import { handleEvents } from './handleEvents';
import { UseArrowNavigation } from './types';

const useArrowNavigation = ({ selectors }: UseArrowNavigation) => {
  const parentNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      handleEvents({ event, parentNode: parentNode.current, selectors });
    };
    document.addEventListener('keydown', eventHandler);

    return () => document.removeEventListener('keydown', eventHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return parentNode;
};

export { useArrowNavigation };
