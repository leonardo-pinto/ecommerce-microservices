import { PaymentStatusEnum } from '../enums/payment-status.enum';
import { ShippingData } from './shipping-data.interface';
import { User } from './user.interface';

export class Payment {
  orderId: string;
  shippingData: ShippingData;
  user: User;
  status: PaymentStatusEnum;
  date: Date;
}
