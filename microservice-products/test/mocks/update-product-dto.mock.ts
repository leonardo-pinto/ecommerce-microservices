interface UpdateProductDto {
  price: number;
  quantity: number;
}

export const updateProductDtoMock = (): UpdateProductDto => ({
  ...{
    price: 100,
    quantity: 500,
  },
});
