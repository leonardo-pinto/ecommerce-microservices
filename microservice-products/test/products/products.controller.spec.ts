import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { ProductsController } from '../../src/products/products.controller';
import { getModelToken } from '@nestjs/mongoose';
import { createProductDtoMock } from 'test/mocks/create-product-dto.mock';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  class productModelMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: productModelMock,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('Definitions', () => {
    test('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });
});
