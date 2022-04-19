import React from 'react';

import { CatalogCard } from 'components/base/catalog/CatalogCard';

import { CatalogRowRendererProps } from './types';

import styles from './catalogRowRenderer.module.scss';

export const CatalogRowRenderer: React.FC<CatalogRowRendererProps> = ({
  style,
  cards,
}) => (
  <div
    style={{
      ...style,
    }}
    className={styles.row}
  >
    {cards.map((card, index) => (
      <CatalogCard key={index} {...card} />
    ))}
  </div>
);
