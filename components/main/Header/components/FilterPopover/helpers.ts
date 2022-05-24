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

export { filterData };
