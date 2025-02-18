import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async create(file: Express.Multer.File, createImageDto: CreateImageDto) {
    const result = await this.cloudinary.uploadImage(file);

    return this.prisma.image.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        description: createImageDto.description,
      },
      include: {
        comments: true,
      },
    });
  }

  async findAll() {
    return this.prisma.image.findMany({
      include: {
        comments: true,
      },
    });
  }

  async findOne(id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async addComment(id: string, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        imageId: id,
      },
    });
  }

  async remove(id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    // Delete from Cloudinary
    await this.cloudinary.deleteImage(image.publicId);

    // Delete from database
    return this.prisma.image.delete({
      where: { id },
    });
  }
}
