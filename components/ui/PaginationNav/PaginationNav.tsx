import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

import { useRouterQuery } from 'hooks/useRouterQuery';

import { PAGE_QUERY } from './constants';
import { CatalogPaginationProps } from './types';

const PaginationNav: FC<CatalogPaginationProps> = ({
  pageCount,
  currentPage,
  setPage,
}) => {
  const { setQueryOption } = useRouterQuery();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);

    const stringifiedPage = page.toString();
    setQueryOption({ [PAGE_QUERY]: stringifiedPage });
  };

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={handlePageChange}
      variant='outlined'
      color='primary'
      shape='rounded'
      size='small'
      sx={{
        padding: '13px 18px',
        margin: { xs: 'auto', sm: 0 },
        '& .MuiPagination-ul': {
          display: 'flex',
          justifyContent: 'space-between',
        },

        '& .MuiButtonBase-root': { borderRadius: 0 },
      }}
    />
  );
};

export { PaginationNav };
