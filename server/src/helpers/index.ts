// helper in authentication
// encrypt password

import crypto from 'crypto';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

/**secret to your project */
const SECRET = 'TASNEEM-REST-API';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');

// read the data from the buffer of the image
const bufferToStream = (buffer: Buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
}

export const UploadImage = (transformedData: Buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
             }
        });
        bufferToStream(transformedData).pipe(stream);
    });
}