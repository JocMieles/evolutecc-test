import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity()
export class Comment {
  @ApiProperty({ example: 1, description: 'Identificador único del comentario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '¡Gran video, gracias por compartir!', description: 'Contenido del comentario' })
  @Column()
  text: string;

  @ApiProperty({ example: 1, description: 'ID del usuario que realizó el comentario.' })
  @Column()
  userId: number;

  @ApiProperty({ example: "user123", description: 'Nombre de usuario del autor del comentario.' })
  @Column()
  username: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'userId' })
  // @ApiProperty({ example: 1, description: 'ID del usuario que publicó el comentario. Relaciona cada comentario con un usuario específico.' })
  user: User;

  @Column()
  @ApiProperty({ example: 1, description: 'ID del video al que está asociado el comentario. Relaciona cada comentario con un video específico.' })
  videoId: number;

  @ManyToOne(() => Video, video => video.comments)
  @JoinColumn({ name: 'videoId' })
  //@ApiProperty({ example: 1, description: 'ID del video al que está asociado el comentario. Relaciona cada comentario con un video específico.' })
  video: Video;

  @Column({ nullable: true })
  @ApiProperty({ example: null, description: 'ID del comentario padre si este es una respuesta. Permite anidar comentarios formando una estructura jerárquica.' })
  parentCommentId: number;

  @ManyToOne(() => Comment, comment => comment.children)
  @JoinColumn({ name: 'parentCommentId' })
  // @ApiProperty({ description: 'Relación de un comentario a su comentario padre. Usado para estructurar respuestas en forma de árbol.' })
  parentComment: Comment;

  @OneToMany(() => Comment, comment => comment.parentComment)
  //@ApiProperty({ description: 'Relación de un comentario con sus comentarios hijos. Permite a un comentario tener múltiples respuestas directas, formando una cadena de discusión.' })
  children: Comment[];
}