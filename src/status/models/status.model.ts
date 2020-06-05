import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserModel } from '../../auth/models/user.model';

@Schema()
export class StatusModel extends Document {
      
    @Prop({
        required: true,
    })
    text: string;

    @Prop({
        type: UserModel,
        required: true,
    })
    user: UserModel;
}

export const StatusModelSchema = SchemaFactory.createForClass(StatusModel);
