import { IsMongoId } from "class-validator";

export class FindOneOrderDto {
  @IsMongoId()
  orderId: string
}