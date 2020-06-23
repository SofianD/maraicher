import { prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';

export class User {

    constructor() {}

    @prop()
    email: string;

    @prop()
    password: string;

    @prop()
    pseudo: string;

    @prop({ default: new Date() })
    createdAt: Date;

    @prop({ default: false })
    isPremium: boolean;

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }
}