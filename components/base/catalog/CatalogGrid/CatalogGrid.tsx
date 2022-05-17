import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { CatalogCard } from '../CatalogCard';

import { CatalogGridProps } from './types';
import styles from './catalogGrid.module.scss';

const CatalogGrid: FC<CatalogGridProps> = ({ items }) => (
  <>
    {items.length > 0 ? (
      <Grid container spacing={4} className={styles.gridContainer}>
        {items?.map((card) => (
          <Grid key={card.slug} item xs={12} sm={6} md={6} lg={4}>
            <CatalogCard {...card} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <p className={styles.noItems}>Товары не найдены</p>
    )}
  </>
);

export { CatalogGrid };
