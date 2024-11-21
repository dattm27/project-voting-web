import * as cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export class CloudinaryServices {
  async uploadImage(base64: string): Promise<{photoLink: string, public_id: string}> {
    try {
      const file = `data:image/jpeg;base64,${base64}`;
      const result = await cloudinaryV2.uploader.upload(file, {
        folder: 'photos',
        use_filename: true,
      });
      return {photoLink: result.secure_url, public_id: result.public_id};
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinaryV2.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}