import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';

import {
  getLinkToCatalog,
  getLinkToCategory,
} from 'utility/helpers/linkmakers';

import { CatalogMenuItemProps } from '../types';
import styles from './catalogMenuItem.module.scss';

const cn = classnames.bind(styles);

const CatalogMenuItem: FC<CatalogMenuItemProps> = ({
  item,
  className,
  onMouseEnter,
  parentSlug,
  handleClick,
  isCategory = false,
}) => {
  const router = useRouter();

  const handleClickMenuItem = () => {
    handleClick();

    if (!isCategory) {
      router.push(
        getLinkToCatalog({
          categorySlug: parentSlug,
          subcategorySlug: item.slug,
        }),
      );
      return;
    }

    router.push(getLinkToCategory(item.slug));
  };

  return (
    <Box
      className={cn(styles.item, className)}
      key={item.slug}
      onClick={handleClickMenuItem}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      tabIndex={0}
    >
      {item.title}
    </Box>
  );
};

export { CatalogMenuItem };
