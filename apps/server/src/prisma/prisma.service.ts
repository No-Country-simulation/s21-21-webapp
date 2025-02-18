import { PrismaClient } from "@prisma/client";
import { OnModuleInit } from "@nestjs/common";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
