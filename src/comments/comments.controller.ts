import { Controller, Post, Body, Get, Param, HttpStatus, Delete, HttpCode, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { UpdateCommentDto } from 'src/dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo comentario' })
    @ApiBody({ description: 'Datos del comentario a crear', type: CreateCommentDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'El comentario ha sido creado exitosamente.',
        type: Comment,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Datos inválidos para la creación del comentario.',
    })
    async create(@Body() createCommentDto: CreateCommentDto) {
        return await this.commentsService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los comentarios' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de todos los comentarios recuperados exitosamente.',
        type: [Comment],
    })
    async findAll() {
        return await this.commentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un comentario por ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID numérico del comentario a recuperar', type: 'integer' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Comentario recuperado exitosamente.',
        type: Comment,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Comentario no encontrado.',
    })
    async findOne(@Param('id') id: number) {
        return await this.commentsService.findOne(id);
    }

    
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un comentario' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'El comentario ha sido actualizado exitosamente.',
        type: Comment
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Comentario no encontrado.'
    })
    async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return await this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un comentario' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'El comentario ha sido eliminado exitosamente.'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Comentario no encontrado.'
    })
    async remove(@Param('id') id: string) {
        await this.commentsService.remove(+id);
    }
}