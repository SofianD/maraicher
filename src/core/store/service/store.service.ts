import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Store } from 'src/shared/models/core/store.interface';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store) private readonly storeModel: ReturnModelType<typeof Store>
    ) {}

    async create (data) {
        const store = new this.storeModel(data);

        let createdStore;
        try {
            createdStore = await store.save();
        } catch (error) {
            throw error;
        }

        return createdStore._id;
    }

    async findById(id: string) {
        let result;
        try {
            result = await this.storeModel.findById(id);
        } catch (error) {
            throw error;
        }

        return result;
    }

    async update(id, store) {
        let result;

        try {
            result = await this.storeModel.findByIdAndUpdate(
                id,
                store,
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
            result = await this.storeModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }

        return result;
    }
}
