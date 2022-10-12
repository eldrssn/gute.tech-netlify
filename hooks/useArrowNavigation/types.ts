type UseArrowNavigation = { selectors: string };

type HandleArrowKey = {
  event: KeyboardEvent;
  currentIndex: number;
  availableElements: NodeListOf<HTMLElement>;
};

type HandleEvents = {
  event: KeyboardEvent;
  parentNode: HTMLElement | null;
  selectors: string;
};

export type { UseArrowNavigation, HandleArrowKey, HandleEvents };
