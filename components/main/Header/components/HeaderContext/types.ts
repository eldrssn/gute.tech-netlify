type HeaderContentType = {
  isFullHeader: boolean;
  isFocusSearchField: boolean;
  setIsFocusSearchField: React.Dispatch<React.SetStateAction<boolean>>;
  setTransportText: React.Dispatch<React.SetStateAction<string>>;
  transportText: string;
};

export type { HeaderContentType };
