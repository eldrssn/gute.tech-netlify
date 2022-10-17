import { Properties, optionColumn, optionColumnData } from './types';

const PropertyNameByType = {
  [Properties.vendor_code]: 'Артикул',
  [Properties.manufacturer]: 'Производитель',
};

const installationColumns: optionColumnData[] = [
  {
    name: 'brandSlug',
    optionColumn: optionColumn.BRAND,
    placeholder: 'Марка',
  },
  {
    name: 'modelSlug',
    optionColumn: optionColumn.MODEL,
    placeholder: 'Модель',
  },
  {
    name: 'yearSlug',
    optionColumn: optionColumn.YEAR,
    placeholder: 'Год',
  },
  {
    name: 'transportSlug',
    optionColumn: optionColumn.TRANSPORT,
    placeholder: 'Транспорт доступный для установки',
  },
];

export { PropertyNameByType, installationColumns };
