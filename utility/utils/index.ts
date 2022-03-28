import { SCROLL_DELAY } from 'constants/variables';

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

export { setSmoothScroll };
