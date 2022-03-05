import React, { FC } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

import { TabContentByType } from 'components/TabContentByType';
import { DESCRIPTION_TYPE_NAMES, TAB_NAME_BY_TYPE } from 'utils/constants';
import { DescriptionType, TabsProps as Props } from 'types/productTypes';

export const TabsMobileView: FC<Props> = ({ productInfo }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // !TODO: стили
  return (
    <Box>
      {DESCRIPTION_TYPE_NAMES.map((type: DescriptionType) => (
        <Accordion
          disableGutters
          expanded={expanded === type}
          onChange={handleChange(type)}
          TransitionProps={{ unmountOnExit: true }}
          key={type}
        >
          <AccordionSummary>
            <p>{TAB_NAME_BY_TYPE[type]}</p>
          </AccordionSummary>
          <AccordionDetails>
            <TabContentByType type={type} content={productInfo[type]} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
