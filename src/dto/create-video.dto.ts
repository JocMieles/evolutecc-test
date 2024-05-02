import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateVideoDto {
    @ApiProperty({ 
        example: 'Introducción a NestJS', 
        description: 'Título del video. Debe ser una cadena no vacía.' 
    })
    @IsNotEmpty({ message: 'El título del video no puede estar vacío.' })
    @IsString({ message: 'El título debe ser una cadena de caracteres.' })
    title: string;

    @ApiProperty({ 
        example: 'Este video explica cómo empezar con NestJS.', 
        description: 'Una breve descripción del video. Debe ser informativa y clara.' 
    })
    @IsNotEmpty({ message: 'La descripción del video no puede estar vacía.' })
    @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
    description: string;

    @ApiProperty({ 
        example: 'https://ejemplo.com/video.mp4', 
        description: 'URL donde se aloja el video. Debe ser una URL válida.' 
    })
    @IsNotEmpty({ message: 'La URL del video no puede estar vacía.' })
    @IsUrl({}, { message: 'La URL proporcionada no es válida.' })
    url: string;

    @ApiProperty({ 
        example: 1, 
        description: 'ID del usuario que sube el video. Debe ser un número entero y válido.' 
    })
    @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
    @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
    @Min(1, { message: 'El ID del usuario debe ser un número positivo.' })
    userId: number;
}