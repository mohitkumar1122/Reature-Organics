import mongoose, { Schema, Document } from "mongoose";

export interface IAddress {
  label: string; // Home, Office, etc.
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault: boolean;
}

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role: "customer" | "admin";
  isVerified: boolean;
  verificationOtp?: string;
  verificationOtpExpires?: Date;
  resetOtp?: string;
  resetOtpExpires?: Date;
  addresses: IAddress[];
  wishlist: mongoose.Types.ObjectId[];
  cart: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
  label: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false },
});

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, default: "" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    isVerified: { type: Boolean, default: false },
    verificationOtp: String,
    verificationOtpExpires: Date,
    resetOtp: String,
    resetOtpExpires: Date,
    addresses: [AddressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    cart: [CartItemSchema],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
