import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/shared/models/user/user.interface';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) {}

    async findById(id: string) {
        let result;
        try {
            result = await this.userModel.findById(id);
        } catch (error) {
            throw error;
        }

        return result;
    }

    async create(data) {
        const user = new this.userModel(data);

        let createdUser;
        try {
            createdUser = await user.save();
        } catch (error) {
            throw error;
        }

        return createdUser._id;
    }

    async update(id, user) {
        let result;

        try {
            result = await this.userModel.findByIdAndUpdate(
                id,
                user,
                {
                    new: true
                }
            )
        } catch (error) {
            throw error;
        }

        result = result._doc;
        return result;
    }

    async delete(id) {
        let result;
        try {
            result = await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }

        return result;
    }
}
