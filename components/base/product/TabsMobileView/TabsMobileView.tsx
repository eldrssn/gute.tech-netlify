import React, { FC } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

import { TabContentByType } from '../TabContentByType';
import { descriptionTypeName, tabNameByType } from 'utility/utils/constants';
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
      {descriptionTypeName.map((type: DescriptionType) => (
        <Accordion
          disableGutters
          expanded={expanded === type}
          onChange={handleChange(type)}
          TransitionProps={{ unmountOnExit: true }}
          key={type}
        >
          <AccordionSummary>
            <p>{tabNameByType[type]}</p>
          </AccordionSummary>
          <AccordionDetails>
            <TabContentByType type={type} content={productInfo[type]} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
