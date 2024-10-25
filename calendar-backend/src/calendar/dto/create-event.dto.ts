import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateEventDto {
  title: string;

  notes: string;

  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;
}
