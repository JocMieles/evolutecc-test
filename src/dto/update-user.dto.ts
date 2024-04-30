// import { PartialType } from '@nestjs/mapped-types';
// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
// import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from "@nestjs/swagger";

// // Extends 'CreateUserDto' making all fields optional for updates
// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   @ApiPropertyOptional({ example: 'newusername', description: 'Nuevo nombre de usuario opcional' })
//   @IsOptional()
//   @IsString()
//   @MinLength(4)
//   username?: string;

//   @ApiPropertyOptional({ example: 'newuser@example.com', description: 'Nuevo correo electrónico opcional' })
//   @IsOptional()
//   @IsEmail()
//   email?: string;

//   @ApiPropertyOptional({ example: 'newPassword', description: 'Nueva contraseña opcional' })
//   @IsOptional()
//   @IsString()
//   @MinLength(6)
//   password?: string;
// }


export class UpdateUserDto {
  @ApiProperty({ example: 'user123', description: 'Unique username for the user.', required: false })
  username?: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address of the user.', required: false })
  email?: string;
}