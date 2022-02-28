import React from 'react';
import { INPUT_IDS } from './types';

export const useLocalRefs = () => {
  const refs = {
    [INPUT_IDS.CAR_SELECTION_ID]: React.useRef(),
    [INPUT_IDS.MODEL_SELECTION_ID]: React.useRef(),
    [INPUT_IDS.YEAR_SELECTION_ID]: React.useRef(),
  };

  return refs;
};

export default { useLocalRefs };
