import React, { FC, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';

import { Content, Property, TabProps } from 'types/product';

import styles from './tabFAQ.module.scss';
import { TabDefault } from '../TabDefault';

const TabFAQ: FC<TabProps> = ({ content }) => {
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

  const isContent = (value: Content | Property[]): value is Content => {
    return true;
  };

  const isProperty = (value: Property[] | Content): value is Property[] => {
    return true;
  };

  if (!content || isProperty(content)) {
    return <p>Нет данных</p>;
  }

  if (!Array.isArray(content) || !isContent(content)) {
    return <p>{content}</p>;
  }

  const renderAccordionItem = ({
    question,
    answer,
  }: Record<string, string>) => (
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
        <TabDefault className={styles.accordionDetails} content={answer} />
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box className={styles.accordionList}>
      {content.map((field) => {
        if (Array.isArray(field)) {
          const [question, answer] = field;
          return renderAccordionItem({ question, answer });
        }

        const { question, answer } = field;
        return renderAccordionItem({ question, answer });
      })}
    </Box>
  );
};

export { TabFAQ };
