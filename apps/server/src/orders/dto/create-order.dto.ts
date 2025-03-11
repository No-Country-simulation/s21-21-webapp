import { IsString, IsArray, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderItemDto } from "./order-item.dto";

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
