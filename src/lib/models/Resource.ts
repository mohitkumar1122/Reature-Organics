import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  description: string;
  fileUrl?: string; // For PDFs
  videoUrl?: string; // For YouTube or tutorial links
  category: "Brochure" | "Catalog" | "User Guide" | "Tutorial";
  type: "pdf" | "video";
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: String,
    videoUrl: String,
    category: {
      type: String,
      enum: ["Brochure", "Catalog", "User Guide", "Tutorial"],
      required: true,
    },
    type: { type: String, enum: ["pdf", "video"], default: "pdf" },
  },
  { timestamps: true }
);

export const Resource = mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);
