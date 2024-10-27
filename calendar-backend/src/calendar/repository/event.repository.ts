import { Model } from 'mongoose';
import { EventDocument } from '../schema/event.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { getFieldsToUpdate } from 'src/utils/utils';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { UserDocument } from 'src/auth/schema/user.schema';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<EventDocument>,
  ) {
    this.eventModel = eventModel;
  }
  async create(
    createEventDto: CreateEventDto,
    user: UserDocument,
  ): Promise<EventDocument> {
    const createdEvent = new this.eventModel({ ...createEventDto, user });
    return createdEvent.save();
  }
  async findAll(user: UserDocument): Promise<EventDocument[]> {
    return this.eventModel.find({ user, enabled: true });
  }

  async findOne(id: string, user: UserDocument): Promise<EventDocument> {
    return this.eventModel.findOne({ _id: id, user, enabled: true }).exec();
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    user: UserDocument,
  ): Promise<EventDocument> {
    const fieldsToUpdate = getFieldsToUpdate(updateEventDto);
    return this.eventModel
      .findOneAndUpdate({ _id: id, user, enabled: true }, fieldsToUpdate, {
        new: true,
      })
      .exec();
  }
  async remove(id: string, user: UserDocument): Promise<EventDocument> {
    const deletedEvent = await this.eventModel.findOneAndUpdate(
      { _id: id, user: user._id.toString(), enabled: true },
      { enabled: false },
      { new: true },
    );

    return deletedEvent;
  }
}
