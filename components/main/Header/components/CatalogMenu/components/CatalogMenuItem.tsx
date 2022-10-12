import React, { FC, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';
import Link from 'next/link';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  getLinkToCategoryFromCatalog,
  getLinkToParentCategory,
} from 'utility/helpers/linkmakers';
import { handleEnterPress } from 'utility/utils';

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
  const transportId = useSelector(selectTransportId);

  const getLink = () =>
    !isCategory && parentSlug
      ? getLinkToCategoryFromCatalog({
          categorySlug: parentSlug,
          subCategorySlug: item.slug,
          transportId,
        })
      : getLinkToParentCategory({ categorySlug: item.slug, transportId });

  const onEnterPress = (event: KeyboardEvent) => {
    handleEnterPress(event, handleClick);
  };

  return (
    <Link href={getLink()}>
      <a
        onFocus={onMouseEnter}
        onMouseEnter={onMouseEnter}
        onKeyUp={onEnterPress}
      >
        <Box
          className={cn(styles.item, className)}
          key={item.slug}
          onClick={handleClick}
        >
          {item.title}
        </Box>
      </a>
    </Link>
  );
};

export { CatalogMenuItem };
