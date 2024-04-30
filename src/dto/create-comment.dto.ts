// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

// export class CreateCommentDto {
//   @ApiProperty({ example: 'Nice video!', description: 'Text content of the comment' })
//   @IsNotEmpty()
//   text: string;

//   @ApiProperty({ example: 1, description: 'ID of the video the comment is for' })
//   @IsNotEmpty()
//   @IsInt()
//   videoId: number;

//   @ApiProperty({ example: 1, description: 'User ID of the commenter' })
//   @IsNotEmpty()
//   @IsInt()
//   userId: number;

//   @ApiProperty({ example: 1, description: 'ID of the parent comment if it is a reply', required: false })
//   @IsOptional()
//   @IsInt()
//   parentCommentId?: number;
// }

import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great video, thanks for sharing!', description: 'Text content of the comment.' })
  text: string;

  @ApiProperty({ example: 1, description: 'ID of the user who is posting the comment.' })
  userId: number;

  @ApiProperty({ example: 1, description: 'ID of the video the comment is associated with.' })
  videoId: number;

  @ApiProperty({ example: null, description: 'ID of the parent comment if this is a reply.', nullable: true })
  parentCommentId: number | null;
}

export class UpdateCommentDto {
  @ApiProperty({ example: 'Great video, thanks for sharing!', description: 'Text content of the comment.', required: false })
  text?: string;
}
