import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: 42 })
  id: number;

  @ApiProperty({ example: '¡Excelente video, gracias por compartir!' })
  text: string;

  @ApiProperty({ example: null })
  parentCommentId: number | null;

  @ApiProperty({ example: 3 })
  userId: number;

  @ApiProperty({ example: 9 })
  videoId: number;

  @ApiProperty({ example: 15 })
  parentComment: number | null;

  @ApiProperty({ type: () => [CommentDto], example: [{ 
    id: 43, 
    text: 'Gracias por tu comentario!', 
    parentCommentId: 42, 
    userId: 4, 
    videoId: 9, 
    parentComment: 15, 
    children: []
  }]})
  children: CommentDto[];

  constructor(comment: any) {
    this.id = comment.id;
    this.text = comment.text;
    this.parentCommentId = comment.parentCommentId;
    this.userId = comment.userId;
    this.videoId = comment.videoId;
    this.parentComment = comment.parentComment;
    this.children = comment.children ? comment.children.map(child => new CommentDto(child)) : [];
  }
}
