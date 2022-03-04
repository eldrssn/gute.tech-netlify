import { FC } from 'react';

import { Container, Box } from '@mui/material';

import CatalogFilters from 'components/base/catalog/CatalogFilter';
import CatalogCardList from 'components/base/catalog/CatalogCardList';
import CatalogTitle from 'components/base/catalog/CatalogTitle';

const Catalog: FC = () => (
  <Container sx={{ marginTop: 17, minHeight: '100vh', width: '100%' }}>
    <CatalogTitle />
    <Box sx={{ height: '100%', display: { md: 'flex', sm: 'none' } }}>
      <CatalogFilters />
      <CatalogCardList />
    </Box>
  </Container>
);

export default Catalog;
