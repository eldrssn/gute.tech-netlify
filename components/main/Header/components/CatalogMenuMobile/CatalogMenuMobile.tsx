import React, { FC } from 'react';

import classnames from 'classnames/bind';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { catalogData } from 'mock/catalogData';
import { CustomButton } from 'components/ui/CustomButton';

import { CustomCatalogTree } from '../CustomCatalogTree';

import { CatalogMenuProps } from './types';
import styles from './catalogMenuMobile.module.css';

const cn = classnames.bind(styles);

export const CatalogMenuMobile: FC<CatalogMenuProps> = ({ handleClose }) => (
  <Container className={styles.mainContainer} disableGutters>
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
      {catalogData.map((item) => (
        <CustomCatalogTree key={item.id} nodeId={item.id} label={item.title}>
          {item.children?.map((child) => (
            <CustomCatalogTree
              key={child.id}
              nodeId={child.id}
              label={child.title}
            >
              {child.children?.map((subchild) => (
                <CustomCatalogTree
                  key={subchild.id}
                  nodeId={subchild.id}
                  label={subchild.title}
                />
              ))}
            </CustomCatalogTree>
          ))}
        </CustomCatalogTree>
      ))}
    </TreeView>
  </Container>
);
