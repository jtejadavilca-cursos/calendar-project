import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../schema/user.schema';
import { CreateUserDto } from '../dto/in/create-user.dto';
import { ValidRoles } from './enum/valid_roles.enum';
// import { UpdateUserDto } from '../dto/update-auth.dto';
// import { getFieldsToUpdate } from 'src/utils/utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {
    this.userModel = userModel;
  }
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      ...createUserDto,
      role: ValidRoles.USER,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ enabled: true, email });
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  // async findOne(id: string): Promise<UserDocument> {
  //   return this.userModel.findById(id).exec();
  // }

  // async update(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UserDocument> {
  //   const fieldsToUpdate = getFieldsToUpdate(updateUserDto);
  //   return this.userModel
  //     .findByIdAndUpdate(id, fieldsToUpdate, { new: true })
  //     .exec();
  // }
  // async remove(id: string): Promise<UserDocument> {
  //   const deletedUser = await this.userModel.findByIdAndUpdate(
  //     id,
  //     { enabled: false },
  //     { new: true },
  //   );

  //   return deletedUser;
  // }
}
