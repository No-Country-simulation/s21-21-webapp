import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { ImagesModule } from "./images/images.module";
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CloudinaryModule, ImagesModule, PrismaModule],

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
