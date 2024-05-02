import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Video } from '../entities/video.entity';
import { VideoResponseDto } from 'src/dto/video-response.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo video' })
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully found. Example: { "name": "John", "age": 30 }',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/Video',
            },
        },
    },
  })
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los videos' })
  @ApiResponse({
    status: 200,
    description: 'Videos obtenidos exitosamente.',
    type: [Video]
  })
  findAll(): Promise<VideoResponseDto[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un video por ID' })
  @ApiResponse({
    status: 200,
    description: 'Video encontrado.',
    type: Video
  })
  findOne(@Param('id') id: string): Promise<VideoResponseDto> {
    return this.videosService.findOne(+id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Actualizar un video' })
  // @ApiBody({ type: UpdateVideoDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Video actualizado exitosamente.',
  //   type: Video
  // })
  // update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
  //   return this.videosService.update(+id, updateVideoDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un video' })
  @ApiResponse({
    status: 200,
    description: 'Video eliminado exitosamente.'
  })
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}