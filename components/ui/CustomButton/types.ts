type CustomButtonType = {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customStyles?: string;
  disabled?: boolean;
};

export type { CustomButtonType };
