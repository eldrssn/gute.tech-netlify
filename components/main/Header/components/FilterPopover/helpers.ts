import { ListOptionsItemData } from 'api/models/transport';

const filterData = (searchValue: string, data: ListOptionsItemData[]) => {
  const filteredData = data.filter((optionItem) => {
    const optionItemTitleString = optionItem.title.toString();
    const lowerCaseOptionItemTitle = optionItemTitleString.toLowerCase();
    const lowerCaseSearchValue = searchValue.toString().toLowerCase();

    return lowerCaseOptionItemTitle.indexOf(lowerCaseSearchValue || '') >= 0;
  });

  return filteredData;
};

const checkBrandsList = (
  data: ListOptionsItemData[],
  activeTransportType: string,
) => {
  if (!data[0]?.brands) {
    return data;
  }

  const findData = data.find(
    (transportType) => transportType.slug === activeTransportType,
  );

  return findData?.brands ? findData.brands : [];
};

export { filterData, checkBrandsList };
