import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from 'src/shared/models/user/user.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class IsAccountOwnerMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async use(req: any, res: any, next: () => void) {
    
    const targetId = req.params.id;
    let userId = (jwt.decode(req.headers.authorization)).key;

    let result;
    try {
      result = await this.userModel.findById(userId);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }

    if (result === null) {
      return res.status(404).json({
        message: 'Not Found.'
      });
    }

    if (result._id !== userId) {
      return res.status(401).json({
        message: 'Forbidden.'
      });
    }

    next();
  }
}
