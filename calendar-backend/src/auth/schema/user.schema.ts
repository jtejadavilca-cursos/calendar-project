import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserDocument {
  _id: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: String })
  role: string;

  @Prop({ default: true, type: Boolean })
  enabled: boolean;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
