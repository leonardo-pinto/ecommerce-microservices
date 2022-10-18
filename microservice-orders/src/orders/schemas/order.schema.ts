import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    productsData: [
      {
        id: String,
        quantity: Number,
        value: Number,
        _id: false,
      },
    ],
    user: {
      userId: String,
      email: String,
      name: String,
      _id: false,
    },
    date: { type: Date, required: true, default: Date.now },
    totalValue: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true, collection: 'orders', versionKey: false },
);
