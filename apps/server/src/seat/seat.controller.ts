import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";

@ApiTags("Seats")
@Controller("seats")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @ApiOperation({ summary: "Create a new seat" })
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @Post("bulk-create")
  @ApiOperation({ summary: "Create multiple seats for a hall" })
  createBulk(@Body() createSeatDtos: CreateSeatDto[]) {
    return this.seatService.createBulk(createSeatDtos);
  }

  @Post("generate-hall-seats/:hallId")
  @ApiOperation({ summary: "Automatically generate all seats for a hall" })
  generateHallSeats(@Param("hallId") hallId: string) {
    return this.seatService.generateHallSeats(hallId);
  }

  @Get()
  @ApiOperation({ summary: "Get all seats" })
  findAll() {
    return this.seatService.findAll();
  }

  @Get("hall/:hallId")
  @ApiOperation({ summary: "Get all seats by hall ID" })
  findByHall(@Param("hallId") hallId: string) {
    return this.seatService.findByHall(hallId);
  }

  @Get("available")
  @ApiOperation({ summary: "Get available seats for a screening" })
  @ApiQuery({ name: "screeningId", required: true, type: String })
  findAvailable(@Query("screeningId") screeningId: string) {
    return this.seatService.findAvailableSeats(screeningId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a seat by ID" })
  findOne(@Param("id") id: string) {
    return this.seatService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a seat" })
  update(@Param("id") id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a seat" })
  remove(@Param("id") id: string) {
    return this.seatService.remove(id);
  }
}
