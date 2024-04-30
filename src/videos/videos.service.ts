import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { User } from '../entities/user.entity';
import { VideoResponseDto } from 'src/dto/video-response.dto';
import { CommentDto } from 'src/dto/comment.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const user = await this.usersRepository.findOne({ where: { id: createVideoDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createVideoDto.userId} not found.`);
    }

    const video = this.videosRepository.create({
      ...createVideoDto,
      user
    });
    return this.videosRepository.save(video);
  }

  async findAll(): Promise<VideoResponseDto[]> {
    const videos = await this.videosRepository.find({ relations: ['user', 'comments'] });
    return videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      userId: video.user.id,
      username: video.user.username,
      comments: video.comments.map(comment => new CommentDto(comment)),  // Asumiendo que tienes un mapper adecuado
    }));
  }

  // async findOne(id: number): Promise<VideoResponseDto> {
  //   const video = await this.videosRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
  //   if (!video) {
  //     throw new NotFoundException(`Video with ID ${id} not found.`);
  //   }

  //   return {
  //     id: video.id,
  //     title: video.title,
  //     description: video.description,
  //     url: video.url,
  //     userId: video.user.id,
  //     username: video.user.username,
  //     comments: video.comments
  //   };
  // }

  async findOne(id: number): Promise<VideoResponseDto> {
    const video = await this.videosRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found.`);
    }
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      userId: video.user.id,
      username: video.user.username,
      comments: video.comments.map(comment => new CommentDto(comment)),  // Asumiendo que tienes un mapper adecuado
    };
  }
  

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.videosRepository.preload({
      id: id,
      ...updateVideoDto,
    });
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found.`);
    }
    return this.videosRepository.save(video);
  }

  async remove(id: number): Promise<void> {
    const result = await this.videosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Video with ID ${id} not found.`);
    }
  }
}
