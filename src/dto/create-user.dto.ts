// import { ApiProperty } from '@nestjs/swagger';

// export class CreateUserDto {
//   @ApiProperty({ example: 'user@example.com', description: 'Dirección de correo electrónico' })
//   email: string;

//   @ApiProperty({ example: 'User123', description: 'Nombre de usuario' })
//   username: string;

//   @ApiProperty({ example: 'ContraseñaSegura123', description: 'Contraseña' })
//   password: string;
// }
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user123', description: 'Unique username for the user.' })
  username: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address of the user.' })
  email: string;
}