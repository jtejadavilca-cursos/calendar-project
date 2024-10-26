import { UserDto } from './user.dto';

export class AuthResponse {
  constructor(public user: UserDto, public token: string) {}
}
