import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';

import { CalendarService } from './service/calendar.service';
import { CalendarController } from './calendar.controller';
import { EventRepository } from './repository/event.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    AuthModule,
  ],
  controllers: [CalendarController],
  providers: [EventRepository, CalendarService],
})
export class CalendarModule {}
