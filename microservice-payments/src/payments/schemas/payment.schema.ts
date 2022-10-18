import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      _id: false,
    },
    shippingData: {
      name: String,
      address: String,
      number: Number,
      city: String,
      zipCode: Number,
      _id: false,
    },
    user: {
      userId: String,
      email: String,
      name: String,
      _id: false,
    },
    status: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true, collection: 'payments', versionKey: false },
);
