import { Cloudinary } from '@cloudinary/url-gen';

class CloudinaryServices {
    static instance;

    cloudinary;

    constructor() {
        if (CloudinaryServices.instance) {
            return CloudinaryServices.instance;
        }

        this.cloudinary = new Cloudinary({
            cloud: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            },
        });
        CloudinaryServices.instance = this;
    }

    static getInstance() {
        if (!CloudinaryServices.instance) {
            CloudinaryServices.instance = new CloudinaryServices();
        }
        return CloudinaryServices.instance;
    }

    async uploadImage(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            console.log('Image uploaded:', data);
            return { photoLink: data.secure_url, public_id: data.public_id };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
}

export  {CloudinaryServices};
