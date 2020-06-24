import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckSliceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const product = req.body.data.product;

    if (!product.sellPerSliceOf && !product.quantity) {
      return res.status(400).json({
        message: 'Missed param.'
      });
    }

    const quantity = {
      isLowerThanSlice: product.quantity <= product.sellPerSliceOf,
      isMultipleOfSlice: product.quantity % product.sellPerSliceOf === 0
    };

    let error = [];
    if (quantity.isLowerThanSlice) error.push('Quantity is lower than slice.');
    if (!quantity.isMultipleOfSlice) error.push('Quantity is not a multiple of slice.');

    if(error.length > 0) {
      return res.status(400).json({
        message: error
      });
    }

    next();
  }
}
