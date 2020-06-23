import { prop, mongoose, Ref } from '@typegoose/typegoose';

export class Product {

    @prop({
        required: true
    })
    name: string;

    @prop({
        required: true,
        validate: [
            {
                validator: (v) => {
                    return v >= 0;
                },
                message: 'inférieur à zéro'
            }
        ]
    })
    price: number;

    @prop({
        required: true,
        validate: [
            {
                validator: (v) => {
                    return v >= 0;
                },
                message: 'inférieur à zéro'
            }
        ]
    })
    quantity: number;

    @prop({
        required: true,
        ref: 'Store'
    })
    store: mongoose.Schema.Types.ObjectId

    @prop({
        required: true,
        ref: 'User'
    })
    user: mongoose.Schema.Types.ObjectId

    @prop({
        items: String
    })
    pictures?: string[];

    @prop({
        required: true
    })
    private: boolean
}