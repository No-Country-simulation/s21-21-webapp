import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';


export class Discount {
  @ApiProperty({
    description: 'Coupon code for the discount',
    example: 'SUMMER20',
  })
  @IsString()
  @IsNotEmpty()
  coupon: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Unique identifier for the buyer user',
    example: 'b0a5f16d-f346-4f2c-9dbe-c9c25a7c7b68',
  })
  @IsUUID()
  @IsNotEmpty()
  buyerUserId: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({
    description: 'List of discounts applied to the order',
    type: [Discount],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discount)
  discounts: Discount[];
}