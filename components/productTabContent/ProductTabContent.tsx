import React from 'react';

import { ProductTabCharacteristic } from 'components/productTabCharacteristic';
import { ProductTabQuestionsAndAnswers } from 'components/productTabQuestionsAndAnswers';

import { TYPES } from 'utils/constants';
import { ContentTabType } from 'types/productTypes';

import { ProductTabContentType } from './types';

export const ProductTabContent: React.FC<ProductTabContentType> = ({
  type,
  content,
}) => {
  const typeActions = {
    [TYPES.characteristic]: (content: ContentTabType) => (
      <ProductTabCharacteristic content={content} />
    ),
    [TYPES.description]: (content: ContentTabType) => <p>{content}</p>,
    [TYPES.installation]: (content: ContentTabType) => <p>{content}</p>,
    [TYPES.questionsAndAnswers]: (content: ContentTabType) => (
      <ProductTabQuestionsAndAnswers content={content} />
    ),
  };

  return typeActions[type as TYPES] && typeActions[type as TYPES](content);
};
