import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateImageDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
