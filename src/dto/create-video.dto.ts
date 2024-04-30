// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, IsUrl, IsInt } from 'class-validator';

// export class CreateVideoDto {
//   @ApiProperty({ example: 'Mi Primer Video', description: 'Título del video' })
//   @IsNotEmpty()
//   @IsString()
//   title: string;

//   @ApiProperty({ example: 'Este es un video sobre cómo empezar con NestJS.', description: 'Descripción del video' })
//   @IsNotEmpty()
//   @IsString()
//   description: string;

//   @ApiProperty({ example: 'http://ejemplo.com/video.mp4', description: 'URL del video' })
//   @IsNotEmpty()
//   @IsUrl()
//   url: string;

//   @ApiProperty({ example: 2, description: 'ID del usuario que crea el video' })
//   @IsNotEmpty()
//   @IsInt()
//   userId: number;
// }

import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({ example: 'Introduction to NestJS', description: 'Title of the video.' })
  title: string;

  @ApiProperty({ example: 'This video explains how to get started with NestJS.', description: 'A brief description of the video.' })
  description: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', description: 'URL where the video is hosted.' })
  url: string;

  @ApiProperty({ example: 1, description: 'User ID of the video uploader.' })
  userId: number;
}