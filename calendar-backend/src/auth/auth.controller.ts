import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './service/auth.service';
import { CreateUserDto } from './dto/in/create-user.dto';
import { LoginDto } from './dto/in/login.dto';
import { AuthResponse } from './dto/out/auth.response';
import { UserDto } from './dto/out/user.dto';
import { Auth } from './decorator/auth.decorator';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() createAuthDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.authService.signUp(createAuthDto);

    if (user) {
      return this.buildToken(user);
    }
    throw new UnauthorizedException('User not created');
  }

  @Post('login')
  async signIn(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authService.signIn(loginDto);
    if (user) {
      return this.buildToken(user);
    }
    throw new UnauthorizedException('Wrong credentials');
  }

  @Auth()
  @Post('renew')
  async refreshToken(@GetUser() user: UserDto): Promise<AuthResponse> {
    if (user) {
      return this.buildToken(user);
    }
    throw new UnauthorizedException('User not authenticated');
  }

  private buildToken(userDto: UserDto): AuthResponse {
    return new AuthResponse(userDto, this.jwtService.sign({ ...userDto }));
  }
}
