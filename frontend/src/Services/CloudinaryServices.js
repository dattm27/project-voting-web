

async function uploadImageByFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'preset');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dodhlbcqz/image/upload`,
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

        return { photoLink: data.secure_url, public_id: data.public_id };
    } catch (error) {
        console.error('Lỗi khi upload image:', error);
        throw error;
    }
}

export { uploadImageByFile };