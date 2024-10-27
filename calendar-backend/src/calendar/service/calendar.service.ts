import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventRepository } from '../repository/event.repository';
import { UserDocument } from 'src/auth/schema/user.schema';
import { UserDto } from 'src/auth/dto/out/user.dto';
import { EventMapper } from '../dto/mapper/event.mapper';
import { GetEventDto } from '../dto/get-event.dto';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    user: UserDto,
  ): Promise<GetEventDto> {
    const userDB = new UserDocument();
    userDB._id = user.id;

    const eventDB = await this.eventRepository.create(createEventDto, userDB);

    return EventMapper.toDto(eventDB);
  }

  async findAllEvents(user: UserDto): Promise<GetEventDto[]> {
    const userDB = new UserDocument();
    userDB._id = user.id;

    const eventsDB = await this.eventRepository.findAll(userDB);

    return eventsDB.map(EventMapper.toDto);
  }

  async findOneEvent(id: string, user: UserDto): Promise<GetEventDto> {
    const userDB = new UserDocument();
    userDB._id = user.id;

    const eventDB = await this.eventRepository.findOne(id, userDB);

    return EventMapper.toDto(eventDB);
  }

  async updateEvent(
    id: string,
    updateCalendarDto: UpdateEventDto,
    user: UserDto,
  ): Promise<GetEventDto> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    const eventDB = await this.eventRepository.update(
      id,
      updateCalendarDto,
      userDB,
    );

    return EventMapper.toDto(eventDB);
  }

  async removeEvent(id: string, user: UserDto): Promise<GetEventDto> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    const eventDB = await this.eventRepository.remove(id, userDB);

    return EventMapper.toDto(eventDB);
  }
}
