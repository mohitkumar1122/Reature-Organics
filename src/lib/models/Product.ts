import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  usageInstructions: string;
  precautions?: string;
  price: number;
  discountPercentage: number;
  images: string[];
  stock: number;
  category: mongoose.Types.ObjectId;
  brand: string;
  rating: number;
  reviewsCount: number;
  isTrending: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  healthConditions: string[]; // e.g. "Diabetes", "Immunity", etc.
  sku: string;
  specifications: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    benefits: [{ type: String }],
    usageInstructions: { type: String, required: true },
    precautions: String,
    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    images: [{ type: String }],
    stock: { type: Number, required: true, min: 0, default: 10 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: String, required: true, default: "Reature Organic" },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    healthConditions: [{ type: String, index: true }],
    sku: { type: String, required: true, unique: true },
    specifications: { type: Map, of: String, default: {} },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
