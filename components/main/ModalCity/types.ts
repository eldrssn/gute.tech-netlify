type TFormData = {
  cityName: string;
};

type TCities = {
  id: number;
  cityName: string;
};

type TRegion = {
  id: number;
  regionName: string;
  cities: TCities[];
};

type TCitiesOption = {
  regions: TRegion[];
};

export type { TFormData, TCitiesOption };
