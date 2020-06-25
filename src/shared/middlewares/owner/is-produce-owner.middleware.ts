import { Injectable, NestMiddleware } from '@nestjs/common';
import { Produce } from 'src/shared/models/core/produce.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class IsProduceOwnerMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(Produce) private readonly produceModel: ReturnModelType<typeof Produce>
  ) {}

  async use(req: any, res: any, next: () => void) {
    
    const produceId = req.params.id;
    let userId = (jwt.decode(req.headers.authorization)).key;

    let result;
    try {
      result = await this.produceModel.findById(produceId);
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

    if (result.user !== userId) {
      return res.status(401).json({
        message: 'Forbidden.'
      });
    }

    next();
  }
}
