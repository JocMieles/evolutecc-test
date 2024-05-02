import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({ 
        example: '¡Excelente video, gracias por la actualización!', 
        description: 'Contenido textual del comentario actualizado.', 
        required: false 
    })
    @IsString({ message: 'El texto del comentario debe ser una cadena de caracteres.' })
    @IsOptional()
    text?: string;
}