import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NextRouter } from 'next/router';

import { MenuTittles } from './constants';

type MenuItemProps = {
  menuItem: {
    title: MenuTittles;
    href: string;
    icon: IconDefinition;
  };
  router: NextRouter;
};

export type { MenuItemProps };
