export interface CheckboxOption {
  name: string;
  displayName: string;
  checked?: boolean;
}

export interface CheckboxGroupProps {
  title?: string;
  queryName: string;
  options: CheckboxOption[];
}
