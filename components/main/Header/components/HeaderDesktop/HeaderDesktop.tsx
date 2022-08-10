import React, { FC, useContext } from 'react';

import { HeaderContext } from '../HeaderContext';
import { HeaderDesktopFull } from '../HeaderDesktopFull';
import { HeaderFilters } from '../HeaderFilters';

const HeaderDesktop: FC = () => {
  const { isFullHeader } = useContext(HeaderContext);

  return (
    <>
      {isFullHeader && <HeaderDesktopFull />}
      <HeaderFilters />
    </>
  );
};

export { HeaderDesktop };
