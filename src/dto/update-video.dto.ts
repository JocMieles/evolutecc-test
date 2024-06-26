import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateVideoDto {
    @ApiProperty({ 
        example: 'Video para realizar comentarios', 
        description: 'Título actualizado del video. Es opcional para la actualización.', 
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'El título debe ser una cadena de caracteres.' })
    title?: string;

    @ApiProperty({ 
        example: 'Este video tiene varios comentarios.', 
        description: 'Descripción actualizada del video. Es opcional para la actualización.', 
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
    description?: string;

    @ApiProperty({ 
        example: 'https://ejemplo.com/video_nuevo.mp4', 
        description: 'Nueva URL del video. Es opcional para la actualización.', 
        required: false 
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL proporcionada no es válida.' })
    url?: string;
}