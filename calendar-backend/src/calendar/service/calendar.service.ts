import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventRepository } from '../repository/event.repository';
import { EventDocument } from '../entities/event.schema';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  createEvent(createEventDto: CreateEventDto): Promise<EventDocument> {
    return this.eventRepository.create(createEventDto);
  }

  findAllEvents(): Promise<EventDocument[]> {
    return this.eventRepository.findAll();
  }

  findOneEvent(id: string): Promise<EventDocument> {
    return this.eventRepository.findOne(id);
  }

  updateEvent(
    id: string,
    updateCalendarDto: UpdateEventDto,
  ): Promise<EventDocument> {
    return this.eventRepository.update(id, updateCalendarDto);
  }

  removeEvent(id: string): Promise<EventDocument> {
    return this.eventRepository.remove(id);
  }
}
