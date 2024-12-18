import { UserMapper } from 'src/auth/dto/out/mapper/user.mapper';
import { EventDocument } from '../../schema/event.schema';
import { GetEventDto } from '../get-event.dto';
export class EventMapper {
  static toDto(event: EventDocument): GetEventDto {
    return new GetEventDto(
      event._id,
      event.title,
      event.notes,
      event.start,
      event.end,
      UserMapper.toUserDto(event.user),
    );
  }
}
