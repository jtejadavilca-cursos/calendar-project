import { Model } from 'mongoose';
import { EventDocument } from '../schema/event.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { getFieldsToUpdate } from 'src/utils/utils';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<EventDocument>,
  ) {
    this.eventModel = eventModel;
  }
  async create(createEventDto: CreateEventDto): Promise<EventDocument> {
    const createdEvent = new this.eventModel({ ...createEventDto });
    return createdEvent.save();
  }
  async findAll(): Promise<EventDocument[]> {
    return this.eventModel.find({ enabled: true });
  }

  async findOne(id: string): Promise<EventDocument> {
    return this.eventModel.findById(id).exec();
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventDocument> {
    const fieldsToUpdate = getFieldsToUpdate(updateEventDto);
    return this.eventModel
      .findByIdAndUpdate(id, fieldsToUpdate, { new: true })
      .exec();
  }
  async remove(id: string): Promise<EventDocument> {
    const deletedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      { enabled: false },
      { new: true },
    );

    return deletedEvent;
  }
}
