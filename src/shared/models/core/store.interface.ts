import { prop, mongoose, Ref } from '@typegoose/typegoose';

export class Store {

    @prop({
        unique: true,
        required: true
    })
    name: string;

    @prop()
    description?: string;

    // @prop({
    //     _id: false,
    //     items: mongoose.Schema.Types.ObjectId
    // })
    // products?: mongoose.Schema.Types.ObjectId[];

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
        items: mongoose.Schema.Types.ObjectId
    })
    lastProductsPurchased?: mongoose.Schema.Types.ObjectId[]
}