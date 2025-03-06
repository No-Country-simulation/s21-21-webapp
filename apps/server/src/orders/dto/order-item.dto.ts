import { IsMongoId, IsNumber, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
