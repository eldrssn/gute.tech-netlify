import { Order } from 'api/models/user';
import { ITEMS_PER_PAGE } from './constants';

const getFilteredOrders = (searchValue: string, orders: Order[]) =>
  orders.filter((order) => {
    const lowerCaseOrderNumber = order.id.toString().toLocaleLowerCase();
    const lowerCaseSearchValue = searchValue.toLocaleLowerCase();

    return lowerCaseOrderNumber.indexOf(lowerCaseSearchValue) >= 0;
  });

const getLinkToOrderPage = (order: Order) => `orders/${order.id}`;

const isNotEnoughtItems = (total: number) => total <= ITEMS_PER_PAGE;

export { getLinkToOrderPage, isNotEnoughtItems, getFilteredOrders };
