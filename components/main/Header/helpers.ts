const getYearsInfo = (years: number[]) =>
  years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : `${years[0]}`;

export { getYearsInfo };
