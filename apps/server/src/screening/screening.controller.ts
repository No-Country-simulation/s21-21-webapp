import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ScreeningService } from "./screening.service";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from "./dto/update-screening.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Screening")
@Controller("screening")
export class ScreeningController {
  constructor(private readonly screeningService: ScreeningService) {}

  @Post()
  @ApiOperation({ summary: "Create a new screening" })
  create(@Body() createScreeningDto: CreateScreeningDto) {
    return this.screeningService.create(createScreeningDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all screenings" })
  findAll() {
    return this.screeningService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a screening by ID" })
  findOne(@Param("id") id: string) {
    return this.screeningService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a screening" })
  update(
    @Param("id") id: string,
    @Body() updateScreeningDto: UpdateScreeningDto
  ) {
    return this.screeningService.update(id, updateScreeningDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a screening" })
  remove(@Param("id") id: string) {
    return this.screeningService.remove(id);
  }
}
