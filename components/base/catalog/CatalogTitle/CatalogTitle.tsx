import React from 'react';

import { Box, Typography } from '@mui/material';

const CatalogTitle: React.FC = () => (
  <Box>
    <Typography
      sx={{ paddingTop: '30px', paddingBottom: '30px' }}
      gutterBottom
      variant='h5'
      component='div'
    >
      Catalog Title
    </Typography>
  </Box>
);

export default CatalogTitle;
