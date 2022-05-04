import React, { FC } from 'react';
import Link from 'next/link';

import { LinkWrapperProps } from '../types';

export const LinkWrapper: FC<LinkWrapperProps> = ({
  item,
  onClick,
  children,
}) => (
  <>
    {item.children?.length ? (
      children
    ) : (
      <Link
        href={`/catalog/${item.slug}?page=1&order=byPopularDown`}
        key={item.slug}
      >
        <a>
          <div onClick={onClick}>{children}</div>
        </a>
      </Link>
    )}
  </>
);
