import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class PaymentSessionDto {
  @IsUUID()
  orderId: string;

  @IsString()
  currency: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentSessionItemDto)
  items: PaymentSessionItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discount)
  discounts?: Discount[];
}

export class Discount {
  @IsString()
  coupon: string
}

export class PaymentSessionItemDto {
  @IsOptional()
  @IsUrl()
  imageUrl?: string

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
