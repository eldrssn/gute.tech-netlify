type HeaderFiltersProps = {
  transportText: string;
  setTransportText: React.Dispatch<React.SetStateAction<string>>;
  closePopupMobile?: () => void;
  setIsFocusSearchField: (isFocusSearchField: boolean) => void;
};

export type { HeaderFiltersProps };
