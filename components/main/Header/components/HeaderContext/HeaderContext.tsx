import React from 'react';

import { HeaderContentType } from './types';

const HeaderContext = React.createContext<HeaderContentType>({
  isFullHeader: true,
  isTabletView: false,
  isMobileView: false,
});

export { HeaderContext };
