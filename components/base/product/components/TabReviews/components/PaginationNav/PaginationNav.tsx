import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

import { PaginationProps } from '../../types';

const PaginationNav: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  setPage,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);
  };

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      variant='outlined'
      color='primary'
      shape='rounded'
      onChange={handlePageChange}
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
};

export { PaginationNav };
