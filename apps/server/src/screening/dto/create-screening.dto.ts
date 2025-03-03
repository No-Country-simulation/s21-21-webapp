import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsNumber, IsPositive } from "class-validator";

export class CreateScreeningDto {
  @ApiProperty({ example: "65a0f4f6b1e3c5d7b2a0c3d1" })
  @IsString()
  movieId: string;

  @ApiProperty({ example: "65a0f4f6b1e3c5d7b2a0c3d2" })
  @IsString()
  hallId: string;

  @ApiProperty({ example: "2025-03-01T18:00:00.000Z" })
  @IsDateString()
  schedule: string;

  @ApiProperty({ example: 15.99 })
  @IsNumber()
  @IsPositive()
  price: number;
}
