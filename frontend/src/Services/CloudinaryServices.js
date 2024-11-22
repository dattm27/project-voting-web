import cloudinary from 'cloudinary'

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class CloudinaryServices {
    static instance;

    constructor() {
        if (CloudinaryServices.instance) {
            return CloudinaryServices.instance;
        }
        CloudinaryServices.instance = this;
    }

    static getInstance() {
        if (!CloudinaryServices.instance) {
            CloudinaryServices.instance = new CloudinaryServices();
        }
        return CloudinaryServices.instance;
    }

    async uploadImage(base64) {
        try {
            const file = `data:image/jpeg;base64,${base64}`;
            const result = await cloudinary.uploader.upload(file, {
                folder: 'photos',
                use_filename: true,
            });
            return { photoLink: result.secure_url, public_id: result.public_id };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    async uploadImageByFile(file){
        try {
            const result = await cloudinary.uploader.upload(file, {
                folder: 'photos',
                use_filename: true,
            });
            return { photoLink: result.secure_url, public_id: result.public_id };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    async deleteImageById(publicId) {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }

    async deleteImageByUrl(url) {
        try {
            const publicId = url.split('/').pop();
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }
}

module.exports = CloudinaryServices;