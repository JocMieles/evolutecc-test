// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
// import { User } from './user.entity';
// import { Comment } from './comment.entity';
// import { CommentDto } from 'src/dto/comment.dto';
// @Entity()
// export class Video {
//   @PrimaryGeneratedColumn()
//   @ApiProperty({ example: 1, description: 'Identificador único del video.' })
//   id: number;

//   @Column()
//   @ApiProperty({ example: 'Aventuras en NestJS3', description: 'Título del video.' })
//   title: string;

//   @Column()
//   @ApiProperty({ example: 'Este video explica conceptos básicos de NestJS para principiantes.', description: 'Descripción del video.' })
//   description: string;

//   @Column()
//   @ApiProperty({ example: 'https://ejemplo.com/video.mp4', description: 'URL donde se almacena el video.' })
//   url: string;

//   @ManyToOne(() => User, user => user.videos)
//   @JoinColumn({ name: 'userId' })
//   user: User;

//   @Column()
//   @ApiProperty({ example: 1, description: 'ID del usuario que subió el video' })
//   userId: number;

//   @OneToMany(() => Comment, comments => comments)
//   comments: Comment[];
// }
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

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];
}
