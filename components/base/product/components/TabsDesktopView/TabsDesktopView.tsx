import React, { FC, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { DescriptionType, DescriptionTypes, TabsProps } from 'types/product';
import { descriptionTypeName, tabNameByType } from 'constants/variables';

import { TabContentByType } from '../TabContentByType';

import { DESKTOP_TABS_ID } from './constants';
import { scrollNodeToViewbox } from './helpers';
import styles from './tabsDesktopView.module.scss';

const TabsDesktopView: FC<TabsProps> = ({
  productInfo,
  isToReview,
  setIsToReview,
}) => {
  const [tabType, setTabType] = useState<DescriptionType>(
    DescriptionTypes.properties,
  );

  useEffect(() => {
    if (isToReview && window) {
      setTabType(DescriptionTypes.reviews);
      setIsToReview(false);
      const node = document.querySelector(`#${DESKTOP_TABS_ID}`);
      scrollNodeToViewbox(node);
    }
  }, [isToReview, setIsToReview]);

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
      id={DESKTOP_TABS_ID}
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
            <TabContentByType type={type} content={productInfo} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export { TabsDesktopView };
