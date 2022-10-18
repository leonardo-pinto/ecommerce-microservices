import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
