import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateMovieDto {
  @ApiProperty({ example: "Inception" })
  @IsString()
  title: string;

  @ApiProperty({ example: 2010 })
  @IsInt()
  year: number;

  @ApiProperty({ example: "Sci-Fi" })
  @IsString()
  genre: string;

  @ApiProperty({ example: "English" })
  @IsString()
  language: string;

  @ApiProperty({ example: 148 })
  @IsInt()
  duration: number;

  @ApiProperty({ example: "https://image.url" })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ example: "https://trailer.url" })
  @IsOptional()
  @IsUrl()
  trailerUrl?: string;

  @ApiProperty({ example: "A mind-bending thriller" })
  @IsOptional()
  @IsString()
  description?: string;
}
