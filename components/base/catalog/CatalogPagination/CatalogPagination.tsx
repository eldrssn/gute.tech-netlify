import React, { FC } from 'react';
import { Pagination } from '@mui/material';

import { CatalogPaginationProps } from './types';

export const CatalogPagination: FC<CatalogPaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => (
  <Pagination
    count={pageCount}
    page={currentPage}
    onChange={onPageChange}
    variant='outlined'
    color='primary'
    shape='rounded'
    size='small'
    sx={{
      padding: '13px 18px',
      '& .MuiPagination-ul': {
        display: 'flex',
        justifyContent: 'space-between',
      },

      '& .MuiButtonBase-root': { borderRadius: 0 },
    }}
  />
);
