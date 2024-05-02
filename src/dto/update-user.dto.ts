import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ 
        example: 'usuario123', 
        description: 'Nuevo nombre de usuario para el usuario. Debe ser único.', 
        required: false 
    })
    @IsOptional()
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
    @Length(4, 20, { message: 'El nombre de usuario debe tener entre 4 y 20 caracteres.' })
    username?: string;

    @ApiProperty({ 
        example: 'usuario@nuevoemail.com', 
        description: 'Nueva dirección de correo electrónico para el usuario. Debe ser una dirección válida.', 
        required: false 
    })
    @IsOptional()
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
    email?: string;
}
