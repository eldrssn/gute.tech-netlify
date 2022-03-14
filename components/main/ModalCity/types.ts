type TFormData = {
  cityName: string;
};

type TCitiesOption = {
  regions: {
    id: number;
    regionName: string;
    cities: {
      id: number;
      cityName: string;
    }[];
  }[];
};

export type { TFormData, TCitiesOption };
