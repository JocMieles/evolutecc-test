import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentDto {
  @ApiProperty({ example: 42, description: 'Identificador único del comentario.' })
  @IsInt({ message: 'El identificador debe ser un número entero.' })
  @Min(1, { message: 'El identificador debe ser positivo.' })
  id: number;

  @ApiProperty({ example: '¡Excelente video, gracias por compartir!', description: 'Contenido textual del comentario.' })
  @IsString({ message: 'El texto del comentario debe ser una cadena de caracteres.' })
  text: string;

  @ApiProperty({ example: null, description: 'ID del comentario padre si este es una respuesta. Es nulo si el comentario es de nivel superior.', nullable: true })
  @IsOptional()
  @IsInt({ message: 'El ID del comentario padre debe ser un número entero.' })
  @Min(1, { message: 'El ID del comentario padre debe ser positivo.' })
  parentCommentId: number | null;

  @ApiProperty({ example: 3, description: 'ID del usuario que publicó el comentario.' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero.' })
  @Min(1, { message: 'El ID del usuario debe ser positivo.' })
  userId: number;

  @ApiProperty({ example: 'nombreusuario', description: 'Nombre de usuario del autor del comentario.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres.' })
  username: string;

  @ApiProperty({ example: 9, description: 'ID del video al que está asociado el comentario.' })
  @IsInt({ message: 'El ID del video debe ser un número entero.' })
  @Min(1, { message: 'El ID del video debe ser positivo.' })
  videoId: number;

  @ApiProperty({ example: 15, description: 'ID del comentario padre. Es nulo si el comentario es de nivel superior.', nullable: true })
  @IsOptional()
  @IsInt({ message: 'El ID del comentario padre debe ser un número entero.' })
  @Min(1, { message: 'El ID del comentario padre debe ser positivo.' })
  parentComment: number | null;

  @ApiProperty({ type: () => [CommentDto], isArray: true, description: 'Respuestas directas a este comentario, si las hay.', example: [{ 
    id: 43, 
    text: 'Gracias por tu comentario!', 
    parentCommentId: 42, 
    userId: 4, 
    videoId: 9, 
    parentComment: 15, 
    children: []
  }]})
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  children: CommentDto[];

  constructor(comment: any) {
    this.id = comment.id;
    this.text = comment.text;
    this.parentCommentId = comment.parentCommentId;
    this.userId = comment.userId;
    this.videoId = comment.videoId;
    this.parentComment = comment.parentComment;
    this.children = comment.children ? comment.children.map(child => new CommentDto(child)) : [];
  }
}
