import React, { FC, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TabContentByType } from '../TabContentByType';

import { DescriptionType, DescriptionTypes, TabsProps } from 'types/product';
import { descriptionTypeName, tabNameByType } from 'constants/variables';

import styles from './tabsDesktopView.module.scss';

export const TabsDesktopView: FC<TabsProps> = ({ productInfo }) => {
  const [tabType, setTabType] = useState<DescriptionType>(
    DescriptionTypes.characteristic,
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: DescriptionTypes,
  ) => {
    setTabType(newValue);
  };

  // !TODO: написать глобальные стили для заголовков табов
  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
      }}
    >
      <TabContext value={tabType}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {descriptionTypeName.map((type: DescriptionType) => (
              <Tab
                className={styles.tabTittle}
                key={type}
                label={tabNameByType[type]}
                value={type}
              />
            ))}
          </TabList>
        </Box>

        {descriptionTypeName.map((type: DescriptionType) => (
          <TabPanel className={styles.tabPanel} key={type} value={type}>
            <TabContentByType type={type} content={productInfo[type]} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
