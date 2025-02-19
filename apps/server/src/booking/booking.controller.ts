import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Booking")
@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: "Create a new booking" })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all bookings" })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a booking by ID" })
  findOne(@Param("id") id: string) {
    return this.bookingService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a booking" })
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a booking" })
  remove(@Param("id") id: string) {
    return this.bookingService.remove(id);
  }
}
