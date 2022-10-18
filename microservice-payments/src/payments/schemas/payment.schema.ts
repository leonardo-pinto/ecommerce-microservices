import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ShippingData } from './shipping-data.schema';
import { User } from './user.schema';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true, versionKey: false })
export class Payment {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  shippingData: ShippingData;

  @Prop({ required: true })
  user: User;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: Date.now })
  date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
