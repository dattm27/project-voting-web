import {Dropbox} from 'dropbox';
import fs from 'fs';

const dbx = new Dropbox({ accessToken: 'sl.CAxy8SttBO4FOHgU3lTWES_FqYpBU29F2PIKEuSA2aCTrFRhQG4By-zOcDmKOXOjhZmA3tGI5o4NGRze1Yfw-_whfJJt-hWk1DzsmRuYf8t6orfNYsEfOW7wtKBgdRNkpmM7ZPr-_L-Pzn_PK3P34vw' });

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

async function convertBase64ToFile(base64: string, remoteFilePath: string) {
  try {
    const file = await dbx.filesUpload({
      path: remoteFilePath,
      contents: Buffer.from(base64, 'base64'),
      mode: { '.tag': 'overwrite' }
    });

    console.log('File uploaded successfully:', file.result.name);

    const sharingInfo = await dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath })
    .then(response => {
      const sharedLinkMetadata = response.result;
      console.log('Shared link:', sharedLinkMetadata.url); // Hoặc sharedLinkMetadata.sharingUrl
    })
  
  }
  catch (error) {
    console.error('Error uploading file:', error);
  }
}

function convertFileToBase64(localFilePath: string) {
  var file = fs.readFileSync(localFilePath);
  console.log(file);
  return file.toString('base64');
}

function autoGenerateFileName(file: string) {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file;
}

// Ví dụ sử dụng:
//uploadFile('./backend/public/ERD/Backend_ERD.png', '/my_image.jpg');
var file = convertFileToBase64('./backend/public/ERD/Backend_ERD.png');
var remoteFilePath = autoGenerateFileName(file.length.toString());
convertBase64ToFile(file, '/' + remoteFilePath + '.png'); 