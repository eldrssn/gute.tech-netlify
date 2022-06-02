type CatalogFilterButtonProps = {
  anchorApplyButton: HTMLElement | null;
  setAnchorApplyButton: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  handleDrawerToggle?: () => void;
};

export type { CatalogFilterButtonProps };
