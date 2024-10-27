import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CalendarService } from './service/calendar.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserDto } from 'src/auth/dto/out/user.dto';
import { GetEventDto } from './dto/get-event.dto';

@Controller('calendar/events')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @Auth()
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    const eventCreated = await this.calendarService.createEvent(
      createEventDto,
      user,
    );
    if (eventCreated) {
      return eventCreated;
    }

    throw new InternalServerErrorException('Error creating event');
  }

  @Get()
  @Auth()
  async findAll(@GetUser() user: UserDto): Promise<GetEventDto[]> {
    return this.calendarService.findAllEvents(user);
  }

  @Get(':id')
  @Auth()
  async findOne(
    @Param('id') id: string,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    const event = await this.calendarService.findOneEvent(id, user);

    if (event) {
      return event;
    }

    throw new NotFoundException('Event not found');
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    const event = await this.calendarService.updateEvent(
      id,
      updateEventDto,
      user,
    );

    if (event) {
      return event;
    }
    throw new NotFoundException('Event not found');
  }

  @Delete(':id')
  @Auth()
  async remove(
    @Param('id') id: string,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    const event = await this.calendarService.removeEvent(id, user);

    if (event) {
      return event;
    }
    throw new NotFoundException('Event not found');
  }
}
