interface Product {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export const productsMock = (): Product[] => [
  {
    name: 'any_product',
    price: 100,
    quantity: 500,
    description: 'any_description',
  },
  {
    name: 'other_product',
    price: 60,
    quantity: 200,
    description: 'other_description',
  },
];
