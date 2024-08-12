import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule}from "@nestjs/swagger"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle("food APIs")
  .setDescription("list api for food APIs")
  .setVersion('1.0')
  .addTag('Auth')
  .addTag("User")
  .addBearerAuth()
  .build()
  const documnent=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,documnent);
  app.enableCors();
  await app.listen(3008);
}
bootstrap();
