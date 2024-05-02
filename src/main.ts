import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { User } from './entities/user.entity';
import { Video } from './entities/video.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ejemplo de API')
    .setDescription('La descripción de la API')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [Comment, User, Video],
    });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
