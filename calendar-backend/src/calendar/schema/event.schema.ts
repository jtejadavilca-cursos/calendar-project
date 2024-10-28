import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { UserDocument } from 'src/auth/schema/user.schema';

@Schema({ collection: 'events', timestamps: true })
export class EventDocument {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  notes: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop()
  createdAt: Date;

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: UserDocument;
}

export const EventSchema = SchemaFactory.createForClass(EventDocument);
