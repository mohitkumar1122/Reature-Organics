import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  category: "Ayurveda" | "Nutrition" | "Wellness" | "Fitness" | "Herbal Remedies";
  tags: string[];
  seoKeywords: string[];
  readTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true, default: "Reature Ayurvedic Expert" },
    category: {
      type: String,
      enum: ["Ayurveda", "Nutrition", "Wellness", "Fitness", "Herbal Remedies"],
      default: "Ayurveda",
    },
    tags: [{ type: String }],
    seoKeywords: [{ type: String }],
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
