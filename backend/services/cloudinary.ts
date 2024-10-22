import sizeOf from 'image-size'
import { UploadApiOptions, v2 as cloudinary } from "cloudinary"

cloudinary.config({
   secure: true
});

export async function uploadSingleImage(file: string, options?: UploadApiOptions | undefined) {
   const res = await cloudinary.uploader.upload(file, {
      use_filename: false,
      folder: `codygo_interview`,
      ...options
   });

   return res.secure_url
}

export async function uploadImages(files: string[], options?: UploadApiOptions | undefined) {
   const images = [];
   for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const res = await uploadSingleImage(file, options);
      const { height, width } = sizeOf(file)
      images.push({ src: res, height, width })
   }

   return images;
}