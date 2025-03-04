import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
    ], // Add your frontend URL(s)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle("API Cine")
    .setDescription("api documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document)

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
