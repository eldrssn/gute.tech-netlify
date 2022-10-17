import { ProductTransportListResponseData } from 'api/models/catalog';
import { StoreError } from 'store/types';

import { optionColumn } from '../../types';

const attentionByOption = {
  [optionColumn.BRAND]: 'Выберите бренд',
  [optionColumn.MODEL]: 'Выберите бренд',
  [optionColumn.YEAR]: 'Выберите модель',
  [optionColumn.TRANSPORT]: 'Выберите год',
};

const getDisplayedInformation = (
  data: ProductTransportListResponseData[] | null,
  option: optionColumn,
  error: StoreError | null,
) => {
  if (data && data.length > 0) {
    return data;
  }

  if (data && data.length <= 0) {
    return 'Ничего не найдено';
  }

  if (error) {
    return 'произошла ошибка';
  }

  return attentionByOption[option];
};

export { getDisplayedInformation };
