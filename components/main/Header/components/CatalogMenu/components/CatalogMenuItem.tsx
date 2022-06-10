import React, { FC } from 'react';
import Link from 'next/link';
import { MenuItem } from '@mui/material';

import {
  getLinkToCatalog,
  getLinkToCategory,
} from 'utility/helpers/linkmakers';

import { CatalogMenuItemProps } from '../types';

const CatalogMenuItem: FC<CatalogMenuItemProps> = ({
  item,
  className,
  onMouseEnter,
  parentSlug,
  handleClick,
}) => {
  const href = parentSlug
    ? getLinkToCatalog({
        categorySlug: parentSlug,
        subcategorySlug: item.slug,
      })
    : getLinkToCategory(item.slug);

  return (
    <Link href={href} key={item.slug}>
      <a>
        <MenuItem
          className={className}
          key={item.slug}
          onClick={handleClick}
          onMouseEnter={onMouseEnter}
        >
          {item.title}
        </MenuItem>
      </a>
    </Link>
  );
};

export { CatalogMenuItem };
