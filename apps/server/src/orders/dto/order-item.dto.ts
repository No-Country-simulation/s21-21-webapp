import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsString } from "class-validator";

export class OrderItemDto {
  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4d" })
  @IsMongoId()
  productId: string;

  @ApiProperty({
    example: ["60d4a0e7a48b8c1e9c5e8b4e", "60d4a0e7a48b8c1e9c5e8b4f"],
  })
  @IsArray()
  @IsString({ each: true })
  seatIds: string[];
}
