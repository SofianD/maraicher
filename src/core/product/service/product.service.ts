import { Injectable } from '@nestjs/common';
import { Product } from 'src/shared/models/core/product.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { exec } from 'child_process';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private readonly productModel: ReturnModelType<typeof Product>
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
