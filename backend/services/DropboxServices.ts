// import { Dropbox } from 'dropbox';
// import fs from 'fs';

// export class DropBoxServices {
//   private dbx: Dropbox;

//   constructor() {
//     this.dbx = new Dropbox({ accessToken: 'sl.CAxy8SttBO4FOHgU3lTWES_FqYpBU29F2PIKEuSA2aCTrFRhQG4By-zOcDmKOXOjhZmA3tGI5o4NGRze1Yfw-_whfJJt-hWk1DzsmRuYf8t6orfNYsEfOW7wtKBgdRNkpmM7ZPr-_L-Pzn_PK3P34vw' });
//   }  

//   async function uploadFile(localFilePath: string, remoteFilePath: string) {
//   try {
//     const file = await dbx.filesUpload({
//       path: remoteFilePath,
//       contents: fs.readFileSync(localFilePath),
//       mode: { '.tag': 'overwrite' }
//     });
//     const sharingInfo = await this.dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath });
//     console.log('File uploaded successfully:', file.result.name);

//     // Tạo link chia sẻ công khai
//     const sharingInfo = await dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath });
//     console.log('Shared link:', sharingInfo.result.url);
//   } catch (error) {
// async convertBase64ToFile(base64: string, remoteFilePath: string) {
//   }
// }

// async function convertBase64ToFile(base64: string, remoteFilePath: string) {
//   try {
//     const file = await dbx.filesUpload({
//       path: remoteFilePath,
//       contents: Buffer.from(base64, 'base64'),
//       mode: { '.tag': 'overwrite' }
//     const sharingInfo = await this.dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath })
//       .then((response: any) => {
//     console.log('File uploaded successfully:', file.result.name);

//     const sharingInfo = await dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath })
//       .then(response => {
//         const sharedLinkMetadata = response.result;
//         console.log('Shared link:', sharedLinkMetadata.url); // Hoặc sharedLinkMetadata.sharingUrl
//       })

//   }
//   catch (error) {
// convertFileToBase64(localFilePath: string) {
//   }
// }

// function convertFileToBase64(localFilePath: string) {
//   var file = fs.readFileSync(localFilePath);
// autoGenerateFileName(file: string) {
//   return file.toString('base64');
// }

// autoGeneratePhotoDescription() {
//   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file;
// }

// function autoGeneratePhotoDescription() {
//   return 'Photo description';
// }
// }

import { Dropbox } from 'dropbox';
import fs from 'fs';

export class DropBoxServices {
  private dbx: Dropbox;
  private remoteFilePath = '/';

  constructor() {
    this.dbx = new Dropbox({ accessToken: 'sl.CAxy8SttBO4FOHgU3lTWES_FqYpBU29F2PIKEuSA2aCTrFRhQG4By-zOcDmKOXOjhZmA3tGI5o4NGRze1Yfw-_whfJJt-hWk1DzsmRuYf8t6orfNYsEfOW7wtKBgdRNkpmM7ZPr-_L-Pzn_PK3P34vw' });
  }

  async uploadFile(localFilePath: string, remoteFilePath: string) {
    try {
      const contents = fs.readFileSync(localFilePath);
      const file = await this.dbx.filesUpload({
        path: remoteFilePath,
        contents,
        mode: { '.tag': 'overwrite' },
      });

      const sharingInfo = await this.dbx.sharingCreateSharedLinkWithSettings({
        path: remoteFilePath,
      });
      console.log('File uploaded successfully:', file.result.name);
      console.log('Shared link:', sharingInfo.result.url);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  // Implement convertBase64ToFile here (refer to Dropbox API docs)
  async convertBase64ToFile(base64: string ) {
    try {
      const remoteFilePath = this.remoteFilePath + this.autoGenerateFileName();
      const description = this.autoGeneratePhotoDescription();
      const file = await this.dbx.filesUpload({
        path: remoteFilePath,
        contents: Buffer.from(base64, 'base64'),
        mode: { '.tag': 'overwrite' }
      });
      const sharingInfo = await this.dbx.sharingCreateSharedLinkWithSettings({ path: remoteFilePath });
      const photoLink = sharingInfo.result.url;
      return { photoLink: photoLink, photoDescription: description };
    }
    catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  // Implement convertFileToBase64 here (use fs.readFileSync and Buffer.from)

  // Consider using a library for generating unique filenames
  autoGenerateFileName() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Improve autoGeneratePhotoDescription to be more descriptive
  autoGeneratePhotoDescription() : string{
    return 'Photo description';
  }
}