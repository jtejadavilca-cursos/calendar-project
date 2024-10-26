import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './service/calendar.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDocument } from './schema/event.schema';

@Controller('calendar/events')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDocument> {
    return this.calendarService.createEvent(createEventDto);
  }

  @Get()
  findAll(): Promise<EventDocument[]> {
    return this.calendarService.findAllEvents();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventDocument> {
    return this.calendarService.findOneEvent(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventDocument> {
    return this.calendarService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<EventDocument> {
    return this.calendarService.removeEvent(id);
  }
}
