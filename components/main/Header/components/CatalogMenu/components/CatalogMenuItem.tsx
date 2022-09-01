import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  getLinkToCategoryFromCatalog,
  getLinkToParentCategory,
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

  const transportId = useSelector(selectTransportId);

  const handleClickMenuItem = () => {
    handleClick();

    if (!isCategory && parentSlug) {
      router.push(
        getLinkToCategoryFromCatalog({
          categorySlug: parentSlug,
          subCategorySlug: item.slug,
          transportId,
        }),
      );
      return;
    }

    router.push(
      getLinkToParentCategory({ categorySlug: item.slug, transportId }),
    );
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
