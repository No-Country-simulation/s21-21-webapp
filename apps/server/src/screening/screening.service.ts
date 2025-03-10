import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from "./dto/update-screening.dto";

@Injectable()
export class ScreeningService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateScreeningDto) {
    return this.prisma.screening.create({ data });
  }

  findAll() {
    return this.prisma.screening.findMany();
  }

  findOne(id: string) {
    return this.prisma.screening.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateScreeningDto) {
    return this.prisma.screening.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.screening.delete({ where: { id } });
  }

  async validateIds(ids: string[]) {
    ids = Array.from(new Set(ids));

    const movies = await this.prisma.screening.findMany({
      where: {
        id: {
          in: ids
        },
      },
      include: {
        movie: true
      }
    });

    if (movies.length !== ids.length) throw new NotFoundException('Some movies not found')

    return movies
  }
}
