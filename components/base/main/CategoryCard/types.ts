export type Props = {
  name: string;
  quantity: number | string;
  image: string;
  url: string;
};

export type Category = {
  id: number;
  image: string;
  name: string;
  quantity: number;
  sort: number;
  children?: Category[];
  url: string;
};
