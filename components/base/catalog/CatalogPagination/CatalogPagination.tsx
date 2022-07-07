import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

import { useRouterQuery } from 'hooks/useRouterQuery';

import { PAGE_QUERY } from '../constants';
import { CatalogPaginationProps } from './types';

const CatalogPagination: FC<CatalogPaginationProps> = ({
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
        '& .MuiPagination-ul': {
          display: 'flex',
          justifyContent: 'space-between',
        },

        '& .MuiButtonBase-root': { borderRadius: 0 },
      }}
    />
  );
};

export { CatalogPagination };
