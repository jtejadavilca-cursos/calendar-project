import { UserDocument } from 'src/auth/schema/user.schema';
import { UserDto } from '../user.dto';
import { AuthResponse } from '../auth.response';

export class UserMapper {
  static toUserDto(user: UserDocument): UserDto {
    return new UserDto(user._id, user.email, user.fullName);
  }

  static toAuthResponse(userDto: UserDto, token: string): AuthResponse {
    return new AuthResponse(userDto, token);
  }
}
