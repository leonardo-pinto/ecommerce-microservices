import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../src/orders/orders.service';
import { ClientProxyRMQ } from '../../src/proxyrmq/client-proxy-rmq';
import { orderMock } from '../mocks/order.mock';
import { OrderStatusEnum } from '../../src/orders/enums/order-status.enum';

jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7));

describe('OrdersService', () => {
  let service: OrdersService;
  let clientProxyRMQ: ClientProxyRMQ;

  class orderModelMock {
    static save = jest.fn().mockImplementation();
    static findById = jest.fn(() => orderMock());
    static findOneAndUpdate = jest.fn(() => orderMock());
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        ClientProxyRMQ,
        ConfigService,
        {
          provide: getModelToken('Order'),
          useValue: orderModelMock,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    clientProxyRMQ = module.get<ClientProxyRMQ>(ClientProxyRMQ);
  });

  describe('Definitions', () => {
    test('Should be defined', () => {
      expect(service).toBeDefined();
      expect(clientProxyRMQ).toBeDefined();
    });
  });

  describe('getOrderById()', () => {
    test('Should return order', async () => {
      const findByIdSpy = jest.spyOn(orderModelMock, 'findById');
      const result = await service.getOrderById('valid_id');

      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith({ _id: 'valid_id' });
      expect(result).toEqual(orderMock());
    });

    test('Should throw if order is not found', async () => {
      jest.spyOn(orderModelMock, 'findById').mockImplementationOnce(() => null);
      const promise = service.getOrderById('invalid_id');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('updateOrderStatus()', () => {
    test('Should call findOneAndUpdate with correct parameters', async () => {
      const findOneAndUpdateSpy = jest.spyOn(
        orderModelMock,
        'findOneAndUpdate',
      );
      await service.updateOrderStatus({
        status: OrderStatusEnum.PAID,
        id: 'valid_id',
      });

      expect(findOneAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
        { _id: 'valid_id' },
        { $set: { status: OrderStatusEnum.PAID } },
      );
    });

    test('Should throw if findOneAndUpdate returns null', async () => {
      jest
        .spyOn(orderModelMock, 'findOneAndUpdate')
        .mockImplementationOnce(() => null);
      const promise = service.updateOrderStatus({
        status: OrderStatusEnum.PAID,
        id: 'invalid_id',
      });
      await expect(promise).rejects.toThrow();
    });
  });
});
