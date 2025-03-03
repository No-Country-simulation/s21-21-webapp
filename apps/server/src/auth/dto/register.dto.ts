import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "John Doe" })
  @IsNotEmpty()
  name: string;
}
