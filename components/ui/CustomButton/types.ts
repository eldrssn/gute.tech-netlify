type CustomButtonType = {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customStyles?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export type { CustomButtonType };
