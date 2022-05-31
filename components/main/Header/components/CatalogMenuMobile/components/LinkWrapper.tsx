import React, { FC } from 'react';
import Link from 'next/link';

import { LinkWrapperProps } from '../types';
import { getLinkToCatalog } from 'utility/helpers/linkmakers';

const LinkWrapper: FC<LinkWrapperProps> = ({
  item,
  onClick,
  children,
  parentSlug,
}) => {
  const linkToCatalog = getLinkToCatalog({
    categorySlug: parentSlug,
    subcategorySlug: item.slug,
  });

  return (
    <>
      {item.children?.length ? (
        children
      ) : (
        <Link href={linkToCatalog} key={item.slug}>
          <a>
            <div onClick={onClick}>{children}</div>
          </a>
        </Link>
      )}
    </>
  );
};

export { LinkWrapper };
