import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true },
    description: String,
    image: String,
    icon: String, // lucide-react icon name e.g., 'Heart', 'Shield'
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
