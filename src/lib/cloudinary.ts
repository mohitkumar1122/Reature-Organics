import { v2 as cloudinary } from "cloudinary";

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function uploadImage(fileStr: string, folder: string): Promise<string> {
  if (isCloudinaryConfigured) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder,
      });
      return uploadResponse.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed, using fallback:", error);
    }
  }

  // Fallback for mock uploads
  if (fileStr.startsWith("data:")) {
    return fileStr;
  }
  return fileStr || "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600";
}
