import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ProductsData } from './products-data.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop()
  productsData: ProductsData[];

  @Prop()
  user: User;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
