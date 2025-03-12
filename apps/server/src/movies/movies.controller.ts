import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  Patch,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new movie" })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all movies" })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a movie by ID" })
  findOne(@Param("id") id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a movie" })
  update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Patch(":id")
  async updateMovie(@Param("id") id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a movie" })
  remove(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
}
