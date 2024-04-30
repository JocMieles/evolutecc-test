import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';  // Asegúrate de tener un DTO para los comentarios

export class VideoResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Aventuras en NestJS2' })
  title: string;

  @ApiProperty({ example: 'Este video explica conceptos básicos de NestJS para principiantes.' })
  description: string;

  @ApiProperty({ example: 'https://ejemplo.com/video.mp4' })
  url: string;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'nombreusuario' })
  username: string;

  @ApiProperty({ type: () => [CommentDto], description: 'Comentarios asociados al video.' })
  comments: CommentDto[];
}