import React, { FC, useCallback, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';

import classnames from 'classnames/bind';

import { descriptionTypeName, tabNameByType } from 'constants/variables';
import { DescriptionType, TabsProps } from 'types/product';

import { TabContentByType } from '../TabContentByType';

import { REVIEWS_ID } from './constants';
import { scrollNodeToViewbox } from './helpers';
import styles from './tabsMobileView.module.scss';

const cn = classnames.bind(styles);

const TabsMobileView: FC<TabsProps> = ({
  productInfo,
  isToReview,
  setIsToReview,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    if (isToReview) {
      setExpanded('reviews');
      setIsToReview(false);
      const node = document.querySelector(`#${REVIEWS_ID}`);
      scrollNodeToViewbox(node);
    }
  }, [isToReview, setIsToReview]);

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
    <Box className={styles.mainContainer} id={REVIEWS_ID}>
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
            <TabContentByType type={type} content={productInfo} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export { TabsMobileView };
