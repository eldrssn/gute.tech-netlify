import { HandleArrowKey, HandleEvents } from './types';

const handleArrowKey = ({
  event,
  currentIndex,
  availableElements,
}: HandleArrowKey) => {
  if (currentIndex === -1) {
    availableElements[0].focus();
  }

  let nextElement;
  if (event.key === 'ArrowDown') {
    nextElement = availableElements[currentIndex + 1];
  }

  if (event.key === 'ArrowUp') {
    nextElement = availableElements[currentIndex - 1];
  }

  nextElement && nextElement.focus();

  if (event.key !== 'Enter') {
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
  if (!['ArrowUp', 'ArrowDown'].includes(key)) {
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
