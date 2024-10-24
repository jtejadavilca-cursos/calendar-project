import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [ConfigModule.forRoot(), CalendarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
