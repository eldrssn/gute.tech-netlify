import { IsDrawerProps } from 'components/main/Header/types';

type HeaderAsideNavProps = {
  setIsFocusSearchField: (isFocusSearchField: boolean) => void;
} & IsDrawerProps;

export type { HeaderAsideNavProps };
