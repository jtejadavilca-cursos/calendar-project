import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';
import mongoose from 'mongoose';

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
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    mongoose.set('debug', configService.get('MONGOOSE_DEBUG') === 'enabled');
  }
}
