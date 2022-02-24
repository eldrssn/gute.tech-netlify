import { FC } from 'react';

import { Container, Box } from '@mui/material';

import CatalogFilters from '../../components/CatalogFilter/CatalogFilter';
import CatalogCardList from '../../components/CatalogCardList/CatalogCardList';
import CatalogTitle from '../../components/CatalogTitle/CatalogTitle';
import Header from '../../components/Header';

const Catalog: FC = () => {
  return (
    <Container>
      <Header />
      <Container sx={{ marginTop: 17, minHeight: '100vh', width: '100%' }}>
        <CatalogTitle />
        <Box sx={{ height: '100%', display: { md: 'flex', sm: 'none' } }}>
          <CatalogFilters />
          <CatalogCardList />
        </Box>
      </Container>
    </Container>
  );
};

export default Catalog;
