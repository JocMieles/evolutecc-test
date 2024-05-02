import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'usuario123',
        description: 'Nombre único de usuario para el nuevo usuario. Debe tener entre 4 y 20 caracteres.'
    })
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
    @Length(4, 20, { message: 'El nombre de usuario debe tener entre 4 y 20 caracteres.' })
    username: string;

    @ApiProperty({
        example: 'usuario@ejemplo.com',
        description: 'Dirección de correo electrónico del usuario. Debe ser una dirección válida.'
    })
    @IsNotEmpty({ message: 'La dirección de correo electrónico no puede estar vacía.' })
    @IsEmail({}, { message: 'La dirección de correo electrónico debe ser válida.' })
    email: string;
}