import {Dropbox} from 'dropbox';
import fs from 'fs';

const dbx = new Dropbox({ accessToken: 'sl.CAVmzZ6AVIbwSzJDfYvrUylXaVFWr-tARBhrXlJIzVDjja-ufKzWx1AebF9zr0eh-RsR_reJsifzqyvqH0EMGAcTQVkklGyxpetlLOHMKgaZ-im1uTDhNRl5yUPTqRWLmg-Wlvs7-3NN' });

async function uploadFile(localFilePath: string, remoteFilePath: string) {
  try {
    const file = await dbx.filesUpload({
      path: remoteFilePath,
      contents: fs.readFileSync(localFilePath),
      mode: { '.tag': 'overwrite' }
    });

    console.log('File uploaded successfully:', file.result.name);

    // Tạo link chia sẻ công khai
    const sharingInfo = await dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath });
    console.log('Shared link:', sharingInfo.result.url);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Ví dụ sử dụng:
uploadFile('./backend/public/ERD/Backend_ERD.png', '/my_image.jpg');
