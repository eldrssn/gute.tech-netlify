import React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { ProductTabContent } from 'components/productTabContent';
import { TAB_FIELDS, TYPES } from 'utils/constants';
import { ProductTabsType } from './types';

import styles from './productTabs.module.css';

export const ProductTabs: React.FC<ProductTabsType> = ({ productInfo }) => {
  const [tabType, setTabType] = React.useState(TYPES.characteristic);

  const handleChange = (event: React.SyntheticEvent, newValue: TYPES) => {
    setTabType(newValue);
  };

  const types = Object.keys(TAB_FIELDS);

  // !TODO: написать глобальные стили для заголовков табов
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabType}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {types.map((type: string) => (
              <Tab
                className={styles.tabTittle}
                key={type}
                label={TAB_FIELDS[type]}
                value={type}
              />
            ))}
          </TabList>
        </Box>

        {types.map((type: string) => (
          <TabPanel key={type} value={type}>
            <ProductTabContent type={type} content={productInfo[type]} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
