import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true
  });

  const logger = new Logger()

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
      "https://cine-astas.vercel.app",
    ], // Add your frontend URL(s)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("API Cine")
    .setDescription("Documentation API Cine")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document)

  const PORT = 3000 | 0

  await app.listen(PORT);

  logger.log(`Server listen in: http://localhost:${PORT}`)
}
bootstrap();
