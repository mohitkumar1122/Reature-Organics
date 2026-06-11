import mongoose, { Schema, Document } from "mongoose";
import { Product } from "./Product";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    images: [{ type: String }],
    isVerifiedPurchase: { type: Boolean, default: false },
    helpfulVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ReviewSchema.statics.calculateAverageRating = async function (productId: mongoose.Types.ObjectId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        reviewsCount: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: parseFloat(stats[0].averageRating.toFixed(1)),
      reviewsCount: stats[0].reviewsCount,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 5,
      reviewsCount: 0,
    });
  }
};

ReviewSchema.post("save", async function (this: any) {
  const ReviewModel = this.constructor as any;
  await ReviewModel.calculateAverageRating(this.product);
});

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
