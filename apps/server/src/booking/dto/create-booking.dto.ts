import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsPositive, IsArray } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4c" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4d" })
  @IsString()
  screeningId: string;

  @ApiProperty({
    example: ["60d4a0e7a48b8c1e9c5e8b4e", "60d4a0e7a48b8c1e9c5e8b4f"],
  })
  @IsArray()
  @IsString({ each: true })
  seatIds: string[];

  @ApiProperty({ example: 20.0 })
  @IsNumber()
  @IsPositive()
  totalPrice: number;
}
