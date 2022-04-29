import React, { FC, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { DescriptionType, DescriptionTypes, TabsProps } from 'types/product';
import { descriptionTypeName, tabNameByType } from 'constants/variables';

import { TabContentByType } from '../TabContentByType';

import styles from './tabsDesktopView.module.scss';

export const TabsDesktopView: FC<TabsProps> = (props) => {
  const [tabType, setTabType] = useState<DescriptionType>(
    DescriptionTypes.properties,
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: DescriptionTypes,
  ) => {
    setTabType(newValue);
  };

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
            <TabContentByType type={type} content={props[type]} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
