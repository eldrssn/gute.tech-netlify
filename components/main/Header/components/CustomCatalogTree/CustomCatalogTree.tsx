import React, { FC } from 'react';

import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem';

import { InnerContent } from './components/InnerContent';

const CustomContent = React.forwardRef(InnerContent);

const CustomCatalogTree: FC<TreeItemProps> = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);
export { CustomCatalogTree };
