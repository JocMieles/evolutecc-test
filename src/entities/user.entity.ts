import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Video } from './video.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'El identificador único del usuario, asignado automáticamente por la base de datos.' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'user123', description: 'El nombre de usuario, debe ser único. Se utiliza para el inicio de sesión y debe ser fácil de recordar por el usuario.' })
  username: string;

  @Column()
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'La dirección de correo electrónico del usuario. Se utiliza para la comunicación oficial y procesos de recuperación de contraseña.' })
  email: string;

  @OneToMany(() => Video, video => video.user)
  //@ApiProperty({ description: 'Colección de videos subidos por el usuario. Esta relación OneToMany permite al usuario tener múltiples videos.' })
  videos: Video[];

  @OneToMany(() => Comment, comment => comment.user)
  //@ApiProperty({ description: 'Colección de comentarios realizados por el usuario. Esta relación OneToMany permite al usuario tener múltiples comentarios en diferentes videos.' })
  comments: Comment[];
}
