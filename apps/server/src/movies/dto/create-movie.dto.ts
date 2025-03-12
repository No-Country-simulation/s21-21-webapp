import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

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

  @ApiProperty({ example: "PG-13"})
  @IsString()
  classification: string;

  @ApiProperty({ example: ["2D", "3D"]})
  @IsArray()
  @IsString({each: true})
  format: string[];

  @ApiProperty({example: "2024-06-15"})
  @IsDate()
  @Type(() => Date) // Convierte el string a Date automáticamente
  releaseDate: Date;

}
