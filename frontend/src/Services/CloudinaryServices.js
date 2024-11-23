import { Cloudinary } from '@cloudinary/url-gen';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const cloud_name = 'dodhlbcqz';
const api_key = '681929934577739';
const api_secret = 'ogoWwduOxHzGKTV0zoutoincNwA';
const preset = 'preset';

class CloudinaryServices {
    static instance;

    constructor() {
        if (CloudinaryServices.instance) {
            return CloudinaryServices.instance;
        }

        this.cloudinary = new Cloudinary({
            cloud: {
                cloudName: cloud_name,
                apiKey: api_key,
                apiSecret: api_secret,
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

    async uploadImage(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File không tồn tại: ${filePath}`);
            }

            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath));
            formData.append('upload_preset', preset);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const error = await response.json();
                console.error('Lỗi từ Cloudinary:', error);
                throw new Error('Upload image failed');
            }

            const data = await response.json();
            console.log('Upload thành công:', data);

            return { photoLink: data.secure_url, public_id: data.public_id };
        } catch (error) {
            console.error('Lỗi khi upload image:', error);
            throw error;
        }
    }

    async uploadImageByFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const error = await response.json();
                console.error('Lỗi từ Cloudinary:', error);
                throw new Error('Upload image failed');
            }

            const data = await response.json();
            console.log('Upload thành công:', data);

            return { photoLink: data.secure_url, public_id: data.public_id };
        } catch (error) {
            console.error('Lỗi khi upload image:', error);
            throw error;
        }
    }
}

export { CloudinaryServices };

// Sử dụng
const cloudinary = CloudinaryServices.getInstance();
const filePath = "C:\\Users\\letua\\OneDrive - Hanoi University of Science and Technology\\HUST\\20241_web\\New folder\\project-voting-web\\frontend\\src\\Assets\\images\\make_vote.png"; // Đường dẫn tuyệt đối

cloudinary
    .uploadImage(filePath)
    .then((result) => console.log("Upload result:", result))
    .catch((error) => console.error("Upload error:", error));
