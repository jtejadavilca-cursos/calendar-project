import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const EventSchema = SchemaFactory.createForClass(EventDocument);
