import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';

import { selectTransportStore } from 'store/reducers/transport/selectors';
import {
  getLinkToCatalog,
  getLinkToCategory,
  getLinkToVidgetCategory,
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
  const { transportId } = useSelector(selectTransportStore);

  const handleClickMenuItem = () => {
    handleClick();

    if (!isCategory) {
      router.push(
        getLinkToCatalog({
          categorySlug: parentSlug,
          subcategorySlug: item.slug,
        }),
      );
    }

    if (isCategory && !transportId) {
      router.push(getLinkToCategory(item.slug));
    }

    if (transportId && isCategory) {
      router.push(getLinkToVidgetCategory(parentSlug || ''));
    }
  };

  return (
    <Box
      className={cn(styles.item, className)}
      key={item.slug}
      onClick={handleClickMenuItem}
      onMouseEnter={onMouseEnter}
    >
      {item.title}
    </Box>
  );
};

export { CatalogMenuItem };
