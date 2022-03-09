import { SCROLL_DELAY } from './constants';

export const setSmoothScroll = (clickedPanel: EventTarget & Element) => {
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
