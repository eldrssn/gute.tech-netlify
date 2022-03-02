import React, { useCallback } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { ProductContentTabType } from 'types/productTypes';

import styles from './productTabQuestionsAndAnswers.module.css';

export const ProductTabQuestionsAndAnswers: React.FC<ProductContentTabType> = ({
  content,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getIconClasses = useCallback(
    (row) => {
      return expanded === row
        ? [styles.accordionSummary, styles.accordionSummaryExpanded].join(' ')
        : styles.accordionSummary;
    },
    [expanded],
  );

  return Array.isArray(content) ? (
    <Box>
      {content.map((row) => (
        <Accordion
          disableGutters
          expanded={expanded === row[0]}
          onChange={handleChange(row[0])}
          TransitionProps={{ unmountOnExit: true }}
          className={styles.accordionWrapper}
          key={row[0]}
        >
          <AccordionSummary id={row[0]} className={getIconClasses(row[0])}>
            <p className={styles.accordionSummaryText}>{row[0]}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.accordionDetails}>{row[1]}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  ) : (
    <p>{content}</p>
  );
};
