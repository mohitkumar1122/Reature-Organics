import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "flat";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, index: true, uppercase: true },
    discountType: { type: String, enum: ["percentage", "flat"], default: "percentage" },
    value: { type: Number, required: true, min: 0 },
    minOrderValue: { type: Number, default: 0, min: 0 },
    maxDiscount: Number, // Cap on maximum discount if percentage based
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
