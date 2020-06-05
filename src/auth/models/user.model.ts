import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
@Schema()
export class UserModel extends Document {
    @Prop( {
        unique: true,
        required: true
    })
    username: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    salt: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);