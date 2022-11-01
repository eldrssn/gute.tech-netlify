import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationNav: FC = () => (
  <Pagination
    count={2}
    page={1}
    variant='outlined'
    color='primary'
    shape='rounded'
    size='small'
    sx={{
      padding: '13px 18px',
      '& .MuiPagination-ul': {
        display: 'flex',
        justifyContent: 'center',
      },

      '& .MuiButtonBase-root': { borderRadius: 0 },
    }}
  />
);

export { PaginationNav };
