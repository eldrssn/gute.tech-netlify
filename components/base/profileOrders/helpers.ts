import { Order } from 'api/models/user';
import { ITEMS_PER_PAGE } from './constants';

const getLinkToOrderPage = (order: Order) => `orders/${order.id}`;

const isNotEnoughtItems = (total: number) => total <= ITEMS_PER_PAGE;

export { getLinkToOrderPage, isNotEnoughtItems };
