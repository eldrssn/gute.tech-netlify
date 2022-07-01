type TFormData = {
  cityName: string;
};

type OuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export type { TFormData, OuterProps };
