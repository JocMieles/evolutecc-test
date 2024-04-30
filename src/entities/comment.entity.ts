// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// import { User } from './user.entity';
// import { Video } from './video.entity';
// import { ApiProperty } from '@nestjs/swagger';

// @Entity()
// export class Comment {
//   @PrimaryGeneratedColumn()
//   @ApiProperty({
//     example: 42,
//     description: 'Identificador único del comentario.'
//   })
//   id: number;

//   @Column()
//   @ApiProperty({
//     example: '¡Excelente video, gracias por compartir!',
//     description: 'El contenido del comentario.'
//   })
//   text: string;

//   @Column({ nullable: true })
//   @ApiProperty({
//     example: null,
//     description: 'El ID del comentario padre si este es una respuesta a otro comentario, de lo contrario es null.',
//     required: false
//   })
//   parentCommentId: number | null;

//   @ManyToOne(() => User, user => user.comments)
//   @JoinColumn({ name: 'userId' })
//   @ApiProperty({
//     example: 3,
//     description: 'El ID del usuario que realizó el comentario.'
//   })
//   user: User;

//   @ManyToOne(() => Video, video => video.comments)
//   @JoinColumn({ name: 'videoId' })
//   @ApiProperty({
//     example: 9,
//     description: 'El ID del video al cual está asociado el comentario.'
//   })
//   video: Video;

//   @ManyToOne(() => Comment, comment => comment.children)
//   @JoinColumn({ name: 'parentCommentId' })
//   @ApiProperty({
//     example: 15,
//     description: 'Comentario padre al que pertenece este comentario si es una respuesta. Se refiere al campo "id" de otro comentario.',
//     required: false
//   })
//   parentComment: Comment;

//   @OneToMany(() => Comment, comment => comment.parentComment)
//   @ApiProperty({
//     example: [{ id: 43, text: 'Gracias por tu comentario!', userId: 4, videoId: 9, parentCommentId: 42 }],
//     description: 'Lista de comentarios hijos si este comentario ha sido respondido por otros. Cada objeto en la lista es un comentario que tiene este comentario como "parentCommentId".',
//     type: 'array',
//     items: {
//       $ref: '#/components/schemas/Comment',
//     },
//   })
//   children: Comment[];

// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity()
export class Comment {
  @ApiProperty({ example: 1, description: 'The unique identifier of the comment' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Great video, thanks for sharing!', description: 'The text content of the comment' })
  @Column()
  text: string;

  @ApiProperty({ example: 1, description: 'The ID of the user who posted the comment' })
  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'userId' })
  userId: number; 

  @ApiProperty({ example: 1, description: 'The ID of the video the comment is associated with' })
  @ManyToOne(() => Video, video => video.comments)
  @JoinColumn({ name: 'videoId' })
  videoId: number;

  @ApiProperty({ example: null, description: 'The ID of the parent comment if this is a reply', nullable: true })
  @Column({ nullable: true })
  parentCommentId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => Comment, (comment) => comment.children)
  @JoinColumn({ name: 'parentCommentId' })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  children: Comment[];
}
