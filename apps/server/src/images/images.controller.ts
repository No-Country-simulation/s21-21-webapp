import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOperation({ summary: "Upload a new image" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto
  ) {
    return this.imagesService.create(file, createImageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all images" })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one image by id" })
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(id);
  }

  @Post(":id/comments")
  @ApiOperation({ summary: "Add a comment to an image" })
  addComment(
    @Param("id") id: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.imagesService.addComment(id, createCommentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an image" })
  remove(@Param("id") id: string) {
    return this.imagesService.remove(id);
  }
}
