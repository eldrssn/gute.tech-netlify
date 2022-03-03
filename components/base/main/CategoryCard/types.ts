export type Props = {
  name?: string;
  quantity?: number | string;
  image?: string;
};

export type Category = {
  id: number;
  image: string;
  name: string;
  quantity: number;
  sort: number;
};