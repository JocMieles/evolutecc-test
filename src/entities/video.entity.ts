import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Video {
  @ApiProperty({ example: 1, description: 'El identificador único del video.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Introducción a NestJS', description: 'El título del video.' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Este video explica cómo empezar con NestJS.', description: 'Una breve descripción del video.' })
  @Column()
  description: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', description: 'La URL del video.' })
  @Column()
  url: string;

  @ApiProperty({ example: 1, description: 'El ID del usuario que subió el video.' })
  @Column()
  userId: number;

  @ApiProperty({ example: 'user123', description: 'El nombre de usuario del creador del video.' })
  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.video)
  @ApiProperty({ description: 'Comentarios asociados al video. Esta relación permite acceder a todos los comentarios realizados sobre este video.' })
  comments: Comment[];
}
