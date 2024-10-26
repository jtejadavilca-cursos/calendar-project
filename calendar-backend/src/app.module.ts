import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:rootpassword@localhost:27017/', {
      dbName: 'calendar',
    }),
    AuthModule,
    CalendarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
