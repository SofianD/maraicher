import { Injectable, NestMiddleware } from '@nestjs/common';
import { Store } from 'src/shared/models/core/store.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { identity } from 'rxjs';

@Injectable()
export class IsStoreOwnerMiddleware implements NestMiddleware {

  constructor(
    private readonly storeModel: ReturnModelType<typeof Store>
  ) {}

  async use(req: any, res: any, next: () => void) {
    const storeId = req.params.id;
    let userId;

    let result;
    try {
      result = await this.storeModel.findById(storeId);
    } catch (error) {
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
      result = false;
    } else {
      result = true;
    }

    if (req.body.data.isStoreOwner !== undefined) {
      req.body.data.isStoreOwner = result;
    } else {
      req.body.data = {
        ...req.body.data,
        isStoreOwner: result
      };
    }

    next();
  }
}
