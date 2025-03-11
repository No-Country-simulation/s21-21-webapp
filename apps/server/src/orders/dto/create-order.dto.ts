import { IsString, IsArray, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderItemDto {
  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4d" })
  @IsString()
  productId: string;

  @ApiProperty({
    example: ["60d4a0e7a48b8c1e9c5e8b4e", "60d4a0e7a48b8c1e9c5e8b4f"],
  })
  @IsArray()
  @IsString({ each: true })
  seatIds: string[];
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  items: OrderItemDto[];

  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4c" })
  @IsString()
  buyerUserId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  discounts?: any;
}
