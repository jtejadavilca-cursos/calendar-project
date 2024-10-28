import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';
import { Inject, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { UserDto } from '../dto/out/user.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const { id } = payload;
    const user = await this.authService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    return user;
  }
}
