import { prop, mongoose, Ref } from '@typegoose/typegoose';

export class Produce {

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
                message: 'Prix inférieur à zéro'
            }
        ]
    })
    price: number;

    @prop({
        required: true,
        validate: [
            {
                validator: (v) => {
                    const multiple: number = v % 10;
                    return multiple === 0 ? true : multiple === 1 ? true : false;
                },
                message: 'La quantité doit être un multiple de 10 ou 1.'
            },
            {
                validator: (v) => {
                    return v >= 0;
                },
                message: 'Quantité inférieur à zéro'
            },
            {
                validator: function (v) {
                    return this.quantity % this.sellPerSliceOf === 0;
                },
                message: 'Quantity is not a multiple of slice.'
            }
        ]
    })
    quantity: number;

    @prop({
        required: true,
        ref: 'Store'
    })
    store: mongoose.Schema.Types.ObjectId;

    @prop({
        required: true,
        ref: 'User'
    })
    user: mongoose.Schema.Types.ObjectId;

    @prop({
        type: String
    })
    pictures?: string[];

    @prop({
        required: true,
        validate: [
            {
                validator: (v) => {
                    const multiple: number = v % 10;
                    return multiple === 0 ? true : multiple === 1 ? true : false;
                },
                message: 'La portion doit être un multiple de 10 ou 1.'
            },
            {
                validator: function(v) {
                    return this.quantity >= v;
                },
                message: 'Quantity is lower than slice.'
            }
        ]
    })
    sellPerSliceOf: number;

    @prop({
        required: true
    })
    private: boolean;
}