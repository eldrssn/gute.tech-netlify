type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type TFormData = {
  product_slug: string | null;
  grade: number | null;
  comment: string | null;
};

export type { TFormData, TOuterProps };
