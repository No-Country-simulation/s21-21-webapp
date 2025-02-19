import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsEnum, IsPositive } from "class-validator";
import { BookingStatus } from "../entities/booking-status.enum";

export class CreateBookingDto {
  @ApiProperty({ example: "user123" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "screening456" })
  @IsString()
  screeningId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsPositive()
  seats: number;

  @ApiProperty({ example: 20.0 })
  @IsPositive()
  totalPrice: number;

  @ApiProperty({ example: "PENDING", enum: BookingStatus })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
