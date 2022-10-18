import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxyRMQ } from 'src/proxyrmq/client-proxy-rmq';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private clientProxyRMQ: ClientProxyRMQ) {}

  private clientProducts = this.clientProxyRMQ.getClientProxyProductsInstance();

  async createProduct(createProductDto: CreateProductDto) {
    this.clientProducts.emit('create-product', createProductDto);
  }

  async getAllProducts(): Promise<Product[]> {
    const result = this.clientProducts.send('get-products', '');
    return await lastValueFrom(result);
  }
}
