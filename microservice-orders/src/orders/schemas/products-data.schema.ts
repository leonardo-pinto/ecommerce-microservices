import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ProductsData {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}
