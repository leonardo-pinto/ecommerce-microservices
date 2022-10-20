import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { getModelToken } from '@nestjs/mongoose';
import { productsMock } from '../mocks/products.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  class productModelMock {
    constructor(private _data: any) {}
    static save = jest.fn().mockImplementation();
    static find = jest.fn(() => productsMock());
    static findOne = jest.fn(() => productsMock()[0]);
    static findOneAndUpdate = jest.fn(() => productsMock()[0]);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: productModelMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('Definitions', () => {
    test('ProductsService should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getAllProducts()', () => {
    test('Should return products list', async () => {
      const result = await service.getAllProducts();
      expect(result).toEqual(productsMock());
      expect(result).toHaveLength(2);
    });
  });

  describe('getProductById()', () => {
    test('Should return product', async () => {
      const findOneSpy = jest.spyOn(productModelMock, 'findOne');
      const result = await service.getProductById('valid_id');
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ _id: 'valid_id' });
      expect(result).toEqual(productsMock()[0]);
    });

    test('Should throw if product is not found', async () => {
      jest
        .spyOn(productModelMock, 'findOne')
        .mockImplementationOnce(() => null);
      const promise = service.getProductById('invalid_id');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('updateProduct()', () => {
    test('Should call findOneAndUpdate with correct parameters', async () => {
      const findOneAndUpdateSpy = jest.spyOn(
        productModelMock,
        'findOneAndUpdate',
      );
      await service.updateProduct(10, 'valid_id');
      expect(findOneAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
        { _id: 'valid_id' },
        {
          $inc: { quantity: -10 },
        },
      );
    });

    test('Should throw if findOneAndUpdate returns null', async () => {
      jest
        .spyOn(productModelMock, 'findOneAndUpdate')
        .mockImplementationOnce(() => null);
      const promise = service.updateProduct(10, 'invalid_id');
      await expect(promise).rejects.toThrow();
    });
  });
});
