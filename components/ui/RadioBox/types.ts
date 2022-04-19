export type RadioOption = {
  name: string;
  displayName: string;
  checked?: boolean;
};

export type RadioGroupProps = {
  title?: string;
  queryName: string;
  options: RadioOption[];
};
