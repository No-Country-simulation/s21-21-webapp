import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsPositive,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateSeatDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  number: number;

  @ApiProperty({ example: "A" })
  @IsString()
  row: string;

  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4c" })
  @IsString()
  hallId: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
