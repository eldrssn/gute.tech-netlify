import { menuIcons } from './constants';

export interface HeaderMenuProps {
  isFullMenu?: boolean;
}

export type PagesType = keyof typeof menuIcons;
