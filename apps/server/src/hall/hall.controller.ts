import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { HallService } from "./hall.service";
import { UpdateHallDto } from "./dto/update-hall.dto";
import { CreateHallDto } from "./dto/create-hall.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Hall")
@Controller("hall")
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Post()
  @ApiOperation({ summary: "Create a new hall" })
  create(@Body() createHallDto: CreateHallDto) {
    return this.hallService.create(createHallDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all halls" })
  findAll() {
    return this.hallService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a hall by ID" })
  findOne(@Param("id") id: string) {
    return this.hallService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a hall" })
  update(@Param("id") id: string, @Body() updateHallDto: UpdateHallDto) {
    return this.hallService.update(id, updateHallDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a hall" })
  remove(@Param("id") id: string) {
    return this.hallService.remove(id);
  }
}
