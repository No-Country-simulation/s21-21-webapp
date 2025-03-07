import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsPositive } from "class-validator";

export class CreateHallDto {
  @ApiProperty({ example: "Hall 1" })
  @IsString()
  name: string;

  @ApiProperty({ example: 150 })
  @IsInt()
  @IsPositive()
  capacity: number;
}
