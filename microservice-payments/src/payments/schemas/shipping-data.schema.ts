import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ShippingData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;
}
