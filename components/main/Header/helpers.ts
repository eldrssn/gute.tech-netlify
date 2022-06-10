const addItemToLocaleStorage = ({ slug, title }: Record<string, string>) => {
  try {
    localStorage.setItem(slug, title);
  } catch (error) {
    if (error == 'QUOTA_EXCEEDED_ERR') {
      console.warn('Не достаточно места в localStorage');
    }
  }
};

const getYearsInfo = (years: number[]) =>
  years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : `${years[0]}`;

export { addItemToLocaleStorage, getYearsInfo };
