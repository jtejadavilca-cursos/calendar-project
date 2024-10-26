import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserDocument {
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  role: string;

  @Prop({ default: true })
  enabled: boolean;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
