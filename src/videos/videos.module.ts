import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from '../entities/video.entity';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, User, Comment]), // Asegúrate de incluir Comment aquí si es necesario
  ],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}