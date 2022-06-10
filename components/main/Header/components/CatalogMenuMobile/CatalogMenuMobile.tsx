import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classnames from 'classnames/bind';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { clearTransportId } from 'store/reducers/transport/actions';
import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { SCROLL_DELAY } from 'constants/variables';

import { CustomCatalogTree } from '../CustomCatalogTree';

import { LinkWrapper } from './components/LinkWrapper';
import { CatalogMenuProps } from './types';
import styles from './catalogMenuMobile.module.scss';

const cn = classnames.bind(styles);

const CatalogMenuMobile: FC<CatalogMenuProps> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector(selectCategoriesTreeList);

  const handleClickCategory = () => {
    setTimeout(handleClose, SCROLL_DELAY);
    dispatch(clearTransportId());
  };

  return (
    <Container className={styles.mainContainer}>
      <Box className={styles.stickyButton}>
        <CustomButton onClick={handleClose} customStyles={styles.catalogButton}>
          <ArrowBackIosIcon />
          <p>Каталог товаров</p>
        </CustomButton>
        <Divider className={styles.divider} />
      </Box>

      <TreeView
        aria-label='catalog menu navigation'
        defaultCollapseIcon={
          <ArrowForwardIosIcon
            className={cn(styles.icon, styles.icon_collapse)}
          />
        }
        defaultExpandIcon={<ArrowForwardIosIcon className={styles.icon} />}
        className={styles.treeViewContainer}
      >
        {categories.map((item) => (
          <LinkWrapper
            onClick={handleClickCategory}
            key={item.slug}
            item={item}
          >
            <CustomCatalogTree
              key={item.slug}
              nodeId={item.slug}
              label={item.title}
            >
              {item.children?.map((child) => (
                <LinkWrapper
                  onClick={handleClickCategory}
                  key={child.slug}
                  parentSlug={item.slug}
                  item={child}
                >
                  <CustomCatalogTree
                    key={child.slug}
                    nodeId={child.slug}
                    label={child.title}
                  />
                </LinkWrapper>
              ))}
            </CustomCatalogTree>
          </LinkWrapper>
        ))}
      </TreeView>
    </Container>
  );
};

export { CatalogMenuMobile };
