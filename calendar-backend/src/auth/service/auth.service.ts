import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/in/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/out/user.dto';
import { UserMapper } from '../dto/out/mapper/user.mapper';
import { LoginDto } from '../dto/in/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    });
    return newUser ? UserMapper.toUserDto(newUser) : null;
  }

  async signIn(loginDto: LoginDto): Promise<UserDto> {
    const userDoc = await this.userRepository.findByEmail(loginDto.email);

    return userDoc && bcrypt.compareSync(loginDto.password, userDoc.password)
      ? UserMapper.toUserDto(userDoc)
      : null;
  }

  async getUserById(id: string): Promise<UserDto> {
    const userDoc = await this.userRepository.findById(id);
    return userDoc && userDoc.enabled ? UserMapper.toUserDto(userDoc) : null;
  }
}
