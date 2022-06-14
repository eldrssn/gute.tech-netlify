import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MenuItem } from '@mui/material';

import { selectTransportStore } from 'store/reducers/transport/selectors';
import {
  getLinkToCatalog,
  getLinkToCategory,
  getLinkToVidgetCategory,
} from 'utility/helpers/linkmakers';

import { CatalogMenuItemProps } from '../types';

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
    <a>
      <MenuItem
        className={className}
        key={item.slug}
        onClick={handleClickMenuItem}
        onMouseEnter={onMouseEnter}
      >
        {item.title}
      </MenuItem>
    </a>
  );
};

export { CatalogMenuItem };
