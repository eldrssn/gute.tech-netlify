import React, { FC, useCallback } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

import { setSmoothScroll } from 'utility/utils/setSmoothScroll';

import { TabProps } from 'types/productTypes';
import styles from './tabFAQ.module.css';

export const TabFAQ: FC<TabProps> = ({ content }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setSmoothScroll(event.currentTarget);
    };

  const getIconClasses = useCallback(
    (row) => {
      return expanded === row
        ? [styles.accordionSummary, styles.accordionSummaryExpanded].join(' ')
        : styles.accordionSummary;
    },
    [expanded],
  );
  if (!Array.isArray(content)) {
    return <p>{content}</p>;
  }

  return (
    <Box className={styles.accordionList}>
      {content.map(([question, answer]) => (
        <Accordion
          disableGutters
          expanded={expanded === question}
          onChange={handleChange(question)}
          TransitionProps={{ unmountOnExit: true }}
          className={styles.accordionItem}
          key={question}
        >
          <AccordionSummary id={question} className={getIconClasses(question)}>
            <p className={styles.accordionSummaryText}>{question}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className={styles.accordionDetails}>{answer}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
