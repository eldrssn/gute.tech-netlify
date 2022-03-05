import React, { FC, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TabContentByType } from 'components/TabContentByType';

import {
  DescriptionType,
  DescriptionTypes,
  TabsProps as Props,
} from 'types/productTypes';
import { DESCRIPTION_TYPE_NAMES, TAB_NAME_BY_TYPE } from 'utils/constants';

import styles from './tabsDesktopView.module.css';

export const TabsDesktopView: FC<Props> = ({ productInfo }) => {
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
            {DESCRIPTION_TYPE_NAMES.map((type: DescriptionType) => (
              <Tab
                className={styles.tabTittle}
                key={type}
                label={TAB_NAME_BY_TYPE[type]}
                value={type}
              />
            ))}
          </TabList>
        </Box>

        {DESCRIPTION_TYPE_NAMES.map((type: DescriptionType) => (
          <TabPanel className={styles.tabPanel} key={type} value={type}>
            <TabContentByType type={type} content={productInfo[type]} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
