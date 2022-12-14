import { CityRequestData } from './user';

type RegionData = {
  title: string;
  cities: CityRequestData[];
};

type BranchOfficeData = {
  id: number;
  terminal_code: string;
  latitude: string;
  longitude: string;
  street: string;
  phone_number: string;
  description: string;
  email: string;
};

type BranchesData = {
  title: string;
  slug: string;
  branches: BranchOfficeData[];
};

export type { RegionData, BranchesData, BranchOfficeData };
