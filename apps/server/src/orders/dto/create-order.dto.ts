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

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  buyerUserId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discount)
  discounts: Discount[];
}

export class Discount {
  @IsString()
  @IsNotEmpty()
  coupon: string;
}
