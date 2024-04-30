import { Controller, Post, Body, Get, Param, Response, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    @ApiOperation({ summary: 'Create comment' })
    @ApiConsumes('application/json')
    @ApiBody({ type: CreateCommentDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Comment has been created successfully.',
        type: [Comment], // Tipo array de Comment.
    })
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los comentarios' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de todos los comentarios recuperados exitosamente.',
        type: [Comment], // Tipo array de Comment.
    })
    findAll() {
        return this.commentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un comentario por ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Comentario recuperado exitosamente.',
        type: Comment, // Asegúrate de que este tipo refleje el objeto real que se devuelve.
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Comentario no encontrado.',
    })
    findOne(@Param('id') id: string) {
        return this.commentsService.findOne(+id);
    }
}