import { Injectable } from '@nestjs/common';
import { Produce } from 'src/shared/models/core/produce.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ProduceService {
    constructor(
        @InjectModel(Produce) private readonly productModel: ReturnModelType<typeof Produce>
    ) {}

    async create (data) {
        const product = new this.productModel(data);

        let createdProduct;
        try {
            createdProduct = await product.save();
        } catch (error) {
            throw error;
        }

        return createdProduct._id;
    }

    async findById(id: string) {
        let result;
        try {
            result = await this.productModel.findById(id);
        } catch (error) {
            throw error;
        }

        return result;
    }

    async findAll() {
        let result;
        try {
            result = await this.productModel.find().exec();
        } catch (error) {
            throw error;
        }

        return result;
    }

    async update(id, product) {
        let result;

        try {
            result = await this.productModel.findByIdAndUpdate(
                id,
                product,
                {
                    new: true
                }
            )
        } catch (error) {
            throw error;
        }

        result = result._doc;
        return result._id;
    }

    async delete(id) {
        let result;
        try {
            result = await this.productModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }

        return result;
    }
}
