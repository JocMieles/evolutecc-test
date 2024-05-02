import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { User } from '../entities/user.entity';
import { VideoResponseDto } from 'src/dto/video-response.dto';
import { CommentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  async create(createVideoDto: CreateVideoDto): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: createVideoDto.userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createVideoDto.userId} no encontrado.`);
    }

    const video = this.videosRepository.create({
      ...createVideoDto,
      user
    });

    const videoSaved = await this.videosRepository.save({...video, username: video.user.username});
    return {
      id: videoSaved.id,
      title: video.title,
      description: video.description,
      url: video.url,
      userId: user.id,
      username: user.username,
      comments: []
    };
  }

  async findAll(): Promise<any[]> {
    const videos = await this.videosRepository.find({
        relations: ['user', 'comments', 'comments.children', 'comments.children.children'] // Carga hasta el nivel necesario
    });

    const commentsF = await this.flattenComments()
    const videosf = videos.map( video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      userId: video.user.id,
      username: video.user.username,
      comments: commentsF.filter(comment => comment.videoId === video.id)
  }));

    return videosf
}
  async flattenComments(){
    const comments = await this.commentRepository.find({
        relations: ['user', 'video'],
    });

    const commentMap = new Map(comments.map(comment => [comment.id, {
        id: comment.id,
        text: comment.text,
        parentCommentId: comment.parentCommentId,
        username: comment.user.username,
        videoId: comment.video.id,
        children: []
    }]));

    const rootComments = [];
    comments.forEach(comment => {
        if (comment.parentCommentId) {
            const parentComment = commentMap.get(comment.parentCommentId);
            if (parentComment) {
                let topLevelParent = parentComment;
                while (topLevelParent.parentCommentId) {
                    topLevelParent = commentMap.get(topLevelParent.parentCommentId);
                }
                topLevelParent.children.push(commentMap.get(comment.id));
            }
        } else {
            rootComments.push(commentMap.get(comment.id));
        }
    });

    return rootComments.map(comment => ({
        ...comment,
    }));
}


  async findOne(id: number): Promise<VideoResponseDto> {
    const video = await this.videosRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
    if (!video) {
      throw new NotFoundException(`Video con ID ${id} no encontrado.`);
    }
    const commentsF = await this.flattenComments()
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      userId: video.user.id,
      username: video.user.username,
      comments: commentsF.filter(comment => comment.videoId === video.id)
    };
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.videosRepository.preload({
      id: id,
      ...updateVideoDto,
    });
    if (!video) {
      throw new NotFoundException(`Video con ID ${id} no encontrado.`);
    }
    return this.videosRepository.save(video);
  }

  async remove(id: number): Promise<void> {
    const result = await this.videosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Video con ID ${id} no encontrado.`);
    }
  }
}