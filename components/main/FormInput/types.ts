type FormInputProps = {
  helperText: string | undefined;
  label: string;
  onChange: () => void;
  value: string;
  isError: boolean;
  isAutocomplete?: boolean;
  textarea?: boolean;
  maxLength?: number;
  hideValue?: boolean;
};

export type { FormInputProps };
