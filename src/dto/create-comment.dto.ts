import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    example: '¡Excelente video, gracias por compartir!',
    description: 'Contenido textual del comentario.'
  })
  @IsNotEmpty({ message: 'El texto del comentario no puede estar vacío.' })
  @IsString({ message: 'El texto del comentario debe ser una cadena de texto.' })
  text: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario que publica el comentario.'
  })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
  @Min(1, { message: 'El ID del usuario debe ser un número positivo.' })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del video al que está asociado el comentario.'
  })
  @IsNumber({}, { message: 'El ID del video debe ser un número.' })
  @Min(1, { message: 'El ID del video debe ser un número positivo.' })
  videoId: number;

  @ApiProperty({
    example: null,
    description: 'ID del comentario padre si este es una respuesta. Es nulo si el comentario es de nivel superior.',
    nullable: true
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del comentario padre debe ser un número.' })
  @Transform(({ value }) => value === "" ? null : value) // Transforma cadenas vacías en null
  parentCommentId: number | null;
}