import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsPositive } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the product being ordered',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  productId: string;
}
