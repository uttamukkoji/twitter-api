import { PipeTransform, NotFoundException } from '@nestjs/common';
import { mongo } from "mongoose";

export class StatusIDValidationPipe implements PipeTransform {
    transform(value: string) {
        if (!this.isValidId(value)) {
            throw new NotFoundException('Could not find Statussss.')
        }
        return value
    }

    isValidId(id: string) {
        return mongo.ObjectID.isValid(id)
    }
}