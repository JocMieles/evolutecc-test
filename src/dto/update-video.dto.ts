// import { PartialType } from '@nestjs/mapped-types';
// import { CreateVideoDto } from './create-video.dto';
// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsString, IsOptional, IsUrl } from 'class-validator';

// export class UpdateVideoDto extends PartialType(CreateVideoDto) {
//   @ApiPropertyOptional({ example: 'Nuevo Título', description: 'Título actualizado del video' })
//   @IsOptional()
//   @IsString()
//   title?: string;

//   @ApiPropertyOptional({ example: 'Descripción actualizada del video.', description: 'Descripción actualizada del video' })
//   @IsOptional()
//   @IsString()
//   description?: string;

//   @ApiPropertyOptional({ example: 'http://nuevourl.com/video.mp4', description: 'URL actualizada del video' })
//   @IsOptional()
//   @IsUrl()
//   url?: string;
// }

import { ApiProperty } from '@nestjs/swagger';
export class UpdateVideoDto {
  @ApiProperty({ example: 'Introduction to NestJS', description: 'Title of the video.', required: false })
  title?: string;

  @ApiProperty({ example: 'This video explains how to get started with NestJS.', description: 'A brief description of the video.', required: false })
  description?: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', description: 'URL where the video is hosted.', required: false })
  url?: string;
}