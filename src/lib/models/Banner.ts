import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  position: "hero" | "promotional";
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: String,
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, required: true, default: "/" },
    position: { type: String, enum: ["hero", "promotional"], default: "hero" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner = mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);
