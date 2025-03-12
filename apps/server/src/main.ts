import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  app.enableCors({
    origin: [
      "https://cine-astas.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  });

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
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
