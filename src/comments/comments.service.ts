import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) { }

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepository.create(createCommentDto);
        return this.commentRepository.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find();
    }

    async findOne(id: number): Promise<Comment> {
        return this.commentRepository.findOneOrFail({ where: { id } });
    }
}