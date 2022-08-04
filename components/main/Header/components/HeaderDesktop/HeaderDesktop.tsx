import React, { FC, useContext } from 'react';

import { HeaderContext } from '../HeaderContext';
import { HeaderDesktopFull } from '../HeaderDesktopFull';
import { HeaderFilters } from '../HeaderFilters';

import { HeaderDesktopProps } from './types';

const HeaderDesktop: FC<HeaderDesktopProps> = ({
  transportText,
  setIsFocusSearchField,
}) => {
  const { isFullHeader } = useContext(HeaderContext);

  return (
    <>
      {isFullHeader && (
        <HeaderDesktopFull setIsFocusSearchField={setIsFocusSearchField} />
      )}
      <HeaderFilters
        transportText={transportText}
        setIsFocusSearchField={setIsFocusSearchField}
      />
    </>
  );
};

export { HeaderDesktop };
