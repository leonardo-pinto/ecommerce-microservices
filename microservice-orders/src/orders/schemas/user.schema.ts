import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;
}
