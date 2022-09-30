type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCloseDisable?: boolean;
  modalTitle: string;
  closeByEsc?: boolean;
  initialFocus?: string;
};

export type { TOuterProps };
