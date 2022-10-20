import { OrderStatusEnum } from '../../src/orders/enums/order-status.enum';

interface Order {
  productsData: [
    {
      id: string;
      quantity: number;
      price: number;
    },
  ];
  user: {
    userId: string;
    email: string;
    name: string;
  };
  date: Date;
  totalPrice: number;
  status: OrderStatusEnum;
}

export const orderMock = (): Order => ({
  ...{
    productsData: [
      {
        id: 'any_id',
        quantity: 1000,
        price: 100,
      },
    ],
    user: {
      userId: 'any_userId',
      email: 'any_email@mail.com',
      name: 'any_name',
    },
    date: new Date(),
    totalPrice: 100000,
    status: OrderStatusEnum.AWAITING_PAYMENT,
  },
});
