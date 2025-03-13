import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class FindOneOrderDto {
  @ApiProperty({
    example: "67d209ca361907350b2f5550",
    description: 'Find one order by mongo id'
  })
  @IsMongoId()
  orderId: string
}