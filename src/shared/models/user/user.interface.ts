import { prop, mongoose, Ref } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';

export class User {

    @prop({
        required: true
    })
    email: string;

    @prop({
        required: true
    })
    password: string;

    @prop({
        required: true
    })
    pseudo: string;

    @prop({
        default: new Date()
    })
    createdAt: Date;

    @prop({
        required: true
    })
    isPremium: boolean;

    @prop({
        items: mongoose.Schema.Types.ObjectId
    })
    stores?: mongoose.Schema.Types.ObjectId[];

    @prop({
        items: mongoose.Schema.Types.ObjectId
    })
    shoppingCart?: mongoose.Schema.Types.ObjectId[];

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }
}