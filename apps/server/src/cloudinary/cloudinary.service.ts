import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Subida de imagen
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          if (!result) {
            reject(new Error("No result returned from upload_stream"));
          } else {
            resolve(result);
          }
        })
        .end(file.buffer as Buffer); // Aquí forzamos el tipo Buffer
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  // Subida de video con procesamiento asíncrono
  async uploadVideo(
    file: Express.Multer.File,
    options: any = {}
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "video",
            eager_async: true, // Procesamiento asíncrono de videos grandes
            eager: [
              {
                width: 800,
                height: 600,
                crop: "pad", // Ejemplo de transformación
              },
            ],
            ...options, // Permite sobrescribir opciones
          },
          (error, result) => {
            if (error) {
              console.error("Error subiendo el video:", error);
              reject(new Error("Error al subir el video"));
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error("No result returned from upload_stream"));
            }
          }
        )
        .end(file.buffer as Buffer); // Aquí forzamos el tipo Buffer
    });
  }

  // Eliminar video (placeholder)
  deleteVideo(publicId: any) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "video" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  }
}
