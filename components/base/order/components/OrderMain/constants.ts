import { Payment } from 'api/models/user';

const paymentType = {
  [Payment.CARD]: 'Карта',
  [Payment.CASH]: 'Наличные',
};

const PAID_CONFIRM = 'Оплачено';
const PAID_DISPROVE = 'Неоплачено';

export { paymentType, PAID_CONFIRM, PAID_DISPROVE };
