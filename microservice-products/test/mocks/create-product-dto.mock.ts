interface CreateProductDto {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export const createProductDtoMock = (): CreateProductDto => ({
  ...{
    name: 'any_product',
    price: 100,
    quantity: 500,
    description: 'any_description',
  },
});
