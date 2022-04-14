type CitieData = {
  title: string;
  slug: string;
};

type RegionData = {
  title: string;
  cities: CitieData[];
};

export type { RegionData };
