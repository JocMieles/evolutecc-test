import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiConsumes('application/json')
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'El usuario ha sido creado exitosamente.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/User',
                },

            },
        },
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Datos inválidos proporcionados.',
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Lista de usuarios obtenida exitosamente.',
        type: [User],
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID del usuario', type: 'number' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario encontrado.',
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Usuario no encontrado.',
    })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', required: true, description: 'ID del usuario', type: 'number' })
    @ApiConsumes('application/json')
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario actualizado exitosamente.',
        type: User
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Usuario no encontrado.',
    })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiParam({ name: 'id', required: true, description: 'ID del usuario', type: 'number' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Usuario eliminado exitosamente.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Usuario no encontrado.',
    })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}