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
import { Auth } from 'src/auth/decorator/auth.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserDto } from 'src/auth/dto/out/user.dto';
import { GetEventDto } from './dto/get-event.dto';

@Controller('calendar/events')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @Auth()
  create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    return this.calendarService.createEvent(createEventDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: UserDto): Promise<GetEventDto[]> {
    return this.calendarService.findAllEvents(user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    return this.calendarService.findOneEvent(id, user);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    return this.calendarService.updateEvent(id, updateEventDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserDto,
  ): Promise<GetEventDto> {
    return this.calendarService.removeEvent(id, user);
  }
}
