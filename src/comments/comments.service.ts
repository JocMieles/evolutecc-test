import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { User } from '../entities/user.entity';
import { Video } from '../entities/video.entity';
import { UpdateCommentDto } from 'src/dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>
    ) { }

    async create(createCommentDto: CreateCommentDto): Promise<any> {
        const userExists = await this.userRepository.findOne({ where: { id: createCommentDto.userId } });
        if (!userExists) {
            throw new NotFoundException(`Usuario con ID ${createCommentDto.userId} no encontrado.`);
        }

        const videoExists = await this.videoRepository.findOne({ where: { id: createCommentDto.videoId } });
        if (!videoExists) {
            throw new NotFoundException(`Video con ID ${createCommentDto.videoId} no encontrado.`);
        }

        if (createCommentDto.parentCommentId) {
            const parentCommentExists = await this.commentRepository.findOne({
                where: { id: createCommentDto.parentCommentId },
                relations: ['video']
            });
            if (!parentCommentExists) {
                throw new NotFoundException(`Comentario padre con ID ${createCommentDto.parentCommentId} no encontrado.`);
            }
    
            if (parentCommentExists.video.id !== createCommentDto.videoId) {
                throw new NotFoundException(`El comentario padre con ID ${createCommentDto.parentCommentId} no pertenece al video con ID ${createCommentDto.videoId}.`);
            }
        }

        const comment = this.commentRepository.create({
            ...createCommentDto,
            user: userExists,
            video: videoExists,
            parentCommentId: createCommentDto.parentCommentId,
        });
        const savedComment = await this.commentRepository.save({...comment, username: userExists.username, videoId: videoExists.id});

        return {
            id: savedComment.id,
            text: comment.text,
            userId: userExists.id,
            username: userExists.username,
            videoId: videoExists.id,
            parentCommentId: comment.parentCommentId,
        };
    }

    async findAll(): Promise<any[]> {
        const comments = await this.commentRepository.find({
            relations: ['user', 'video'],
        });
    
        return comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            userId: comment.user.id,
            username: comment.user.username,
            videoId: comment.video.id,
            parentCommentId: comment.parentCommentId,
        }));
    }

    async findOne(id: number): Promise<any> {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ['user', 'video', 'parentComment'] });
        if (!comment) {
            throw new NotFoundException(`Comentario con ID ${id} no encontrado.`);
        }

        return {
            id: comment.id,
            text: comment.text,
            userId: comment.user.id,
            username: comment.user.username,
            videoId: comment.video.id,
            parentCommentId: comment.parentCommentId,
        };
    }

    async remove(id: number): Promise<void> {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new NotFoundException(`Comentario con ID ${id} no encontrado.`);
        }
        await this.commentRepository.delete(id);
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ where: { id }});
        if (!comment) {
            throw new NotFoundException(`Comentario con ID ${id} no encontrado.`);
        }

        comment.text = updateCommentDto.text || comment.text;
        return this.commentRepository.save(comment);
    }
}
