import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventRepository } from '../repository/event.repository';
import { EventDocument } from '../schema/event.schema';
import { UserDocument } from 'src/auth/schema/user.schema';
import { UserDto } from 'src/auth/dto/out/user.dto';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    user: UserDto,
  ): Promise<EventDocument> {
    const userDB = new UserDocument();
    userDB._id = user.id;

    return this.eventRepository.create(createEventDto, userDB);
  }

  async findAllEvents(user: UserDto): Promise<EventDocument[]> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    return this.eventRepository.findAll(userDB);
  }

  async findOneEvent(id: string, user: UserDto): Promise<EventDocument> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    return this.eventRepository.findOne(id, userDB);
  }

  async updateEvent(
    id: string,
    updateCalendarDto: UpdateEventDto,
    user: UserDto,
  ): Promise<EventDocument> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    return this.eventRepository.update(id, updateCalendarDto, userDB);
  }

  async removeEvent(id: string, user: UserDto): Promise<EventDocument> {
    const userDB = new UserDocument();
    userDB._id = user.id;
    return this.eventRepository.remove(id, userDB);
  }
}
