// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { Comment } from './comment.entity';
// import { Video } from './video.entity';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   @ApiProperty({
//     example: 1,
//     description: 'Identificador único del usuario.'
//   })
//   id: number;

//   @Column({ unique: true })
//   @ApiProperty({
//     example: 'nombreusuario',
//     description: 'Nombre de usuario único que identifica a la persona en la plataforma.'
//   })
//   username: string;

//   @Column({ unique: true })
//   @ApiProperty({
//     example: 'usuario@example.com',
//     description: 'Dirección de correo electrónico del usuario. Debe ser única.'
//   })
//   email: string;

//   @Column()
//   @ApiProperty({
//     example: 'contraseñaSuperSecreta',
//     description: 'Contraseña para acceder a la cuenta del usuario. No se muestra por seguridad.'
//   })
//   password: string;

//   @OneToMany(() => Video, video => video.user)
//   @ApiProperty({
//     example: [{ id: 10, title: 'Mi Primer Video', description: 'Descripción del video', url: 'http://ejemplo.com/mivideo.mp4' }],
//     description: 'Lista de videos que ha subido el usuario.'
//   })
//   videos: Video[];

//   @OneToMany(() => Comment, comment => comment.user)
//   @ApiProperty({
//     example: [{ id: 20, text: '¡Buen video!', videoId: 10, userId: 1, parentCommentId: null }],
//     description: 'Lista de comentarios que ha realizado el usuario en la plataforma.'
//   })
//   comments: Comment[];
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Video } from './video.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user123', description: 'The username of the user', uniqueItems: true })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'user@example.com', description: 'The email address of the user' })
  @Column()
  email: string;

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}