import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'src/shared/models/user/user.interface';

@Injectable()
export class AuthService {

    constructor (
        private readonly userModel: ReturnModelType<typeof User>
    ) {

    }
    async find (email) {
        let result;
        try {
            result = this.userModel.findOne({email: email});
        } catch (error) {
            throw error;
        }

        return result._doc;
    }
}
