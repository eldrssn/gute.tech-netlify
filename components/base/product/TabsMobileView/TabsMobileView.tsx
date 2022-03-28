import React, { FC, useCallback } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import classnames from 'classnames/bind';

import { TabContentByType } from '../TabContentByType';
import { descriptionTypeName, tabNameByType } from 'constants/variables';
import { DescriptionType, TabsProps } from 'types/productTypes';

import styles from './tabsMobileView.module.scss';

const cn = classnames.bind(styles);

export const TabsMobileView: FC<TabsProps> = ({ productInfo }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getIconClasses = useCallback(
    (row) => {
      return expanded === row
        ? styles.accordionSummaryExpanded
        : styles.accordionSummary;
    },
    [expanded],
  );

  return (
    <Box>
      {descriptionTypeName.map((type: DescriptionType) => (
        <Accordion
          disableGutters
          expanded={expanded === type}
          onChange={handleChange(type)}
          TransitionProps={{ unmountOnExit: true }}
          key={type}
          className={styles.accordion}
        >
          <AccordionSummary
            className={cn(styles.accordionSummary, getIconClasses(type))}
          >
            <p className={styles.accordionSummaryText}>{tabNameByType[type]}</p>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <TabContentByType type={type} content={productInfo[type]} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
