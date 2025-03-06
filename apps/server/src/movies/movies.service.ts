import { Injectable, NotFoundException } from "@nestjs/common";

import { ObjectId } from "mongodb";
import { PrismaService } from "../prisma/prisma.service";

import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: string) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateMovieDto) {
    return this.prisma.movie.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.movie.delete({ where: { id } });
  }

  async validateIds(ids: string[]) {
    ids = Array.from(new Set(ids));

    const movies = await this.prisma.movie.findMany({
      where: {
        id: {
          in: ids
        },
      },
    });

    if (movies.length !== ids.length) throw new NotFoundException('Some movie is not found')

    return movies
  }
}
