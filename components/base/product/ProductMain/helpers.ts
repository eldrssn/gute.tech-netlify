import { CategoriesProductReadResponseData } from 'api/models/catalog';

export const createBasketItem = (data: CategoriesProductReadResponseData) => {
  const price = Number(data.price);

  return {
    name: data.title,
    count: 1,
    imagePath: data.images?.length ? data.images[0] : '',
    id: data.vendor_code ? Number(data.vendor_code) : 123,
    price: Number.isNaN(price) ? 0 : Number(price),
  };
};
