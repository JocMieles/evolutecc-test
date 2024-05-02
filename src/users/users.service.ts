import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if(!createUserDto.email){
      throw new BadRequestException('El correo electrónico no se envio.');
    }
    if(!createUserDto.username){
      throw new BadRequestException('El username no se envio.');
    }
    const existingEmail = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    const existingUsername = await this.usersRepository.findOne({ where: { username: createUserDto.username } });

    if (existingEmail) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }
    if (existingUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso.');
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    if(updateUserDto.email == "" ){
      throw new BadRequestException('El correo electrónico no puede ser vacio.');
    }

    if(updateUserDto.username == "" ){
      throw new BadRequestException('El username no puede ser vacio.');
    }

    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (emailExists) {
        throw new BadRequestException('El correo electrónico ya está en uso.');
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = await this.usersRepository.findOne({ where: { username: updateUserDto.username } });
      if (usernameExists) {
        throw new BadRequestException('El nombre de usuario ya está en uso.');
      }
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
  }
}
