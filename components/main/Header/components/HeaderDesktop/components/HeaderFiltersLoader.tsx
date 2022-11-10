import { FC, useContext } from 'react';
import { Box } from '@mui/system';

import { HeaderContext } from 'components/main/Header/components/HeaderContext';

const HeaderFiltersLoader: FC = () => {
  const { isFullHeader } = useContext(HeaderContext);

  return (
    <Box
      sx={{
        width: isFullHeader ? '100%' : 'auto',
        height: isFullHeader ? '120px' : '40px',
      }}
    />
  );
};

export { HeaderFiltersLoader };
