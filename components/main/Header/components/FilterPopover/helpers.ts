import { ListOptionsItemData } from 'api/models/transport';

const filterData = (searchValue: string, data: ListOptionsItemData[]) => {
  const filteredData = data.filter((optionItem) => {
    const optionItemTitleString = optionItem.title.toString();
    const lowerCaseOptionItemTitle = optionItemTitleString
      .toLowerCase()
      .slice(0, searchValue.length);
    const lowerCaseSearchValue = searchValue.toString().toLowerCase();

    return lowerCaseOptionItemTitle == lowerCaseSearchValue;
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
