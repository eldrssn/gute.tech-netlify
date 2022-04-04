import React, { ForwardRefRenderFunction } from 'react';
import classnames from 'classnames/bind';

import { useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';

import styles from './innerCatalogTree.module.css';

const cn = classnames.bind(styles);

export const InnerContent: ForwardRefRenderFunction<
  unknown,
  TreeItemContentProps
> = (props, ref) => {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  return (
    <div
      className={cn(className, classes.root, styles.catalogList, {
        [classes.expanded]: expanded,
        [styles.catalogItem_expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      onClick={handleExpansionClick}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <Typography component='div' className={styles.catalogItem}>
        {label}
      </Typography>
      <div className={classes.iconContainer}>{icon}</div>
    </div>
  );
};
