import { prop, mongoose, Ref } from '@typegoose/typegoose';

export class Store {

    @prop({
        unique: true,
        required: true
    })
    name: string;

    @prop()
    description?: string;

    @prop({
        ref: 'User',
        required: true
    })
    user: mongoose.Schema.Types.ObjectId;

    @prop({
        required: true
    })
    private: boolean;

    @prop({
        _id: false,
        type: mongoose.Schema.Types.ObjectId
    })
    lastProductsPurchased?: mongoose.Schema.Types.ObjectId[]
}