import { KEY_NAMES } from './constants';
import { HandleArrowKey, HandleEvents } from './types';

const handleArrowKey = ({
  event,
  currentIndex,
  availableElements,
}: HandleArrowKey) => {
  if (currentIndex === -1) {
    availableElements[0].focus();
  }

  const [arrowUpKey, arrowDownKey, tabKey, enterKey] = KEY_NAMES;

  const isMoveDown = event.key === arrowDownKey || event.key === tabKey;
  const isMoveUp =
    event.key === arrowUpKey || (event.shiftKey && event.key === tabKey);

  let nextElement;

  if (isMoveDown) {
    const isLast = currentIndex === availableElements.length - 1;
    const nextElementIndex = isLast ? 0 : currentIndex + 1;

    nextElement = availableElements[nextElementIndex];
  }

  if (isMoveUp) {
    const isFirst = currentIndex === 0;
    const nextElementIndex = isFirst
      ? availableElements.length - 1
      : currentIndex - 1;

    nextElement = availableElements[nextElementIndex];
  }

  nextElement && nextElement.focus();

  if (event.key !== enterKey) {
    event.preventDefault();
  }
};

const handleEvents = ({
  event,
  parentNode,
  selectors = 'a,button,input',
}: HandleEvents) => {
  if (!parentNode) return;

  const key = event.key;
  if (!['ArrowUp', 'ArrowDown', 'Tab', 'Enter'].includes(key)) {
    return;
  }

  const activeElement = document.activeElement;

  if (!parentNode.contains(activeElement)) {
    return;
  }

  const availableElements = parentNode.querySelectorAll(
    selectors,
  ) as NodeListOf<HTMLElement>;

  if (!availableElements.length) {
    return;
  }

  const currentIndex = Array.from(availableElements).findIndex(
    (availableElement) => availableElement === activeElement,
  );

  handleArrowKey({ event, currentIndex, availableElements });
};

export { handleEvents };
