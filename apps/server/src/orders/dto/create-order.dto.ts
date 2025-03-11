import { IsString, IsArray, IsOptional, IsEnum, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ example: "60d4a0e7a48b8c1e9c5e8b4c" })
  @IsString()
  buyerUserId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  discounts?: any;
}
