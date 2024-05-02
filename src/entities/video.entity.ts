import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Video {
  @ApiProperty({ example: 1, description: 'The unique identifier of the video' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Introduction to NestJS', description: 'The title of the video' })
  @Column()
  title: string;

  @ApiProperty({ example: 'This video explains how to get started with NestJS.', description: 'A brief description of the video' })
  @Column()
  description: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', description: 'The URL of the video' })
  @Column()
  url: string;

  @ApiProperty({ example: 1, description: 'The user ID of the video uploader' })
  @Column()
  userId: number;

  @ApiProperty({ example: 'user123', description: 'The user ID of the video uploader' })
  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.video)
  @ApiProperty({ description: 'Comentarios asociados al video. Permite acceder a todos los comentarios realizados en este video.' })
  comments: Comment[];
}