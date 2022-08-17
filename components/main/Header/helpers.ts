import { BranchesData } from 'api/models/regions';

const getYearsInfo = (years: number[]) =>
  years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : `${years[0]}`;

const getCityTitle = (branches: BranchesData[], selectedCitySlug: string) =>
  branches.find((branch) => branch.slug === selectedCitySlug)?.title;

export { getYearsInfo, getCityTitle };
