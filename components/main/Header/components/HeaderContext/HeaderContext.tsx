import React from 'react';

import { HeaderContentType } from './types';

export const HeaderContext = React.createContext<HeaderContentType>({
  isFullHeader: true,
  isTabletView: false,
  isMobileView: false,
});
