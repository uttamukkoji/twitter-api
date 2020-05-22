import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StatusModel extends Document {
    @Prop()
    id: string;
  
    @Prop()
    text: string;
}

export const StatusModelSchema = SchemaFactory.createForClass(StatusModel);
