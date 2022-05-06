import React, { FC, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';

import { setSmoothScroll } from 'utility/utils';
import { Content, Property, TabProps } from 'types/product';

import styles from './tabFAQ.module.scss';

const TabFAQ: FC<TabProps> = ({ content }) => {
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

  const isContent = (value: Content | Property[]): value is Content => {
    return true;
  };

  if (!content) {
    return <p>Нет данных</p>;
  }

  if (!Array.isArray(content) || !isContent(content)) {
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

export { TabFAQ };
