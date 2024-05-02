import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentDto } from './comment.dto';

export class VideoResponseDto {
  @ApiProperty({ 
    example: 1, 
    description: 'El identificador único del video. Es un número entero que se utiliza para referenciar al video en la base de datos.' 
  })
  @IsInt({ message: 'El ID debe ser un número entero.' })
  id: number;

  @ApiProperty({ 
    example: 'Aventuras en NestJS', 
    description: 'El título del video. Provee una breve idea del tema o contenido del video.' 
  })
  @IsNotEmpty({ message: 'El título del video no puede estar vacío.' })
  @IsString({ message: 'El título debe ser una cadena de caracteres.' })
  title: string;

  @ApiProperty({ 
    example: 'Este video explica conceptos básicos de NestJS para principiantes.', 
    description: 'Una descripción breve del contenido del video. Ofrece una visión general de lo que el usuario puede esperar aprender o ver en el video.' 
  })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
  description: string;

  @ApiProperty({ 
    example: 'https://ejemplo.com/video.mp4', 
    description: 'La URL donde se puede visualizar o descargar el video. Este enlace debe ser directo al recurso multimedia.' 
  })
  @IsUrl({}, { message: 'La URL debe ser una dirección válida.' })
  url: string;

  @ApiProperty({ 
    example: 1, 
    description: 'El identificador del usuario que subió o creó el video. Corresponde al ID del usuario en la base de datos.' 
  })
  @IsInt({ message: 'El ID del usuario debe ser un número entero.' })
  userId: number;

  @ApiProperty({ 
    example: 'nombreusuario', 
    description: 'El nombre de usuario del creador del video. Proporciona una forma de identificar al autor del video sin necesidad de acceder a más datos personales.' 
  })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres.' })
  username: string;

  @ApiProperty({ 
    type: () => CommentDto, 
    description: 'Listado de comentarios asociados al video. Incluye información detallada de cada comentario según se define en el DTO `CommentDto`.' 
  })
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[];
}