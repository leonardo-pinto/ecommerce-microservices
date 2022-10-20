import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';

export const createOrderDtoMock = (): CreateOrderDto => ({
  ...{
    productsData: [
      {
        id: 'any_id',
        quantity: 10,
      },
    ],
    user: {
      userId: 'any_userId',
      email: 'any_email@mail.com',
      name: 'John Doe',
    },
  },
});
