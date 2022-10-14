import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { getModelToken } from '@nestjs/mongoose';
import { productsMock } from './mocks/products.mock';
import { updateProductDtoMock } from './mocks/update-product-dto.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  class productModelMock {
    constructor(private _data: any) {}
    static save = jest.fn().mockImplementation();
    static find = jest.fn(() => productsMock());
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

  describe('updateProduct()', () => {
    test('Should call findOneAndUpdate with correct parameters', async () => {
      const findOneAndUpdateSpy = jest.spyOn(
        productModelMock,
        'findOneAndUpdate',
      );
      await service.updateProduct(updateProductDtoMock(), 'valid_id');
      expect(findOneAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
        { _id: 'valid_id' },
        {
          $set: {
            price: 100,
            quantity: 500,
          },
        },
      );
    });

    test('Should throw if findOneAndUpdate returns null', async () => {
      jest
        .spyOn(productModelMock, 'findOneAndUpdate')
        .mockImplementationOnce(() => null);
      const promise = service.updateProduct(updateProductDtoMock(), 'valid_id');
      await expect(promise).rejects.toThrow();
    });
  });
});
