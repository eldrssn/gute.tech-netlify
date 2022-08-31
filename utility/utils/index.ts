import { SCROLL_DELAY } from 'constants/variables';
import { KeyboardEvent } from 'react';
import { ENTER_BUTTON_KEY } from './constants';

const setSmoothScroll = (clickedPanel: EventTarget & Element) => {
  if (clickedPanel) {
    setTimeout(
      () =>
        clickedPanel.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        }),
      SCROLL_DELAY,
    );
  }
};

const handleEnterPress = (event: KeyboardEvent, handler: () => void) => {
  if (event.key === ENTER_BUTTON_KEY) {
    handler();
  }
};

export { setSmoothScroll, handleEnterPress };
